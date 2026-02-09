#pragma once
#include "crow.h"
#include "web/di/Component.h"

namespace web::controller {
    class BaseController : virtual public web::di::Component {
    public:
        virtual ~BaseController() = default;
        virtual crow::Blueprint getBlueprint() = 0;
    };
}
