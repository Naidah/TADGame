class Renderer {
    constructor() {
        let c = document.getElementById("gameCanvas");
        this._ctx = c.getContext("2d");
    }

    getContext() {
        return this._ctx;
    }
}

_renderer = null;
function getRenderer() {
    if (_renderer == null) {
        _renderer = new Renderer();
    }
    return _renderer;
}

export {getRenderer};