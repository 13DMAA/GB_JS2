const goods = [{
        title: 'Shirt',
        price: 150
    },
    {
        title: 'Socks',
        price: 150
    },
    {
        title: 'Jacket',
        price: 150
    },
    {
        title: 'Shoes',
        price: 150
    },
    {},
    {},
    {},
    {}
];

const renderGoodsItem = (title = "Товар в пути", price = "Цена еще не определена", imgSrc = "goods-item.jpg") =>
    `<div class="goods-item">
    <h3 class="goods-item-title">${title}</h3>
    <img class="goods-item-img" src=${imgSrc}></img>
    <p class="goods-item-price ruble">${price}</p>
    <button class="buyGoodsBtn">В корзину</button>
    </div>`;

const renderGoodsList = list => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.imgSrc));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    searchNoPrice();
};

const searchNoPrice = () => {
    const priceGoodsItem = document.querySelectorAll(".goods-item-price");
    priceGoodsItem.forEach(priceGood => {
        if (priceGood.textContent === "Цена еще не определена") {
            priceGood.classList.remove("ruble");
            //console.dir(priceGood.parentElement.childNodes);
            priceGood.parentElement.childNodes.forEach(e => {
                if(e.className === "buyGoodsBtn") {
                    //console.dir(e);
                    e.style.visibility="hidden";
                }
            })
        }
    });
}

renderGoodsList(goods);