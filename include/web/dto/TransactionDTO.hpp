#ifndef INVENTORY_ERP_INCLUDE_WEB_DTO_TRANSACTIONDTO_HPP_
#define INVENTORY_ERP_INCLUDE_WEB_DTO_TRANSACTIONDTO_HPP_

#include <string>

namespace web::dto {
    struct TransactionDTO {
        int id;
        std::string type;
        std::string date;
        int warehouseId;
    };
}

#endif // INVENTORY_ERP_INCLUDE_WEB_DTO_TRANSACTIONDTO_HPP_