#include "web/RouteConfig.h"
#include "web/InventoryManager.h"

void registerRoute(crow::SimpleApp& app) {
	CROW_ROUTE(app, "/health")([](){
		crow::response res("{\"status\":\"ok\"}");
		res.add_header("Access-Control-Allow-Origin", "*");
		return res;
	});

	CROW_ROUTE(app, "/")([](){
			return InventoryManager::getInstance().getHelloWorld();
	});

	CROW_ROUTE(app, "/api/version")([](){
		crow::response res("{\"version\":\"1.0.0\"}");
		res.add_header("Access-Control-Allow-Origin", "*");
		return res;
	});

	// API 엔드포인트 추가 (임시 더미 데이터)
	CROW_ROUTE(app, "/api/items")([](){
		crow::json::wvalue x;
		x["items"][0]["id"] = 1;
		x["items"][0]["name"] = "Test Item 1";
		x["items"][0]["quantity"] = 100;
		x["items"][1]["id"] = 2;
		x["items"][1]["name"] = "Test Item 2";
		x["items"][1]["quantity"] = 50;
		
		crow::response res(x);
		res.add_header("Access-Control-Allow-Origin", "*");
		return res;
	});
}
