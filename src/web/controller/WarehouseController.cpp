#include "web/controller/WarehouseController.h"
#include "web/di/ComponentRegistry.h"

using namespace crow;

namespace web::controller {

Blueprint WarehouseController::getBlueprint() {
    Blueprint bp("api/warehouses");

    CROW_BP_ROUTE(bp, "/")([this](){
        std::vector<web::dto::WarehouseDTO> warehouses = warehouseService.getAllWarehouses();
        json::wvalue x;
        x["warehouses"] = json::wvalue::list();
        
        for (size_t i = 0; i < warehouses.size(); ++i) {
            json::wvalue w;
            w["id"] = warehouses[i].id;
            w["name"] = warehouses[i].name;
            w["location"] = warehouses[i].location;
            w["capacity"] = warehouses[i].capacity;
            x["warehouses"][i] = std::move(w);
        }
        
        response res(x);
        res.add_header("Access-Control-Allow-Origin", "*");
        return res;
    });

    CROW_BP_ROUTE(bp, "/<int>")([this](int id){
        json::wvalue x;
        x["id"] = id;
        x["name"] = "Warehouse " + std::to_string(id);
        
        response res(x);
        res.add_header("Access-Control-Allow-Origin", "*");
        return res;
    });

    return bp;
}

} // namespace web::controller

static web::di::ComponentRegistry<web::controller::WarehouseController> regist("WarehouseController");