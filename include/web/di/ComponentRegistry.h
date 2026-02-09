#ifndef WEB_DI_COMPONENTREGISTRY_H
#define WEB_DI_COMPONENTREGISTRY_H

#include "web/di/DIContainer.hpp"

namespace web::di {
    template<typename T>
    class ComponentRegistry {
    public:
        ComponentRegistry(const std::string& name) {
            DIContainer::registerFactoryCreator(name, []() {
                return std::unique_ptr<Component>(new T());
            });
        }
    };
}

#endif // WEB_DI_COMPONENTREGISTRY_H