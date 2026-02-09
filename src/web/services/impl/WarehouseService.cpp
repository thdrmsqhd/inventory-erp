#include "web/services/impl/WarehouseService.h"
#include "web/di/ComponentRegistry.h"

namespace web::services::impl {

std::vector<web::dto::WarehouseDTO> WarehouseService:: getAllWarehouses() {
    std::vector<web::dto::WarehouseDTO> warehouses;
    warehouses = warehouseRepository.findAll();
    return warehouses;
}

} // namespace web::services::impl

static web::di::ComponentRegistry<web::services::impl::WarehouseService> regist("warehouse_service");