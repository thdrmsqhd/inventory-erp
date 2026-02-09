#ifndef INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_
#define INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_

#include "web/di/Component.h"
#include "web/dto/WarehouseDTO.hpp"
#include <vector>

namespace web::services::interfaces {
    class IWarehouseService : virtual public web::di::Component {
        public:
            virtual ~IWarehouseService() = default;
            virtual std::vector<web::dto::WarehouseDTO> getAllWarehouses() = 0;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_