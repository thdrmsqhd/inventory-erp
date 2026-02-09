#include "web/controller/ItemController.h"
#include "web/di/ComponentRegistry.h"

using namespace crow;

namespace web::controller {

Blueprint ItemController::getBlueprint() {
    Blueprint bp("api/items");

    CROW_BP_ROUTE(bp, "/")([](){
        json::wvalue x;
        x["items"][0]["id"] = 101;
        x["items"][0]["name"] = "CPU Core i9";
        x["items"][0]["category"] = "Processor";
        x["items"][1]["id"] = 102;
        x["items"][1]["name"] = "DDR5 RAM 32GB";
        x["items"][1]["category"] = "Memory";
        
        response res(x);
        res.add_header("Access-Control-Allow-Origin", "*");
        return res;
    });

    return bp;
}

} // namespace web::controller

static web::di::ComponentRegistry<web::controller::ItemController> regist("ItemController");
