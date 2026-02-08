#pragma once
#include <mysql/mysql.h>
#include <string>
#include <queue>
#include <mutex>
#include <condition_variable>
#include "config/ConfigManager.h"

class DatabaseManager {
public:
    static DatabaseManager& getInstance();

    void initPool(int poolSize = 5);
    MYSQL* getConnection();
    void releaseConnection(MYSQL* conn);

    ~DatabaseManager();

private:
    DatabaseManager();

    MYSQL* createNewConnection();

    std::queue<MYSQL*> pool;
    std::mutex mutex_;
    std::condition_variable condition_;
};
