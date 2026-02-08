#include "database/DatabaseManager.h"
#include <iostream>

DatabaseManager::DatabaseManager() {}

DatabaseManager::~DatabaseManager() {
    while (!pool.empty()) {
        MYSQL* conn = pool.front();
        mysql_close(conn);
        pool.pop();
    }
}

DatabaseManager& DatabaseManager::getInstance() {
    static DatabaseManager instance;
    return instance;
}

void DatabaseManager::initPool(int poolSize) {
    std::lock_guard<std::mutex> lock(mutex_);
    for (int i = 0; i < poolSize; ++i) {
        MYSQL* conn = createNewConnection();
        if (conn) {
            pool.push(conn);
        }
    }
}

MYSQL* DatabaseManager::getConnection() {
    std::unique_lock<std::mutex> lock(mutex_);
    condition_.wait(lock, [this] { return !pool.empty(); });

    MYSQL* conn = pool.front();
    pool.pop();
    return conn;
}

void DatabaseManager::releaseConnection(MYSQL* conn) {
    if (!conn) return;
    std::lock_guard<std::mutex> lock(mutex_);
    pool.push(conn);
    condition_.notify_one();
}

MYSQL* DatabaseManager::createNewConnection() {
    MYSQL* conn = mysql_init(nullptr);
    auto& config = ConfigManager::getInstance();
    
    if (mysql_real_connect(conn,
                           config.get("DB_HOST").c_str(),
                           config.get("DB_USER").c_str(),
                           config.get("DB_PASS").c_str(),
                           config.get("DB_NAME").c_str(),
                           std::stoi(config.get("DB_PORT")), nullptr, 0)) {
        return conn;
    }
    
    std::cerr << "DB Connection Error: " << mysql_error(conn) << std::endl;
    return nullptr;
}
