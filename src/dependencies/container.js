class Container {
    constructor() {
        this._factories = new Map();
        this._instances = new Map();
    }

    register(name, factory) {
        this._factories.set(name, factory);
    }

    resolve(name) {
        if (this._instances.has(name)) {
            return this._instances.get(name);
        }
        const factory = this._factories.get(name);
        if (!factory) {
            throw new Error(`Dependency '${name}' not registered`);
        }
        const instance = factory(this);
        this._instances.set(name, instance);
        return instance;
    }

    get(name) {
        return this.resolve(name);
    }
}

module.exports = Container;
