#ifndef INCLUDE_WEB_DI_DICONTAINER_H_
#define INCLUDE_WEB_DI_DICONTAINER_H_

#include <map>
#include <string>
#include <memory>
#include <vector>
#include <functional>
#include "web/di/Component.h"
#include "web/controller/BaseController.h"

using namespace std;

namespace web::di {
    class DIContainer {
        private:
            map<string, unique_ptr<Component>> instances;
            vector<web::controller::BaseController*> controllers;

            DIContainer() {}
        
        public:
            DIContainer(const DIContainer&) = delete;
            DIContainer& operator=(const DIContainer&) = delete;
        
            static DIContainer& getContainer(){
                static unique_ptr<DIContainer> container(new DIContainer());
                return *container;
            }

            static void registerFactoryCreator(const string& name, function<unique_ptr<Component>()> creator) {
                getCreators()[name] = creator;
            }

            void autoRegisterComponents() {
                auto& creators = getCreators();
                for (auto it = creators.begin(); it != creators.end(); ++it) {
                    getInstance(it->first);
                }
            }

            Component* getInstance(const string& name) {
                if (instances.find(name) != instances.end()) {
                    return instances[name].get();
                }

                auto& creators = getCreators();
                if (creators.find(name) != creators.end()) {
                    // 순환 참조 방지를 위해 임시 마킹이나 체크가 필요할 수 있으나 
                    // 현재는 단순 재귀 생성으로 구현
                    auto instance = creators[name]();
                    Component* rawPtr = instance.get();
                    instances[name] = std::move(instance);

                    // BaseController 상속 확인 (자동 등록용)
                    if (auto controller = dynamic_cast<web::controller::BaseController*>(rawPtr)) {
                        bool alreadyExists = false;
                        for (auto* c : controllers) {
                            if (c == controller) {
                                alreadyExists = true;
                                break;
                            }
                        }
                        if (!alreadyExists) {
                            controllers.push_back(controller);
                        }
                    }
                    return rawPtr;
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

        private:
            static map<string, function<unique_ptr<Component>()>>& getCreators() {
                static map<string, function<unique_ptr<Component>()>> creators;
                return creators;
            }
    };
}

#endif // INCLUDE_WEB_DI_DICONTAINER_H_