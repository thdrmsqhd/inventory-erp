#ifndef WEB_DI_COMPONENTREGISTRY_H
#define WEB_DI_COMPONENTREGISTRY_H

#include "web/di/DIContainer.hpp"

namespace web::di {
    template<typename T>
    class ComponentRegistry {
    public:
        ComponentRegistry(const std::string& name) {
            DIContainer::registerFactoryCreator(name, []() {
                return std::make_unique<T>();
            });
        }
    };
}

#endif // WEB_DI_COMPONENTREGISTRY_H