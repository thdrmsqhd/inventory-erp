#include "crow.h"
#include "core/InventoryManager.h"

int main() {
	crow::SimpleApp app;

	CROW_ROUTE(app, "/")([](){
			return InventoryManager::getInstance().getHelloWorld();
	});

	app.port(18080).multithreaded().run();
	return 0;
}
