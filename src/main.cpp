#include <memory>

#include "crow.h"
#include "web/config/ConfigLoader.hpp"
#include "web/di/DIContainer.hpp"
#include "config/ConfigManager.h"
#include "database/DatabaseManager.h"

using json = nlohmann::json;

int main() {
	crow::SimpleApp app;

	// 환경 변수 및 DB 초기화
	ConfigManager::getInstance().loadEnv("../.env");
	DatabaseManager::getInstance().initPool(5);

	// DI 컨테이너 초기화
	auto& diContainer = web::di::DIContainer::getContainer();
	diContainer.autoRegisterComponents();

	// Blueprint 등록
	std::vector<crow::Blueprint> blueprintStorage;
	for (auto* controller : diContainer.getAllControllers()) {
		blueprintStorage.push_back(controller->getBlueprint());
	}

	for (auto& bp : blueprintStorage) {
		app.register_blueprint(bp);
	}

	app.port(18080).bindaddr("127.0.0.1").multithreaded().run();
	return 0;
}
