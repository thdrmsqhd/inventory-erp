#ifndef INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_
#define INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_

#include "web/services/interfaces/IWarehouseService.h"
#include "web/repositories/interfaces/IWarehouseRepository.h"
#include "web/dto/WarehouseDTO.hpp"
#include <vector>

namespace web::services::impl {
    class WarehouseService : public IWarehouseService {
    public:
        WarehouseService(IWarehouseRepository& warehouseRepository) : warehouseRepository(warehouseRepository) {}
        ~WarehouseService() override = default;
        std::vector<web::dto::WarehouseDTO> getAllWarehouses() override {}
    private:
        // Private members and methods for WarehouseService
        IWarehouseRepository& warehouseRepository;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_