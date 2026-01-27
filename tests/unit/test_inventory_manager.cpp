#include <gtest/gtest.h>
#include "core/InventoryManager.h"

TEST(InventoryMangerTest, HelloWorldReturn) {
	auto& manager = InventoryManager::getInstance();
	EXPECT_EQ(manager.getHelloWorld(), "Hello ERP");
}
