#pragma once
#include "crow.h"
#include "web/di/Component.h"
#include "web/di/DIContainer.hpp"
#include "web/controller/BaseController.h"
#include "web/services/interfaces/IWarehouseService.h"

namespace web::controller {
    class WarehouseController : public BaseController {
    private:
        services::interfaces::IWarehouseService& warehouseService;

    public:
        WarehouseController(): warehouseService(*dynamic_cast<services::interfaces::IWarehouseService*>(
            web::di::DIContainer::getContainer().getInstance("warehouse_service")
        )) {}
        crow::Blueprint getBlueprint() override;
    };
}
