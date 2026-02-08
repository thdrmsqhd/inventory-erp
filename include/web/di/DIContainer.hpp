#ifndef INCLUDE_WEB_DI_DICONTAINER_H_
#define INCLUDE_WEB_DI_DICONTAINER_H_

#include <map>
#include <string>
#include <memory>
#include <vector>
#include "web/controller/BaseController.h"

using namespace std;

namespace web::di {
    class DIContainer {
        private:
            static unique_ptr<DIContainer> container;
            static map<string, function<unique_ptr<Component>()>> creators; // 생성자 Factory 맵
            map<string, void*> instances;
            vector<web::controller::BaseController*> controllers;

            DIContainer() {}
        
        public:
            DIContainer(const DIContainer&) = delete;
            DIContainer& operator=(const DIContainer&) = delete;
        
            static DIContainer& getContainer(){
                if (!container) {
                    container = make_unique<DIContainer>();
                }

                return *container;
            }

            static void registerFactoryCreator(const string& name, function<unique_ptr<Component>()> creator) {
                creators[name] = creator;
            }

            void autoRegisterComponents() {
                for (auto& [name, creator] : creators) {
                    auto instance = creator();
                    instances[name] = instance.get();
                    
                    // BaseController 상속 확인
                    if (auto controller = dynamic_cast<web::controller::BaseController*>(instance.get())) {
                        controllers.push_back(controller);
                    }
                }
            }

            Component* getInstance(const string& name) {
                if (instances.find(name) != instances.end()) {
                    return instances[name].get();
                }

                return nullptr;
            }

            void registerController(web::controller::BaseController* controller) {
                controllers.push_back(controller);
            }

            const vector<web::controller::BaseController*>& getAllControllers() const {
                return controllers;
            }

            void cleanup() {
                instances.clear();
            }
    };

    unique_ptr<DIContainer> DIContainer::container = nullptr;
    map<string, function<unique_ptr<Component>()>> DIContainer::creators;
}

#endif // INCLUDE_WEB_DI_DICONTAINER_H_