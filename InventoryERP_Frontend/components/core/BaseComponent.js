export class BaseComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.afterRender();
    }

    afterRender() {
        // Optional hook
    }

    setState(partialState) {
        this.state = Object.assign({}, this.state || {}, partialState || {});
        this.render();
        this.afterRender();
    }

    render() {
        // Override in child classes
    }
}
