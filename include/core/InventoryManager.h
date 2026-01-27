#ifndef INVENTORY_MANAGER_H
#define INVENTORY_MANAGER_H

#include <string>

class InventoryManager {
	public:
		static InventoryManager& getInstance() {
			static InventoryManager instance;
			return instance;
		}

		std::string getHelloWorld(){
			return "Hello ERP";
		}

};

#endif
