#include <memory>

#include "crow.h"
#include "web/config/ConfigLoader.hpp"
#include "web/di/DIContainer.hpp"

using json = nlohmann::json;

int main() {
	crow::SimpleApp app;

	// DI 컨테이너 초기화
	auto& diContainer = web::di::DIContainer::getContainer();
	diContainer.autoRegisterComponents();

	// Blueprint 등록
	for (auto* controller : diContainer.getAllControllers()) {
		app.register_blueprint(controller->getBlueprint());
	}

	app.port(18080).bindaddr("127.0.0.1").multithreaded().run();
	return 0;
}
