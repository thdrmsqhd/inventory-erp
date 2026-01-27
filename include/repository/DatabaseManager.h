#pragma once
#include <mysql/mysql.h>
#include <string>
#include <iostream>
#include "core/ConfigManager.h"

class DatabaseManager {
	public:
		DatabaseManager(){
			conn = mysql_init(nullptr);
		}

		bool connect() {
			auto& config = ConfigManager::getInstance();
			if(mysql_real_connect(conn,
						config.get("DB_HOST").c_str(),
						config.get("DB_USER").c_str(),
						config.get("DB_PASS").c_str(),
						config.get("DB_NAME").c_str(),
						std::stoi(config.get("DB_PORT")),nullptr,0)){
				return true;
			}
			std::cerr << "DB Connection Error: " << mysql_error(conn) << std::endl;
			return false;
		}

		~DatabaseManager() {
			if (conn) mysql_close(conn);
		}

	private:
		MYSQL* conn;
};
