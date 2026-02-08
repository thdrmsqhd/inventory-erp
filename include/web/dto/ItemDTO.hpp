#ifndef INVENTORY_ERP_INCLUDE_WEB_DTO_ITEMDTO_HPP_
#define INVENTORY_ERP_INCLUDE_WEB_DTO_ITEMDTO_HPP_

#include <string>

namespace web::dto {
    struct ItemDTO {
        int id;
        std::string name;
        std::string category;
        int quantity;
        int warehouseId;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_DTO_ITEMDTO_HPP_