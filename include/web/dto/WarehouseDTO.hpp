#ifndef INVENTORY_ERP_INCLUDE_WEB_DTO_WAREHOUSEDTO_HPP_
#define INVENTORY_ERP_INCLUDE_WEB_DTO_WAREHOUSEDTO_HPP_

#include <string>

namespace web::dto {
    struct WarehouseDTO {
        int id;
        std::string name;
        std::string location;
        int capacity;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_DTO_WAREHOUSEDTO_HPP_