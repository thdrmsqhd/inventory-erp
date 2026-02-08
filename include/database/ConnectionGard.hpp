#ifndef INVENTORY_ERP_INCLUDE_DATABASE_CONNECTIONGARD_HPP
#define INVENTORY_ERP_INCLUDE_DATABASE_CONNECTIONGARD_HPP

#include <mysql/mysql.h>

namespace database {
    class ConnectionGard {
    public:
        ConnectionGard(): connection(DatabaseManager::getInstance().getConnection()) {};
        ~ConnectionGard(){
            if (connection) {
                DatabaseManager::getInstance().releaseConnection(connection);
            }
        };

        MYSQL* getConnection() {
            return connection;
        }
    private:
        MYSQL* connection;

    };
}

#endif // INVENTORY_ERP_INCLUDE_DATABASE_CONNECTIONGARD_HPP