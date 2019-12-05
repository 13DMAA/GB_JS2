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
    {}
];

const renderGoodsItem = (title = "Товар в пути", price = "Цена еще не определена", imgSrc = "goods-item.jpg") => {
    return `<div class="goods-item">
    <h3>${title}</h3>
    <img src=${imgSrc}></img>
    <p>${price}</p>
    </div>`
};

const renderGoodsList = (list) => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.imgSrc));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
};

renderGoodsList(goods);