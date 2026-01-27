cmake_minimum_required(VERSION 3.10)
project(InventoryERP)

set(CMAKE_CXX_STANDARD 17)

# 1. GTest와 Thread는 CMake 설정 파일이 잘 제공되므로 그대로 둡니다.
find_package(GTest REQUIRED)
find_package(Threads REQUIRED)
find_package(PkgConfig REQUIRED)
pkg_check_modules(MARIADB REQUIRED mariadb)

# 2. 헤더 경로 직접 지정 (Asio는 보통 /usr/include 에 설치됩니다)
include_directories(
  ${MARIADB_INCLUDE_DIRS}
  ${CMAKE_CURRENT_SOURCE_DIR}/include
  ${CMAKE_CURRENT_SOURCE_DIR}/include/core
  /usr/include
  ${CMAKE_CURRENT_SOURCE_DIR}/third_party/Crow/include  # 본인의 Crow 경로 확인!
)

# 3. 비즈니스 로직 라이브러리 (Interface)
add_library(InventoryCore INTERFACE) 
target_include_directories(InventoryCore INTERFACE include)

# 4. 테스트 바이너리 (unit_tests)
add_executable(unit_tests 
	tests/unit/test_inventory_manager.cpp
	tests/integration/db/test_db_conn.cpp
)
# GTest는 pthread(Threads)가 반드시 필요하므로 함께 링크합니다.
target_link_libraries(unit_tests ${MARIADB_LIBRARIES} GTest::gtest_main GTest::gtest Threads::Threads InventoryCore)

# 5. 메인 WAS 앱 (InventoryApp)
add_executable(InventoryApp src/main.cpp)
target_link_libraries(InventoryApp ${MARIADB_LIBRARIES} Threads::Threads)
