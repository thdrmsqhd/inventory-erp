# TDD 개발 계획 및 체크리스트

이 문서는 프로젝트의 테스트 주도 개발(TDD)을 위한 할 일 목록과 시나리오를 정의합니다.

## 1. 프론트엔드 테스트 (Frontend)

### App Core
- [ ] **App 초기화**: `app.js` 로드 시 의존성 주입 및 초기 설정 완료 확인
- [ ] **라우팅 (Routing)**: 잘못된 URL 접근 시 404 또는 홈 리다이렉트 처리
- [ ] **전역 에러 핸들링**: API 서버 연결 실패 시 사용자 알림(Toast/Modal) 표시

### UI 컴포넌트 & 뷰모델
#### 공통 (Shared)
- [ ] **SideNavigation.js**: 메뉴 클릭 시 활성화 상태 변경 및 올바른 뷰 렌더링
- [ ] **LoadingState**: 데이터 페칭 중 로딩 인디케이터 표시

#### 대시보드 (Dashboard)
- [ ] **DashboardViewModel.js**: 요약 데이터(총 재고, 최근 활동) API 페칭 및 가공
- [ ] **DashboardView.js**: 데이터 바인딩 및 차트/카드 렌더링 확인

#### 아이템 관리 (Inventory Items)
- [ ] **ItemsViewModel.js**: 목록 조회, 검색 필터링, CRUD 상태 관리
- [ ] **ItemListView.js**: 아이템 목록 렌더링 및 빈 상태(Empty State) 처리
- [ ] **ItemDetailView.js**: 상세 정보 표시 및 뒤로 가기 동작
- [ ] **ItemMainView.js**: 탭 또는 화면 전환 동작

#### 트랜잭션 관리 (Transactions)
- [ ] **TransactionViewModel.js**: 입출고 요청 및 유효성 검사 (수량 > 0 확인)
- [ ] **TransactionListView.js**: 날짜/타입별 필터링 및 목록 표시
- [ ] **TransactionView.js**: 입력 폼 유효성 검사 및 전송 버튼 상태 제어

#### 사용자 관리 (User Management)
- [ ] **UserViewModel.js**: 사용자 목록 로드 및 추가/삭제 동작
- [ ] **UserView.js**: 사용자 권한 설정 UI 동작 확인

#### 창고 관리 (Warehouse Management)
- [ ] **WarehouseViewModel.js**: 창고 데이터 CRUD 로직
- [ ] **WarehouseView.js**: 창고 위치 정보 입력 및 표시

### 데이터 모델 (Models)
- [ ] **Item.js**: 필수 필드 누락 시 유효성 검증 실패 테스트
- [ ] **Transaction.js**: 날짜 형식 및 타입 검증

### 서비스 (Services)
- [ ] **ApiService.js**:
    - GET/POST/PUT/DELETE 요청 성공 처리
    - 네트워크 에러 및 HTTP 에러 코드(4xx, 5xx) 처리

---

## 2. 백엔드 테스트 (Backend - C++/Crow)

### Core Logic
- [ ] **ConfigManager**:
    - 싱글톤 인스턴스 유일성 보장
    - `.env` 파일 로드 실패 시 기본값 적용 테스트
- [ ] **InventoryManager**:
    - 전체 비즈니스 로직(입고 -> 재고증가 -> 로그) 통합 흐름
    - **[중요] 동시성 테스트**: 멀티 스레드 환경에서 동일 아이템 동시 출고 시 재고 정합성 유지
- [ ] **IObserver**: 옵저버 등록/해제 및 이벤트 전파 확인

### Factory & Interfaces
- [ ] **TransactionFactory**: 타입 문자열("IN", "OUT")에 따른 올바른 객체 생성
- [ ] **ITransaction**: 인터페이스 다형성 동작 검증

### Transaction Logic
- [ ] **IncomingStock**: 입고 처리 후 수량 증가 검증
- [ ] **OutgoingStock**:
    - 출고 처리 후 수량 감소 검증
    - 재고 부족 시 예외 발생(InsufficientStockException) 테스트

### Strategies (재고 평가)
- [ ] **FIFOStrategy**: 선입선출 로직에 따른 재고 가치 계산
- [ ] **AverageStrategy**: 이동평균법 계산 로직 검증

### Observers
- [ ] **StockAlertObserver**: 임계값 이하 도달 시 알림 트리거 동작
- [ ] **AuditLogObserver**: 트랜잭션 수행 후 로그 저장소 호출 여부 확인

### Repository & Database
- [ ] **DatabaseManager**:
    - DB 연결 및 재연결 로직
    - **트랜잭션 롤백**: 작업 실패 시 데이터 원상복구 확인
- [ ] **InventoryRepository**: SQL 쿼리 생성 및 CRUD 실행 결과 매핑

### Web Controllers (Crow)
- [ ] **InventoryController**:
    - 아이템 조회/생성 API 엔드포인트 테스트
    - 잘못된 JSON 입력 시 400 Bad Request 응답
- [ ] **DashboardController**: 요약 정보 집계 쿼리 및 응답 포맷
- [ ] **UserController**: 사용자 관리 API
- [ ] **WarehouseController**: 창고 관리 API
- [ ] **JSONSerializer**: DTO <-> JSON 직렬화/역직렬화 정확성

### Data Structures (Models)
- [ ] **Item**: 구조체 필드 초기화 및 복사/이동 시멘틱 확인
- [ ] **User.h**: 사용자 구조체 정의
- [ ] **Warehouse.h**: 창고 구조체 정의

### Server & Integration
- [ ] **main.cpp**: 서버 시작 및 라우트 등록 확인 (Health Check)
- [ ] **Integration Tests**:
    - 실제 DB(또는 인메모리 DB)를 연동한 API E2E 테스트
    - 대량 데이터 조회 시 성능 및 페이징 테스트
