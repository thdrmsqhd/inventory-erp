#ifndef INVENTORY_ERP_CONFIG_LOADER_HPP
#define INVENTORY_ERP_CONFIG_LOADER_HPP

#include <string>
#include <memory>
#include <vector>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

namespace web::config {
    class ConfigLoader {
        public:
            static std::unique_ptr<json> loadConfig(const std::string& filepath) {
                std::unique_ptr<std::ifstream> configFile = std::make_unique<std::ifstream>(filepath);

                if (!(*configFile).is_open()) {
                    throw std::runtime_error("설정 파일을 찾을 수 없습니다: " + filepath);
                }

                std::unique_ptr<json> configJson = std::make_unique<json>();
                json::parse(*configFile);

                return configJson;
            }

            static std::vector<std::string> getServices(const json& config) {
                return config["services"].get<std::vector<std::string>>();
            }
    };
}

#endif // INVENTORY_ERP_CONFIG_LOADER_HPP