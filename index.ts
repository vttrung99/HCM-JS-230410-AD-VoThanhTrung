class Product {
    id: number;
    name: string;
    scores: number

    constructor(name: string, id: number = Date.now() * Math.random(), scores: number = 0) {
        this.id = id;
        this.name = name;
        this.scores = scores
    }

    getData(): { id: number; name: string, scores: number } {
        return {
            id: this.id,
            name: this.name,
            scores: this.scores
        };
    }
}

class ProductManager {
    products: Product[] = [];

    constructor() {
        let productsLocal = JSON.parse(localStorage.getItem("products") ?? "[]");
        let productsTemp = productsLocal.map((item: { name: string; id: number; scores: number }) =>
            new Product(item.name, item.id, item.scores
            ));
        this.products = productsTemp;
        this.renderProducts();
    }

    addProduct(newProduct: Product) {
        this.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }

    increase(id: number) {
        let a: number = -1
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].getData().id === id) {
                a = i
            }
        }
        const increase = this.products.filter((product) => product.getData().id == id);
        increase[0].scores = increase[0].scores + 1
        this.products.splice(a, 1, increase[0])
        localStorage.setItem("products", JSON.stringify(this.products));
        console.log("🚀 ~ file: index.ts:41 ~ ProductManager ~ increase ~ increase:", this.products)
        this.renderProducts();
    }
    discrease(id: number) {
        let a: number = -1
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].getData().id === id) {
                a = i
            }
        }
        const increase = this.products.filter((product) => product.getData().id == id);
        increase[0].scores = increase[0].scores - 1
        this.products.splice(a, 1, increase[0])
        localStorage.setItem("products", JSON.stringify(this.products));
        console.log("🚀 ~ file: index.ts:41 ~ ProductManager ~ increase ~ increase:", this.products)
        this.renderProducts();
    }
    deleteProduct(id: number) {
        this.products = this.products.filter((product) => product.getData().id !== id);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.renderProducts();
    }

    renderProducts() {
        if (this.findLargestNumber() == 0) {
            console.log("vào if");

            let a: number = 0
            let b = JSON.parse(localStorage.getItem("products") ?? "[]")
            const player = document.getElementById("player") as HTMLInputElement;
            const points = document.getElementById("Points") as HTMLInputElement;
            const productList = document.getElementById("product-list") as HTMLUListElement;
            if (JSON.parse(localStorage.getItem("products") ?? "[]").length > 0) {
                player.innerHTML = JSON.parse(localStorage.getItem("products") ?? "[]").length
                for (let i = 0; i < b.length; i++) {
                    console.log('render', JSON.parse(localStorage.getItem("products") ?? "[]"));
                    a += b[i].scores
                }
                points.innerHTML = a.toString()
                console.log('ádasdas', JSON.parse(localStorage.getItem("products") ?? "[]").length + 1);

            } else {
                player.innerHTML = "0";
                points.innerHTML = "0"
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
        } else {
            let a: number = 0
            let b = JSON.parse(localStorage.getItem("products") ?? "[]")
            const player = document.getElementById("player") as HTMLInputElement;
            const points = document.getElementById("Points") as HTMLInputElement;
            const productList = document.getElementById("product-list") as HTMLUListElement;
            if (JSON.parse(localStorage.getItem("products") ?? "[]").length > 0) {
                player.innerHTML = JSON.parse(localStorage.getItem("products") ?? "[]").length
                for (let i = 0; i < b.length; i++) {
                    console.log('render', JSON.parse(localStorage.getItem("products") ?? "[]"));
                    a += b[i].scores
                }
                points.innerHTML = a.toString()
                console.log('ádasdas', JSON.parse(localStorage.getItem("products") ?? "[]").length + 1);

            } else {
                player.innerHTML = "0";
                points.innerHTML = "0"
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
                } else {
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

    findLargestNumber(): number {
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
    const productName = document.getElementById("add") as HTMLInputElement;

    if (productName.value) {
        const newProduct = new Product(productName.value);


        productManager.addProduct(newProduct);
    }
    (document.getElementById("add") as HTMLInputElement).value = ''
}


function findLargestNumber(numbers: number[]) {
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
