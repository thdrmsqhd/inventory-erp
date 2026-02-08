#pragma once
#include "web/controller/BaseController.h"

namespace web::controller {
    class ItemController : public BaseController {
    public:
        crow::Blueprint getBlueprint() override;
    };
}
