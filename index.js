"use strict";
class Product {
    constructor(name, id = Date.now() * Math.random(), scores = 0) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }
    getData() {
        return {
            id: this.id,
            name: this.name,
            scores: this.scores
        };
    }
}
class ProductManager {
    constructor() {
        var _a;
        this.products = [];
        let productsLocal = JSON.parse((_a = localStorage.getItem("products")) !== null && _a !== void 0 ? _a : "[]");
        let productsTemp = productsLocal.map((item) => new Product(item.name, item.id, item.scores));
        this.products = productsTemp;
        this.renderProducts();
    }
    addProduct(newProduct) {
        this.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }
    increase(id) {
        let a = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].getData().id === id) {
                a = i;
            }
        }
        const increase = this.products.filter((product) => product.getData().id == id);
        increase[0].scores = increase[0].scores + 1;
        this.products.splice(a, 1, increase[0]);
        localStorage.setItem("products", JSON.stringify(this.products));
        console.log("🚀 ~ file: index.ts:41 ~ ProductManager ~ increase ~ increase:", this.products);
        this.renderProducts();
    }
    discrease(id) {
        let a = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].getData().id === id) {
                a = i;
            }
        }
        const increase = this.products.filter((product) => product.getData().id == id);
        increase[0].scores = increase[0].scores - 1;
        this.products.splice(a, 1, increase[0]);
        localStorage.setItem("products", JSON.stringify(this.products));
        console.log("🚀 ~ file: index.ts:41 ~ ProductManager ~ increase ~ increase:", this.products);
        this.renderProducts();
    }
    deleteProduct(id) {
        this.products = this.products.filter((product) => product.getData().id !== id);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }
    renderProducts() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (this.findLargestNumber() == 0) {
            console.log("vào if");
            let a = 0;
            let b = JSON.parse((_a = localStorage.getItem("products")) !== null && _a !== void 0 ? _a : "[]");
            const player = document.getElementById("player");
            const points = document.getElementById("Points");
            const productList = document.getElementById("product-list");
            if (JSON.parse((_b = localStorage.getItem("products")) !== null && _b !== void 0 ? _b : "[]").length > 0) {
                player.innerHTML = JSON.parse((_c = localStorage.getItem("products")) !== null && _c !== void 0 ? _c : "[]").length;
                for (let i = 0; i < b.length; i++) {
                    console.log('render', JSON.parse((_d = localStorage.getItem("products")) !== null && _d !== void 0 ? _d : "[]"));
                    a += b[i].scores;
                }
                points.innerHTML = a.toString();
                console.log('ádasdas', JSON.parse((_e = localStorage.getItem("products")) !== null && _e !== void 0 ? _e : "[]").length + 1);
            }
            else {
                player.innerHTML = "0";
                points.innerHTML = "0";
            }
            productList.innerHTML = "";
            this.products.forEach((product, index) => {
                const listItem = document.createElement("div");
                listItem.innerHTML =
                    `
               
                <div class = "renderNote color">
                <span class="material-symbols-outlined deleteNote" onclick="productManager.deleteProduct(${product.getData().id})">
                close
                </span>
                
                 <span>${product.getData().name}</span>
                 <span class="material-symbols-outlined" onclick="productManager.discrease(${product.getData().id})">
                    remove
                </span>
                <span> ${product.getData().scores}</span>
                 <span class="material-symbols-outlined" onclick="productManager.increase(${product.getData().id})">
                    add
                 </span>
        </div>



              
            `;
                productList.appendChild(listItem);
            });
        }
        else {
            let a = 0;
            let b = JSON.parse((_f = localStorage.getItem("products")) !== null && _f !== void 0 ? _f : "[]");
            const player = document.getElementById("player");
            const points = document.getElementById("Points");
            const productList = document.getElementById("product-list");
            if (JSON.parse((_g = localStorage.getItem("products")) !== null && _g !== void 0 ? _g : "[]").length > 0) {
                player.innerHTML = JSON.parse((_h = localStorage.getItem("products")) !== null && _h !== void 0 ? _h : "[]").length;
                for (let i = 0; i < b.length; i++) {
                    console.log('render', JSON.parse((_j = localStorage.getItem("products")) !== null && _j !== void 0 ? _j : "[]"));
                    a += b[i].scores;
                }
                points.innerHTML = a.toString();
                console.log('ádasdas', JSON.parse((_k = localStorage.getItem("products")) !== null && _k !== void 0 ? _k : "[]").length + 1);
            }
            else {
                player.innerHTML = "0";
                points.innerHTML = "0";
            }
            productList.innerHTML = "";
            this.products.forEach((product, index) => {
                const listItem = document.createElement("div");
                let largest = this.findLargestNumber();
                if (product.getData().scores === largest) {
                    listItem.innerHTML =
                        `
                        <div class = "renderNote color">
                            <span class="material-symbols-outlined deleteNote" onclick="productManager.deleteProduct(${product.getData().id})">
                                close
                            </span>
                            <span class="material-symbols-outlined">
                                crowdsource
                            </span>
                            <span>${product.getData().name}</span>
                            <span class="material-symbols-outlined" onclick="productManager.discrease(${product.getData().id})">
                                remove
                            </span>
                            <span> ${product.getData().scores}</span>
                            <span class="material-symbols-outlined" onclick="productManager.increase(${product.getData().id})">
                                add
                            </span>
                        </div>
                        `;
                }
                else {
                    listItem.innerHTML =
                        `
                        <div class = "renderNote color">
                            <span class="material-symbols-outlined deleteNote" onclick="productManager.deleteProduct(${product.getData().id})">
                                close
                            </span>
                            <span>${product.getData().name}</span>
                            <span class="material-symbols-outlined" onclick="productManager.discrease(${product.getData().id})">
                                remove
                            </span>
                            <span> ${product.getData().scores}</span>
                            <span class="material-symbols-outlined" onclick="productManager.increase(${product.getData().id})">
                                add
                            </span>
                        </div>
                        `;
                }
                productList.appendChild(listItem);
            });
        }
    }
    findLargestNumber() {
        if (this.products.length === 0) {
            return 0;
        }
        let largest = this.products[0].scores;
        for (let i = 1; i < this.products.length; i++) {
            if (this.products[i].scores > largest) {
                largest = this.products[i].scores;
            }
        }
        return largest;
    }
}
//----------------
const productManager = new ProductManager();
function addProduct() {
    const productName = document.getElementById("add");
    if (productName.value) {
        const newProduct = new Product(productName.value);
        productManager.addProduct(newProduct);
    }
    document.getElementById("add").value = '';
}
function findLargestNumber(numbers) {
    if (numbers.length === 0) {
        return undefined;
    }
    let largest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }
    return largest;
}
