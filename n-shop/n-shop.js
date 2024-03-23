
/**
 * function createProps<K extends keyof HTMLElementTagNameMap>(
 *     type: K,
 *     props: ObjectPros<HTMLElementTagNameMap[K]>,
 *     ...children: Node[]
 * ): HTMLElementTagNameMap[K]
 * @param {keyof HTMLElementTagNameMap} type
 * @param props
 * @param {Node|string} children
 * @returns {Node}
 */
function createProps(
    type,
    props,
    ...children
) {
    const e = document.createElement(type);
    if (props) {
        for (let propsKey in props) {
            let prosV = props[propsKey]
            if (prosV !== undefined && prosV !== null) {
                if (propsKey === "style") {
                    Object.entries(prosV).forEach(([prop, val]) => {
                        const [value, pri = ""] = val.split("!", 2);
                        e.style.setProperty(prop, value, pri);
                    });
                } else {
                    e[propsKey] = prosV
                }
            }
        }
    }
    children.forEach(c => {
        if (typeof c === "string") {
            e.insertAdjacentHTML('beforeend', c)
        } else {
            e.appendChild(c)
        }
    })
    return e
}

function getLoader() {
    return {

    getCodex() {

        let cats = {
            extraction: {
                defaultHidden: false,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>excavator</title><path d="M18.5 18.5C19.04 18.5 19.5 18.96 19.5 19.5S19.04 20.5 18.5 20.5H6.5C5.96 20.5 5.5 20.04 5.5 19.5S5.96 18.5 6.5 18.5H18.5M18.5 17H6.5C5.13 17 4 18.13 4 19.5S5.13 22 6.5 22H18.5C19.88 22 21 20.88 21 19.5S19.88 17 18.5 17M21 11H18V7H13L10 11V16H22L21 11M11.54 11L13.5 8.5H16V11H11.54M9.76 3.41L4.76 2L2 11.83C1.66 13.11 2.41 14.44 3.7 14.8L4.86 15.12L8.15 12.29L4.27 11.21L6.15 4.46L8.94 5.24C9.5 5.53 10.71 6.34 11.47 7.37L12.5 6H12.94C11.68 4.41 9.85 3.46 9.76 3.41Z" /></svg>',
                shortCut: 'o',
                items: ['gradient', 'pump', 'pump2', 'doublechannel', 'doublechannel2', 'valve', 'auxpump', 'auxpump2']
            },
            mining: {
                defaultHidden: false,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>pickaxe</title><path d="M14.79,10.62L3.5,21.9L2.1,20.5L13.38,9.21L14.79,10.62M19.27,7.73L19.86,7.14L19.07,6.35L19.71,5.71L18.29,4.29L17.65,4.93L16.86,4.14L16.27,4.73C14.53,3.31 12.57,2.17 10.47,1.37L9.64,3.16C11.39,4.08 13,5.19 14.5,6.5L14,7L17,10L17.5,9.5C18.81,11 19.92,12.61 20.84,14.36L22.63,13.53C21.83,11.43 20.69,9.47 19.27,7.73Z" /></svg>',
                shortCut: 'm',
                items: ['destabilizer', 'destabilizer2', 'destabilizer2a', 'entropic', 'entropic2', 'entropic2a', 'entropic3', 'consumer']
            },
            production: {
                defaultHidden: false,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>factory</title><path d="M4,18V20H8V18H4M4,14V16H14V14H4M10,18V20H14V18H10M16,14V16H20V14H16M16,18V20H20V18H16M2,22V8L7,12V8L12,12V8L17,12L18,2H21L22,12V22H2Z" /></svg>',
                shortCut: 'p',
                items: ['converter32', 'converter13', 'converter41', 'converter76', 'converter64', 'reflector', 'preheater']
            },
            automation: {
                defaultHidden: false,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="currentColor"><title>brain</title><path d="M21.33,12.91C21.42,14.46 20.71,15.95 19.44,16.86L20.21,18.35C20.44,18.8 20.47,19.33 20.27,19.8C20.08,20.27 19.69,20.64 19.21,20.8L18.42,21.05C18.25,21.11 18.06,21.14 17.88,21.14C17.37,21.14 16.89,20.91 16.56,20.5L14.44,18C13.55,17.85 12.71,17.47 12,16.9C11.5,17.05 11,17.13 10.5,17.13C9.62,17.13 8.74,16.86 8,16.34C7.47,16.5 6.93,16.57 6.38,16.56C5.59,16.57 4.81,16.41 4.08,16.11C2.65,15.47 1.7,14.07 1.65,12.5C1.57,11.78 1.69,11.05 2,10.39C1.71,9.64 1.68,8.82 1.93,8.06C2.3,7.11 3,6.32 3.87,5.82C4.45,4.13 6.08,3 7.87,3.12C9.47,1.62 11.92,1.46 13.7,2.75C14.12,2.64 14.56,2.58 15,2.58C16.36,2.55 17.65,3.15 18.5,4.22C20.54,4.75 22,6.57 22.08,8.69C22.13,9.8 21.83,10.89 21.22,11.82C21.29,12.18 21.33,12.54 21.33,12.91M16.33,11.5C16.9,11.57 17.35,12 17.35,12.57A1,1 0 0,1 16.35,13.57H15.72C15.4,14.47 14.84,15.26 14.1,15.86C14.35,15.95 14.61,16 14.87,16.07C20,16 19.4,12.87 19.4,12.82C19.34,11.39 18.14,10.27 16.71,10.33A1,1 0 0,1 15.71,9.33A1,1 0 0,1 16.71,8.33C17.94,8.36 19.12,8.82 20.04,9.63C20.09,9.34 20.12,9.04 20.12,8.74C20.06,7.5 19.5,6.42 17.25,6.21C16,3.25 12.85,4.89 12.85,5.81V5.81C12.82,6.04 13.06,6.53 13.1,6.56A1,1 0 0,1 14.1,7.56C14.1,8.11 13.65,8.56 13.1,8.56V8.56C12.57,8.54 12.07,8.34 11.67,8C11.19,8.31 10.64,8.5 10.07,8.56V8.56C9.5,8.61 9.03,8.21 9,7.66C8.92,7.1 9.33,6.61 9.88,6.56C10.04,6.54 10.82,6.42 10.82,5.79V5.79C10.82,5.13 11.07,4.5 11.5,4C10.58,3.75 9.59,4.08 8.59,5.29C6.75,5 6,5.25 5.45,7.2C4.5,7.67 4,8 3.78,9C4.86,8.78 5.97,8.87 7,9.25C7.5,9.44 7.78,10 7.59,10.54C7.4,11.06 6.82,11.32 6.3,11.13C5.57,10.81 4.75,10.79 4,11.07C3.68,11.34 3.68,11.9 3.68,12.34C3.68,13.08 4.05,13.77 4.68,14.17C5.21,14.44 5.8,14.58 6.39,14.57C6.24,14.31 6.11,14.04 6,13.76C5.81,13.22 6.1,12.63 6.64,12.44C7.18,12.25 7.77,12.54 7.96,13.08C8.36,14.22 9.38,15 10.58,15.13C11.95,15.06 13.17,14.25 13.77,13C14,11.62 15.11,11.5 16.33,11.5M18.33,18.97L17.71,17.67L17,17.83L18,19.08L18.33,18.97M13.68,10.36C13.7,9.83 13.3,9.38 12.77,9.33C12.06,9.29 11.37,9.53 10.84,10C10.27,10.58 9.97,11.38 10,12.19A1,1 0 0,0 11,13.19C11.57,13.19 12,12.74 12,12.19C12,11.92 12.07,11.65 12.23,11.43C12.35,11.33 12.5,11.28 12.66,11.28C13.21,11.31 13.68,10.9 13.68,10.36Z" /></svg>',
                shortCut: 'k',
                items: ['conductor', 'silo', 'silo2', 'chasm']
            },
            void: {
                defaultHidden: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>cube</title><path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z" /></svg>',
                shortCut:  'v',
                items: ['strange1', 'strange2', 'strange3', 'annihilator', 'flower', 'fruit', 'voidsculpture']
            },
            special: {
                defaultHidden: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg>',
                items: ['pinhole', 'vault', 'mega1', 'mega1a', 'mega1b', 'mega2', 'mega3', 'eye', 'generaldecay', 'waypoint', 'clicker1', 'clicker2', 'clicker3', 'injector', 'vessel', 'vessel2'],
            },
            uncategories: {
                defaultHidden: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>help</title><path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" /></svg>',
                items: []
            }
        }

        return {
            // entities: {
            //     pinhole: {
            //         n_shop_categories: "special"
            //     }
            // },
            nhop: {
                categories: cats
            }
        }
    },
    inject() {
        Shop = NShop
    }
}
}

class NShop {

    // master;
    // vessel;
    // currentOpenCategory: string|null
    // visibleCategories: []string
    // categoryMap
    // buildableItem: []


    constructor(_, master) {

        this.master = master
        this.categoryMap = {}
        this.currentOpenCategory = null;
        this.currentDisplay = {}
        this.existed = []
        this.init();
        this.checkLoop();

    }

    init() {
        for (const c in this.master.codex.nhop.categories) {
            for (const entity of this.master.codex.nhop.categories[c].items || []) {
                this.categoryMap[entity] = c
            }
        }

        this.renderInit();
    }

    renderInit() {
        if (document.getElementById('n-shop-container') !== null) {
            document.getElementById('n-shop-container').remove();
        }


        this.categoriesContainer = createProps('div', {
            className: 'categories'
        })
        this.categoryViewContainer = createProps('div', {
            className: 'category-view',
            id: 'n-shop-category-view',
            onwheel: (evt) => {
                evt.preventDefault();
                document.getElementById('n-shop-category-view').scrollLeft += evt.deltaY;
            }
        })

        document.body.appendChild(createProps('div', {
            id: 'n-shop-container',
            className: 'n-shop'
        }, this.categoriesContainer, this.categoryViewContainer))


        this.renderCategories();
    }

    renderCategories() {
        this.categoriesContainer.innerHTML = ''
        for (const c in this.master.codex.nhop.categories) {
            let cat = this.master.codex.nhop.categories[c]
            let ct = 0;
            for (const id in this.master.codex.entities) {
                if (this.isItemShouldBeVisible(this.master.codex.entities[id], id, c)) ct++;
                // if (this.master.entitiesInGame[item.name]) this.existed[item.name] = true
            }
            if (ct > 0) {
                this.categoriesContainer.appendChild(createProps('div', {
                    className: `category ${c === this.currentOpenCategory ? 'open' : ''}`,
                    onclick: this.openCategory.bind(this, c)
                }, cat.icon));
            }
        }
        this.renderCurrentCategory();
    }

    getItemRender(item, id) {
        const price = this.getItemPrice(item, id);
        const canAfford =  this.canAfford(item, id, price);

        return createProps('div', {
                id: 'n-shop-item-' + id,
                className: `item ${canAfford  ? '' : 'disable'}`,
                onmousedown: canAfford ? _ => {
                    this.master.pickupItem(id)
                    this.master.processMousemove()
                } : null
            },
                createProps('div', {className: 'info'},
                    createProps('div', {className: 'imageVessel'},
                        createProps('img', {
                        src: `img/shop/${id}.jpg`
                        })),
                    createProps('span', {
                        className: 'name',
                        innerText: this.master.words.entities[id].name,
                    }),
                ),
                createProps('div', {className: 'hoverInfo'},
                    createProps('p', {
                        className: 'description',
                        innerText: this.master.words.entities[id].description,
                    }),
                    createProps('div', {className: 'cost'}, ...this.getPriceRender(price))
                ),
                createProps('span', {
                    className: 'itemCounter',
                    innerText: this.master.entitiesInGame[id] || ''
                })
        )
    }

    getPriceRender(price) {
        return  price.map((p, key) =>  p ? createProps('span', {},
            createProps('div', {className: `rico r${key}`}),
            createProps('span', {className:  'priceString', innerText: this.master.makeReadable( Math.ceil(p))})
            )
            : null).filter(p  =>  p !== null)
    }

    getItemPrice(item, id) {
        const mult = item.priceExponent ** (this.master.entitiesInGame[id] || 0)
        return item.price.map(v => v*mult)
    }

    canAfford(item, id, price) {
        if (!price) price = this.getItemPrice(item, id)
        const source = this.master.resources

        for (let j = 0; j < price.length; j++){
            if ( price[j] > (source[j]||0)){
                return false;
            }
        }
        return true;
    }



    renderCurrentCategory() {
        this.categoryViewContainer.innerHTML = ""
        this.currentDisplay = {}
        if (this.currentOpenCategory === null) return;

        for (const id in this.master.codex.entities) {
            const item = this.master.codex.entities[id]
            if (!this.isItemShouldBeVisible(item, id)) continue;
            let itemR = this.getItemRender(item, id)
            this.currentDisplay[id] = itemR;
            this.categoryViewContainer.appendChild(itemR)
        }

    }

    openCategory(c) {
        console.log(c)
        // todo: check
        this.currentOpenCategory = c
        this.renderCategories();
    }

    isItemShouldBeVisible(item, id, cat) {
        if (cat === undefined) cat = this.currentOpenCategory;
        return item.canPurchase
            && this.getCategoriesOfEntity(id) === cat
            && !this.master.onlyones[id]
            && this.master.unlockedEntities[id]
            && !id.startsWith('eraser');
    }

    getCategoriesOfEntity(e) {
        return this.categoryMap[e] || 'uncategories'
    }

    // focus an Item
    centerItem(name) {
        const cat = this.getCategoriesOfEntity(name);
        if (cat) {
            this.openCategory(cat)
            if(this.currentDisplay[name]) this.currentDisplay[name].scrollIntoView({behavior: `smooth`, block: `center`})
        }

    }

    switchPlane(p) {
        console.log("switchPlane - ", p)
    }
    checkLoop(){

        setTimeout(_=>{this.checkLoop()}, 100)
        this.check()

    }
    check() {
        for (const id in this.master.codex.entities) {
            const item = this.master.codex.entities[id]
            if (!item.canPurchase) continue;

            let unlocked = this.master.unlockedEntities[id] || false
            if (!unlocked) {
                unlocked = item.shouldUnlock && item.shouldUnlock(this.master)
                if (unlocked) {
                    this.master.unlockedEntities[id] = true
                    this.renderCategories();
                    return
                }
            }

            const htmlE = this.currentDisplay[id];
            if (!htmlE) continue;


            let afford = true
            const mult = item.priceExponent ** (this.master.entitiesInGame[id] || 0)

            const source = this.master.resources

            for (let j = 0; j < item.price.length; j++) {
                if (item && item.price[j] * mult > source[j]) {
                    afford = false
                    break
                }
            }

            if (afford && htmlE.classList.contains('disable'))
                htmlE.classList.remove('disable')
            else if (!afford && !htmlE.classList.contains('disable'))
                htmlE.classList.add('disable')

        }
    }

    updateElements() {
        this.renderCategories();
    }

    selectItem() {
        console.log("selectItem")
    }

    selectNextItem() {
        console.log("selectNextItem")
    }

    selectPreviousItem() {
        console.log("selectPreviousItem")
    }

    deselectItem() {
        console.log("deselectItem")
    }

    setExisted(v) {
        this.existed = v
        this.renderCategories();
    }


}

module.exports = {getLoader}