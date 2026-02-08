#pragma once
#include <fstream>
#include <string>
#include <sstream>
#include <unordered_map>

class ConfigManager {
	public:
		static ConfigManager& getInstance() {
			static ConfigManager instance;
			return instance;
		}

		void loadEnv(const std::string& filename) {
			std::ifstream envFile(filename);
			std::string line;
			while (std::getline(envFile, line)) {
				std::istringstream is_line(line);
				std::string key, value;
				if(std::getline(is_line, key, '=') && std::getline(is_line, value)) {
					env_map[key] = value;
				}
			}
		}

		std::string get(const std::string& key) {return env_map[key];}

	private:
		ConfigManager() {}
		std::unordered_map<std::string, std::string> env_map;
};
