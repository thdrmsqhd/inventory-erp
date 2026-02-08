#ifndef INVENTORY_ERP_INCLUDE_WEB_DTO_TRANSACTIONITEMDTO_HPP_
#define INVENTORY_ERP_INCLUDE_WEB_DTO_TRANSACTIONITEMDTO_HPP_

#include <string>

namespace web::dto {
    struct TransactionItemDTO {
        int transactionId;
        int itemId;
        int quantity;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_DTO_TRANSACTIONITEMDTO_HPP_