#ifndef INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_
#define INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_

#include "web/di/Component.h"

namespace web::services::interfaces {
    class IWarehouseService : public web::di::Component {
        public:
            virtual ~IWarehouseService() = default;
            virtual void getAllWarehouses() = 0;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_SERVICES_INTERFACES_IWAREHOUSESERVICE_H_