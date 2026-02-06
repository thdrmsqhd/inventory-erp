#include <gtest/gtest.h>
#include <cpr/cpr.h>
#include "crow.h"
#include "web/RouteConfig.h"

class HealthCheckFixture : public ::testing::Test {
	protected:
		std::thread server_thread;
		crow::SimpleApp app;
		std::promise<void> server_ready;
		std::future<void> ready_future;

		void SetUp() override {
			ready_future = server_ready.get_future();
			
			server_thread = std::thread([this]() {
					registerRoute(app);
					this->server_ready.set_value();
					app.port(18081).bindaddr("127.0.0.1").run();
			});
			
			ready_future.wait();
			std::this_thread::sleep_for(std::chrono::milliseconds(100));
		}

		void TearDown() override {
			app.stop();
			if (server_thread.joinable()) server_thread.join();
		}
};

TEST_F(HealthCheckFixture, HealthCheckReturnsOK) {
	cpr::Response response = cpr::Get(cpr::Url{"http://127.0.0.1:18081/health"});
	std::cout << response.text << std::endl;
	EXPECT_EQ(response.status_code, 200);
	EXPECT_EQ(response.text, "{\"status\":\"ok\"}");
}

TEST_F(HealthCheckFixture, APIVersionReturnsCorrectly) {
	cpr::Response response = cpr::Get(cpr::Url{"http://127.0.0.1:18081/api/version"});
	std::cout << response.text << std::endl;
	EXPECT_EQ(response.status_code, 200);
	EXPECT_EQ(response.text, "{\"version\":\"1.0.0\"}");
}
