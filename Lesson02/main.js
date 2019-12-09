class GoodsItem {
    //Класс объекта "товар"
    constructor(title = "Товар в пути", price = "Цена еще не определена", imgSrc = "goods-item.jpg") {
        this.title = title;
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
<h3 class="goods-item-title">${this.title}</h3>
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
        //Список товаров
        this.goods = [{
                title: 'Shirt',
                price: 100
            },
            {
                title: 'Socks',
                price: 190
            },
            {
                title: 'Jacket',
                price: 110
            },
            {
                title: 'Shoes',
                price: 130
            },
            {},
            {},
            {},
            {}
        ];
        // console.log(this.goods);
    }
    render() {
        //Вывод товаров на страницу
        const divGoodsList = document.querySelector(".goods-list");
        let goodsListHtml = "";
        this.goods.forEach(item => {
            const goodItem = new GoodsItem(item.title, item.price, item.imgSrc);
            let goodItemRender = goodItem.render();
            goodsListHtml += goodItemRender;
        })
        divGoodsList.innerHTML = goodsListHtml;
    }
    sumAllGoods() {
        //определяет суммарную стоимость всех товаров
        let sum = 0;
        this.goods.forEach(item => {
            // console.log(item.price);
            if (item.price)
                sum += item.price;
        });
        console.log(`Общая сумма товаров равна ${sum} рублей`);
    }
}

class Cart {
    //Класс объекта корзина
    constructor() {
        this.cart = [];
    }
    renderQuantity() {
        //Показывает в "круглешке" рядом с текстом
        //"Корзина" общее количество добавленных товаров

    }
    renderCartList() {
        //Раворачивает окно со списком добавленных товаров
    }
    showTotalPrice() {
        //Показывает общую сумму товаров, добывленных в корзину
    }
}

class GoodAddCart {
    //Класс товара, добавленного в корзину
    //!!!Не знаю, что Вы расскажете дальше,
    //но мне кажется, что здесь не нужен конструктор,
    //потому что зачем создавать новый объект,
    //ведь можно просто дополнить методы этого класса
    //в объект товара, как только тот попадет в корзину
    showNumberList() {
        //Показать порядковый номер в списке выбранных товаров
    }
    showSmallImg() {
        //Показать маленькую картинку
    }
    showTitle() {
        //Показать название товара
    }
    showPrice() {
        //Показать цену
    }
    showTotalPrice() {
        //Показать сумму за один вид товара = цена * кол-во
    }
    showQuantity() {
        //Показать количество добавленных товаров одного вида/артикула
    }
    plus() {
        //Добавить еще один товар/увеличить на 1шт.
    }
    minus() {
        //Уменьшить количество одного типа товара на 1шт.
    }
    delete() {
        //удалить товар из корзины
    }

}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumAllGoods();