#include "web/controller/WarehouseController.h"

using namespace crow;

namespace web {

Blueprint WarehouseController::getBlueprint() {
    Blueprint bp("api/warehouses");

    CROW_BP_ROUTE(bp, "/")([this](){
        warehouseService.getAllWarehouses();
        json::wvalue x;
        x["warehouses"][0]["id"] = 1;
        x["warehouses"][0]["name"] = "Main Warehouse (Blueprint)";
        x["warehouses"][0]["location"] = "1234 Inventory St.";
        x["warehouses"][1]["id"] = 2;
        x["warehouses"][1]["name"] = "Secondary Warehouse (Blueprint)";
        x["warehouses"][1]["location"] = "5678 Supply Ave.";
        
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

} // namespace web

static web::di::ComponentRegistry<web::controller::WarehouseController> regist("WarehouseController");