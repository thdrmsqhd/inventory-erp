#ifndef INVENTORY_ERP_INCLUDE_WEB_SERVICES_IMPL_WAREHOUSESERVICE_H_
#define INVENTORY_ERP_INCLUDE_WEB_SERVICES_IMPL_WAREHOUSESERVICE_H_

#include "web/services/interfaces/IWarehouseService.h"
#include "web/repository/interfaces/IWarehouseRepository.hpp"
#include "web/di/Component.h"
#include "web/di/DIContainer.hpp"
#include "web/dto/WarehouseDTO.hpp"
#include <vector>

namespace web::services::impl {
    class WarehouseService : public web::services::interfaces::IWarehouseService {
    public:
        WarehouseService() : warehouseRepository(*dynamic_cast<web::repository::interfaces::IWarehouseRepository*>(
            web::di::DIContainer::getContainer().getInstance("warehouse_repository")
        )) {}
        WarehouseService(web::repository::interfaces::IWarehouseRepository& warehouseRepository) : warehouseRepository(warehouseRepository) {}
        ~WarehouseService() override = default;
        std::vector<web::dto::WarehouseDTO> getAllWarehouses() override;
    private:
        // Private members and methods for WarehouseService
        web::repository::interfaces::IWarehouseRepository& warehouseRepository;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_