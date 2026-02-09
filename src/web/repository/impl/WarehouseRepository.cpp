#include "web/repository/impl/WarehouseRepository.h"
#include "database/ConnectionGuard.hpp"
#include "web/di/ComponentRegistry.h"

namespace web::repository::impl {
    std::vector<web::dto::WarehouseDTO> WarehouseRepository::findAll() {
        std::vector<web::dto::WarehouseDTO> warehouses;

        database::ConnectionGuard conn;
        
        if (mysql_query(conn.get(), "SELECT id, name, location, capacity FROM warehouses") != 0) {
            return warehouses;
        }

        MYSQL_RES* result = mysql_store_result(conn.get());
        MYSQL_ROW row;

        while ((row = mysql_fetch_row(result)) != nullptr) {
            web::dto::WarehouseDTO warehouse;
            warehouse.id = std::stoi(row[0]);
            warehouse.name = row[1] ? row[1] : "";
            warehouse.location = row[2] ? row[2] : "";
            warehouse.capacity = row[3] ? std::stoi(row[3]) : 0;

            warehouses.push_back(warehouse);
        }

        mysql_free_result(result);
        return warehouses;
    }
}

static web::di::ComponentRegistry<web::repository::impl::WarehouseRepository> regist("warehouse_repository");

