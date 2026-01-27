#include <gtest/gtest.h>
#include "core/ConfigManager.h"
#include "repository/DatabaseManager.h"

TEST(DatabaseTest, ConnectionTest) {
	auto& config = ConfigManager::getInstance();

	config.loadEnv("../.env");

	DatabaseManager db;
	EXPECT_TRUE(db.connect());
}
