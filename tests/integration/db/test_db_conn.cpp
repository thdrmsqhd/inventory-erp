#include <gtest/gtest.h>
#include "config/ConfigManager.h"
#include "database/DatabaseManager.h"

TEST(DatabaseTest, ConnectionTest) {
	auto& db = DatabaseManager::getInstance();
    db.initPool(1);
	MYSQL* conn = db.getConnection();
	EXPECT_NE(conn, nullptr);
    if (conn) {
        db.releaseConnection(conn);
    }
}
