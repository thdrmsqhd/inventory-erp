#pragma once
#include "crow.h"

namespace web::controller {
    class BaseController {
    public:
        virtual ~BaseController() = default;
        virtual crow::Blueprint getBlueprint() = 0;
    };
}
