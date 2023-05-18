
//*** УДАЛИТЬ ТОВАРЫ ИЗ КОРЗИНЫ ***
let removeItem = document.querySelectorAll('.cart-product_delete')

removeItem.forEach(item => {
    item.addEventListener('click', removeCartItem)
})

function removeCartItem(event) {
 let buttonClicked = event.target
 
 buttonClicked.parentElement.remove()
 
}


//*** ПОКАЗАТЬ ТЕКУЩЕЕ ИЗОБРАЖЕНИЕ ПО КЛИКУ ***
const currentImg = document.querySelector(".current-img");
const imageItems = document.querySelectorAll(".images_item");

currentImg.src = "./images/image-product-1.jpg";

imageItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const target = e.target;
    currentImg.src = target.src;
  });
});




//*** получаем элементы из HTML ***
let minusBtn = document.querySelector(".minus-btn");
let plusBtn = document.querySelector(".plus-btn");
let amount = document.querySelector(".quantity_amount");
const form = document.querySelector(".quantity");
const field = document.querySelector(".cart-checkout");
const addToCart = document.querySelector(".addtocart-btn");


//*** УВЕЛИЧИВАЕМ И УМЕНЬШАЕМ НОМЕР ПО НАЖАТИЮ НА ПЛЮС/МИНУС ***

let a = 0;

plusBtn.addEventListener("click", function () {
  a++;
  amount.innerHTML = a;
});

minusBtn.addEventListener("click", function () {
  if (a > 0) {
    a--;
    amount.innerHTML = a;
  }
});

//*** ДОБАВИТЬ В КОРЗИНУ ***

//Убираем поведение формы при помощи e.preventDefault()
form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
}


//На кнопку addToCart делаем обработчик и вызываем функцию addToCartClicked
addToCart.addEventListener('click', addToCartClicked)

//Доходим до корневого родителя кнопки 
function addToCartClicked(event){
const button = event.target
const shopItem = button.parentElement.parentElement.parentElement;

//Получаем из корневого родителя элементы title, img, amount и т.д.
const title = shopItem.querySelector('.product-title').innerText
const img = document.querySelector('.images_item').src
const amount = shopItem.querySelector('.quantity_amount').innerText

//Получаем цену в виде номера. Для начала нужно убрать знак доллара иначе мы получим цену не в виде номера, а виде строки
const priceElement = document.querySelector('.price_current')
let price = parseFloat(priceElement.innerHTML.replace('$', ''))
//Создаем переменную с числом ноль для того чтобы добавить в него цену умноженную на количество
let total = 0
total = total + (price * amount)

showCart.classList.add('cart-checkout_container-show')

//Передаем эти данные в качестве параметров
addItemToCart(title, price, img, amount, total)
}

//Получаем данные выше 
function addItemToCart(title, price, img, amount, total ){
    //Восоздаем блок элемента из html в JS. Создаем элемент 'article', добавляем ему класс
    let cartRow = document.createElement('article')
    cartRow.classList.add('cart-checkout_article')
    //Получаем корневую часть корзины чтобы позже засунуть в нее элемент товара
    let cartItems = document.querySelector('.cart-checkout_container')
    
    //Передаем структуру html товара переменной и присваеиваем получаемые данные img title price
    let cartRowContents = `
   
    <img src="${img}" alt="img" class="cart-checkout_img">
    <div class="cart-product_info">
      <p class="cart-product_title">${title}</p>
      <p class="cart-product_price">
      <span class="cart_product_currentPrice">${price}</span> x
      <span class="cart_product_amount">${amount}</span>
      <span class="cart_product_total-price">$${total}</span></p>
    </div>

    <img class="cart-product_delete" src="./images/icon-delete.svg" alt="delete">
    
    `
    //В тег article засовываем структуру html товара и говорим чтобы это все появилось в корневой части
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    

    //Вешаем обработчик события на кнопку удалить и вызываем функцию removeCartItem
    cartRow.querySelectorAll('.cart-product_delete')[0].addEventListener('click', removeCartItem)
    
}



//*** ПОКАЗАТЬ КОРЗИНУ ПРИ ПОМОЩИ КЛАССА ***

const cartBtn = document.querySelector('.nav-cart__modal')
const showCart = document.querySelector('.cart-checkout_container')
const checkoutBtn = document.querySelector('.checkout-btn')


cartBtn.addEventListener('click', () => {
    showCart.classList.toggle('cart-checkout_container-show')
})





