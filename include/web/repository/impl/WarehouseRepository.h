#ifndef INVENTORY_ERP_INCLUDE_WEB_REPOSITORY_IMPL_WAREHOUSEREPOSITORY_HPP_
#define INVENTORY_ERP_INCLUDE_WEB_REPOSITORY_IMPL_WAREHOUSEREPOSITORY_HPP_

#include "web/di/Component.h"
#include "web/dto/WarehouseDTO.h"
#include "web/repository/interfaces/IWarehouseRepository.h"
#include <vector>

namespace web::repository::impl {
    class WarehouseRepository : public interfaces::IWarehouseRepository, public web::di::Component {
    public:
        WarehouseRepository() = default;
        ~WarehouseRepository() override = default;
        std::vector<web::dto::WarehouseDTO> findAll() override;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_REPOSITORY_IMPL_WAREHOUSEREPOSITORY_HPP_