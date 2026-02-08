# InventoryERP 인수인계 문서

**날짜**: 2026.02.07  
**변경내용**: Crow Blueprint 기반 컨트롤러 모듈화 구현

---

## 📝 변경 요약

### 생성된 파일
- `include/web/BaseController.h` - 추상 기본 클래스
- `include/web/WarehouseController.h` / `.cpp` 
- `include/web/ItemController.h` / `.cpp`

### 수정된 파일
- `src/web/RouteConfig.cpp` - Blueprint 등록 방식으로 변경
- `CMakeLists.txt` - 새 .cpp 파일 추가
- `src/main.cpp` - registerRoute() 호출

---

## 🏗️ 아키텍처 변경

### Before: 단일 파일 집중식
```
RouteConfig.cpp
├── /health
├── /api/version
├── /api/warehouses
└── /api/items
```

### After: 모듈 분산식
```
BaseController (추상)
├── WarehouseController → /api/warehouses/*
├── ItemController → /api/items/*
└── (향후) UserController, TransactionController...
```

---

## 💡 왜 이렇게 했나?

| 항목 | 효과 |
|------|------|
| **추상 클래스** | 모든 컨트롤러가 같은 인터페이스 따름 |
| **인스턴스 기반** | 향후 상태(Logger, Permission) 추가 가능 |
| **명시적 namespace** | `web::` 표기로 출처 명확 |

---

## 🔧 코드 비교

**Before** (정적 메서드)
```cpp
auto bp = web::WarehouseController::getBlueprint();
```

**After** (인스턴스)
```cpp
web::WarehouseController controller;
app.register_blueprint(controller.getBlueprint());
```

---

## 🌐 API 엔드포인트

```
GET  /api/warehouses/      - 전체 조회
GET  /api/warehouses/<id>  - 상세 조회
GET  /api/items/           - 품목 목록
```

---

## 🚀 다음 할 일

1. **TransactionController** 구현 (같은 패턴)
2. **UserController** 구현
3. **DatabaseManager 연동** - 각 컨트롤러에서 실제 DB 호출
4. **에러 핸들링** 추가
5. **컴파일 및 테스트**

---

## 📌 주의사항

- ❌ `using namespace web;` 금지
- ✅ 항상 `web::ClassName` 명시할 것
- 새 컨트롤러는 `BaseController` 상속만 하면 됨
