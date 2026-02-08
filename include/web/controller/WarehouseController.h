#pragma once
#include "crow.h"
#include "web/di/Component.h"
#include "web/di/DIContainer.hpp"
#include "web/controller/BaseController.h"
#include "web/services/interfaces/IWarehouseService.h"

using web::di;

namespace web::controller {
    class WarehouseController : public BaseController, public di::Component {
    private:
        IWarehouseService& warehouseService;

    public:
        WarehouseController(): warehouseService(*static_cast<IWarehouseService*>(
            DIContainer::getInstance("warehouse_service")
        )) {}
        crow::Blueprint getBlueprint() override;
    };
}
