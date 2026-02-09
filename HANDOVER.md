# InventoryERP 인수인계 문서

**마지막 업데이트**: 2026.02.09  
**최신 변경내용**: DIContainer 자동화 및 Controller 기능 구현

---

## 📝 변경 요약 (2026.02.09)

### 주요 변경 - DI Container & 자동 Controller 등록

#### 생성된 파일
- `include/web/di/Component.h` - 모든 Bean의 기본 클래스
- `include/web/di/DIContainer.hpp` - 싱글톤 DI 컨테이너 (BaseController 추적 추가)
- `include/web/di/ComponentRegistry.h` - 템플릿 기반 자동 등록
- `include/database/ConnectionGuard.hpp` - RAII 패턴 DB 연결 관리
- `include/database/DatabaseConnectionPool.h` - 커넥션 풀 관리
- `include/web/dto/*.hpp` - DTO 파일들 (WarehouseDTO, ItemDTO, TransactionDTO, TransactionItemDTO)

#### 수정된 파일
- `include/web/di/DIContainer.hpp` - BaseController 추적 기능 추가
- `src/main.cpp` - 자동 Controller 등록 로직 구현

---

## 🏗️ 아키텍처 (2026.02.09)

### DI Container 구조
```
DIContainer (싱글톤)
├── creators (map) → 각 클래스별 생성 함수
├── instances (map) → 생성된 Bean 저장
└── controllers (vector) → BaseController 상속 클래스들

프로그램 시작 스프로우:
1. 각 파일의 정적 변수 초기화
   static ComponentRegistry<WarehouseService> regist("WarehouseService");
   ↓ 생성자에서 registerFactoryCreator("WarehouseService", ...)

2. main.cpp에서
   diContainer.autoRegisterComponents();  // 모든 Bean 생성 및 등록
   for (auto* controller : diContainer.getAllControllers()) {
       app.register_blueprint(controller->getBlueprint());  // 자동 등록
   }

3. 기존 방식과 달리 새 Controller 추가해도 main.cpp 수정 불필요
```

### 계층 구조
```
web layer        → WarehouseController, ItemController
   ↓
services layer   → WarehouseService, ItemService  
   ↓
repository layer → WarehouseRepository, ItemRepository
   ↓
database layer   → DatabaseConnectionPool, ConnectionGuard, DatabaseManager
   ↓
data layer       → DTO (WarehouseDTO, ItemDTO, etc)
```

---

## 💡 핵심 설계 결정사항

### 1. Convention over Configuration (관례에 따른 설정)
```cpp
// 새 서비스 추가 시 - 딱 한 줄만!
// src/web/services/WarehouseService.cpp 끝에
static web::di::ComponentRegistry<web::service::WarehouseService> regist("WarehouseService");
```
→ 설정 파일이나 main.cpp 수정 불필요

### 2. RAII 패턴 (Resource Acquisition Is Initialization)
```cpp
std::vector<WarehouseDTO> findAll() {
    ConnectionGuard conn;  // 생성자: getConnection()
    // 사용
    mysql_query(conn.get(), "SELECT ...");
    
    // 함수 벗어남 → 소멸자: releaseConnection()
}
```
→ 예외 발생해도 안전한 메모리 관리

### 3. BaseController 자동 추적
```cpp
// autoRegisterComponents()에서 자동 감지
if (auto controller = dynamic_cast<BaseController*>(instance)) {
    controllers.push_back(controller);  // 별도 추적
}

// main.cpp에서 간단히
for (auto* controller : diContainer.getAllControllers()) {
    app.register_blueprint(controller->getBlueprint());
}
```
→ Spring Boot의 @ComponentScan 같은 자동 등록

---

## 📋 현재 상태 체크리스트

### ✅ 완료됨
- [x] DIContainer 기본 구조 (싱글톤, template, registerService)
- [x] Component 기본 클래스 정의
- [x] ComponentRegistry 자동 등록
- [x] BaseController 추적 및 자동 등록
- [x] DTO 설계 (Warehouse, Item, Transaction, TransactionItem)
- [x] 네임스페이스 구조 (web::di::, web::service::, web::repository::, web::dto::)
- [x] DIContainer.hpp와 ComponentRegistry.h 수정 (방법 2 적용)

### ⚠️ 다음 해야 할 일
- [ ] **빌드 & 컴파일 테스트** (가장 우선!)
- [ ] DatabaseManager와 ConnectionPool 구현
- [ ] ConnectionGuard 구현 (RAII)
- [ ] WarehouseRepository 구현 (DatabaseManager + ConnectionGuard)
- [ ] WarehouseService 구현 (Repository에서 데이터 조회)
- [ ] WarehouseController 수정 (Service 호출 및 JSON 응답)
- [ ] ItemService, ItemRepository 동일 패턴으로 구현
- [ ] TransactionService, TransactionRepository 구현
- [ ] 에러 핸들링 추가 (DB 연결 실패, 쿼리 오류 등)
- [ ] 통합 테스트

---

## 🔑 핵심 개념 정리

### DIContainer 사용법
```cpp
// 1. getInstance()로 싱글톤 획득
auto& di = web::di::DIContainer::getContainer();

// 2. autoRegisterComponents()로 모든 Bean 생성
di.autoRegisterComponents();

// 3. getInstance()로 특정 Bean 조회
auto warehouse = (WarehouseService*)di.getInstance("WarehouseService");

// 4. getAllControllers()로 자동 등록
for (auto* controller : di.getAllControllers()) {
    app.register_blueprint(controller->getBlueprint());
}
```

### ComponentRegistry 사용법
```cpp
// 각 클래스 구현 파일(.cpp) 맨 끝에
static web::di::ComponentRegistry<web::service::WarehouseService> regist("WarehouseService");

// 자동으로:
// 1. 생성자 호출 → registerFactoryCreator() 호출
// 2. creators 맵에 등록 (파일명과 일치해야 함)
// 3. autoRegisterComponents()에서 getInstance() 시 생성
```

### 정적 초기화 흐름
```
프로그램 시작
  ↓
.cpp 파일들 로드 (전역 정적 변수 초기화)
  ↓
ComponentRegistry<T> regist(...) 객체 생성
  ↓
생성자 실행 → registerFactoryCreator() 호출
  ↓
creators 맵에 등록됨
  ↓
main() 함수 실행
  ↓
autoRegisterComponents() → creators의 모든 함수 실행
  ↓
인스턴스 생성 및 저장
```

---

## 🎯 다음 세션 시작 체크리스트

1. **빌드 테스트 먼저**
   ```bash
   cd build
   cmake ..
   make
   ```

2. **컴파일 에러 나면**
   - DIContainer 헤더 include 순서 확인
   - BaseController.h include 경로 확인
   - namespace 오타 확인

3. **성공하면**
   - 간단한 테스트 API 호출해보기 (존재하는 컨트롤러에서)
   - DatabaseManager와 연결 테스트
   - Repository 구현 진행

---

## 📌 주의사항

- ❌ DIContainer를 스택에 생성하지 말 것 (`getContainer()`로만 접근)
- ❌ getInstance() 여러 번 호출하지 말것 (동일 Bean 반환)
- ✅ 새 파일은 항상 `#ifndef` 헤더 가드 사용
- ✅ namespace 명시적 사용 (using namespace 금지)
- ✅ 모든 서비스/컨트롤러는 `.cpp` 끝에 `ComponentRegistry` 등록

---

## 📚 참고 자료

- **아키텍처**: Spring Boot의 DI Container 참고
- **RAII**: C++ 표준 라이브러리 (std::lock_guard, std::unique_ptr 참고)
- **패턴**: Convention over Configuration (Rails, Django 스타일)

---

**마지막 커밋**: `DIContainer 자동화 및 Controller 기능 구현`

