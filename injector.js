const fs = require("fs");

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Simple function check.
 * @param item
 * @returns {boolean}
 */
function isFunction(item) {
    return (item && typeof item === 'function' && !Array.isArray(item));
}


/**
 * Deep merge two objects.
 * @param target
 * @param sources
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}


class _Logger {

    constructor(modId) {
        this.modId = modId;
    }

    format(t) {
        if (this.modId)
            return  `[ModInjector (${this.modId})] [${t}]`;
        else return `[ModInjector] `;
    }
    debug(...data) {
        console.debug(this.format("DEBUG"), ...data)
    }

    error(...data) {
        console.error(this.format("ERROR"), ...data)
    }

    info(...data) {
        console.log(this.format("INFO"), ...data)
    }

    warn(...data) {
        console.warn(this.format("WARN"), ...data)
    }
}

class _ModInjector {

    baseCodex = undefined

    constructor() {
        this.loggers = new _Logger()
        // {}
        this.modsLoaders = []
    }
    
    createCodex() {
        let baseCodex = this.baseCodex
        this.loggers.debug("Create Codex...")
        let addCodex = (obj) => {
            mergeDeep(baseCodex, obj)
        }

        for (let i in this.modsLoaders) {
            if (this.modsLoaders[i].loaders.getCodex) {
                this.loggers.debug(`get codex for ${this.modsLoaders[i].name} ${i + 1}/${this.modCount}`)
                addCodex(this.modsLoaders[i].loaders.getCodex())
            }
        }

        return baseCodex;
    }

    /**
        @param {string} name
        @param {modLoader} loaders
        @return {number} id
     */
    registerLoaders(name, loaders) {
        if (!isObject(loaders)) throw new Error(this.loggers.format(`loaders should be valid object`, name))
        console.debug(`register ${name} mod with loader(s) : ${Object.getOwnPropertyNames(loaders).filter(function (p) {
            return typeof Math[p] === 'function';
        })}`)
        return  this.modsLoaders.push({
            name: name,
            loaders: loaders
        }) - 1;
    }

    inject() {
        for (let i in this.modsLoaders) {
            if (!this.modsLoaders[i].loaders.inject) continue;
            this.loggers.debug(`Inject mod ${i} ${i}/${this.modCount}`)
            this.modsLoaders[i].loaders.inject()
        }
    }

    init() {
        for (let i in this.modsLoaders) {
            if (!this.modsLoaders[i].loaders.init) continue;
            this.loggers.debug(`Init mod ${i} ${i}/${this.modCount}`)
            this.modsLoaders[i].loaders.init()
        }
    }


    get modCount() {
        return this.modsLoaders.length
    }

}

const ModInjector = new _ModInjector();

(function () {
    ModInjector.baseCodex = abstract_getCodex()
    abstract_getCodex = ModInjector.createCodex.bind(ModInjector)

    let cssToLoad = []

    try {
        fs.readdirSync(`${__dirname}/mods`).filter(d => fs.lstatSync(`${__dirname}/mods/${d}`).isDirectory()).forEach(d => {
            let result;
            try {
               result = JSON.parse(fs.readFileSync(`${__dirname}/mods/${d}/mod.json`).toString());
            } catch (e) {
                ModInjector.loggers.debug("missing mod.json for mod folder "+ d)
                return
            }

            if (result) {
                if (!result.id) {
                    ModInjector.loggers.debug("invalid mod.json for mod folder missing id"+ d)
                }
                if (result.js)
                    ModInjector.registerLoaders(result.id,  require(`${__dirname}/mods/${d}/${result.js}`).getLoader())
                if (result.css)
                    cssToLoad.push(`mods/${d}/${result.css}`)
            }
        })
        ModInjector.init()
        ModInjector.inject()
        window.addEventListener('DOMContentLoaded', () => {
            cssToLoad.forEach(path => {
                const l = document.createElement("link")
                l.rel = "stylesheet"
                l.type = "text/css"
                l.href = path
                document.head.appendChild(l)
            })
        });
    } catch (e) {
        ModInjector.loggers.debug("Unnable to read mods folder", e)
    }

})()