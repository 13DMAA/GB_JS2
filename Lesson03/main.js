const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
makeGETRequest = url => {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr);
            } else if (xhr.status != 200) {
                reject("Ошибка запроса!");
            }
        }
    })
};
class GoodsItem {
    //Класс объекта "товар"
    constructor(id_product, product_name = "Товар в пути", price = "Цена еще не определена", imgSrc = "goods-item.jpg") {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.imgSrc = imgSrc;
    }
    searchWithPrice() {
        //Ищет товар с ценой и добавляет подпись "Цена"
        //и знак рубля
        if (this.price !== "Цена еще не определена") {
            return "ruble";
        }
    }
    render() {
        //Добавляет разметку товара
        return `<div class="goods-item">
<span class="goods-item-title">${this.product_name}</span>
<img class="goods-item-img" src=${this.imgSrc}></img>
<p class="goods-item-price ${this.searchWithPrice()}">${this.price}</p>
<button class="buyGoodsBtn">В корзину</button>
</div>`;
    }
}

class GoodsList {
    //Класс объекта списка товаров
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`);
    }
    render(selector) {
        //Вывод товаров на страницу
        const divGoodsList = document.querySelector(`.${selector}`);
        let goodsListHtml = "";
        this.goods.forEach(item => {
            const goodItem = new GoodsItem(item.id_product, item.product_name, item.price, item.imgSrc);
            let goodItemRender = goodItem.render();
            goodsListHtml += goodItemRender;
        })
        divGoodsList.innerHTML = goodsListHtml;
    }
    sumAllGoods() {
        //определяет суммарную стоимость всех товаров
        let sum = 0;
        this.goods.forEach(item => {
            if (item.price)
                sum += item.price;
        });
        console.log(`Общая сумма товаров равна ${sum} рублей`);
    }
}

class Cart {
    constructor() {
        this.cartGoods = [];
        this.render();
        this.status = false;
        this.openCloseCart();
    }
    openCloseCart() {
        const cartButton = document.querySelector(".cart-button");
        const cartGoods = document.querySelector(".cart-goods");
        cartButton.addEventListener('click', () => {
            if (!this.status) {
                cartGoods.classList.remove("el-hidden");
                this.status = true;
            } else {
                cartGoods.classList.add("el-hidden");
                this.status = false;
            }
        })
    }

    render() {
        if (!Boolean(document.querySelector(".cart-goods"))) {
            document.querySelector("header").innerHTML += `<div class="cart-goods el-hidden"></div>`;
            console.log(document.querySelector("header"));
        }
        if (this.cartGoods.find(item => item.count)) {
            // console.log("Корзина не пуста");
            let cartGoodsHtml = "";
            this.cartGoods.forEach(e => {
                if (e.count)
                    cartGoodsHtml += e.render();
            })
            document.querySelector(".cart-goods").innerHTML = "";
            document.querySelector(".cart-goods").innerHTML += cartGoodsHtml;
        } else {
            document.querySelector(".cart-goods").innerHTML = "Корзина пуста";
        }
    }
    clean() {
        this.cartGoods = [];
    }
    incGood() {
        const buyGoodsBtn = document.querySelectorAll(".buyGoodsBtn");
        console.dir(buyGoodsBtn);
        buyGoodsBtn.forEach((goodItem, key) => {
            goodItem.addEventListener('click', () => {
                let findIndex;
                let findId = this.cartGoods.find((item, index) => {
                    if (item.id_product == list.goods[key].id_product) {
                        findIndex = index;
                        return true;
                    }
                });
                if (findId) {
                    console.log("Есть такой товар в корзине");
                    this.cartGoods[findIndex].count++;
                } else {
                    let cartItem = list.goods[key];
                    this.cartGoods.push(new CartItem(
                        cartItem.id_product,
                        cartItem.product_name,
                        cartItem.price,
                        cartItem.imgSrc));
                    let cartGoodsItemObj = this.cartGoods[this.cartGoods.length - 1];
                    if (!cartGoodsItemObj.count) {
                        cartGoodsItemObj.count = 0;
                    }
                    cartGoodsItemObj.count++;
                }
                console.log(this.cartGoods);
                // console.log(list.goods);
                this.render();
                this.decGood();
            });
        })
    }
    decGood() {
        const decGoodsBtn = document.querySelectorAll(".cart-dec-good");
        console.log(decGoodsBtn);
        decGoodsBtn.forEach(goodItem => {
            goodItem.addEventListener('click', (e) => {
                // console.dir(e.target.parentNode.children[0].innerHTML);
                let findIndex;
                let findId = this.cartGoods.find((item, index) => {
                    console.log(item.id_product);
                    console.dir(e.target.parentNode.children[0]);
                    if (item.id_product == e.target.parentNode.children[0].innerHTML) {
                        findIndex = index;
                        return true;
                    }
                });
                if (findId) {
                    console.log("Удаляем");
                    this.cartGoods[findIndex].count--;
                    console.log(this.cartGoods);
                }
                this.render();
                this.decGood();
            });
        })
    }
}
class CartItem {
    //Класс объекта "товар в корзине
    constructor(id_product, product_name = "Товар в пути", price = "Цена еще не определена", imgSrc = "goods-item.jpg") {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.imgSrc = imgSrc;
    }
    render() {
        //Добавляет разметку товара в корзине
        return `<div class="cart-goods-item">
<div class="cart-goods-item-id">${this.id_product}</div>
<span class="cart-goods-item-title">${this.product_name}</span>
<img class="cart-goods-item-img" src=${this.imgSrc}></img>
<p class="cart-goods-item-price">${this.price}</p>
<button class="cart-dec-good">-</button>
<button class="cart-inc-good">+</button>
</div>`;
    }
    delete() {}
}

const list = new GoodsList();
const cart = new Cart();
list.fetchGoods()
    .then(xhr => {
        return list.goods = JSON.parse(xhr.responseText);
    })
    .then(() => {
        list.render("goods-list");
    })
    .then(() => {
        cart.incGood();
        cart.decGood();
    });