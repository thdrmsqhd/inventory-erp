#pragma once
#include "crow.h"
#include "web/controller/BaseController.h"
#include "web/di/Component.h"

namespace web::controller {
    class ItemController : public BaseController {
    public:
        crow::Blueprint getBlueprint() override;
    };
}
