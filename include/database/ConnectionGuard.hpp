#ifndef INVENTORY_ERP_INCLUDE_DATABASE_CONNECTIONGUARD_HPP
#define INVENTORY_ERP_INCLUDE_DATABASE_CONNECTIONGUARD_HPP

#include <mysql/mysql.h>
#include "database/DatabaseManager.h"

namespace database {
    class ConnectionGuard {
    public:
        ConnectionGuard(): connection(DatabaseManager::getInstance().getConnection()) {};
        ~ConnectionGuard(){
            if (connection) {
                DatabaseManager::getInstance().releaseConnection(connection);
            }
        };

        MYSQL* get() {
            return connection;
        }
    private:
        MYSQL* connection;

    };
}

#endif // INVENTORY_ERP_INCLUDE_DATABASE_CONNECTIONGUARD_HPP