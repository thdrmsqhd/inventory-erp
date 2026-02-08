#ifndef WEB_SERVICES_IMPL_WAREHOUSESERVICE_CPP
#define WEB_SERVICES_IMPL_WAREHOUSESERVICE_CPP


std::vector<web::dto::WarehouseDTO> WarehouseService:: getAllWarehouses() {
    std::vector<web::dto::WarehouseDTO> warehouses;
    warehouses = warehouseRepository.findAll();
    return warehouses;
}

static web::di::ComponentRegistry<web::services::impl::WarehouseService> regist("warehouse_service");
#endif // WEB_SERVICES_IMPL_WAREHOUSESERVICE_CPP