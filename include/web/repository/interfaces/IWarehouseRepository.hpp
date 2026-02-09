#ifndef INVENTORY_ERP_INCLUDE_WEB_REPOSITORY_INTERFACES_IWAREHOUSEREPOSITORY_HPP_
#define INVENTORY_ERP_INCLUDE_WEB_REPOSITORY_INTERFACES_IWAREHOUSEREPOSITORY_HPP_

#include "web/dto/WarehouseDTO.hpp"
#include "web/di/Component.h"
#include <vector>

namespace web::repository::interfaces {
    class IWarehouseRepository : virtual public web::di::Component {
    public:
        virtual ~IWarehouseRepository() = default;
        virtual std::vector<web::dto::WarehouseDTO> findAll() = 0;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_REPOSITORY_INTERFACES_IWAREHOUSEREPOSITORY_HPP_