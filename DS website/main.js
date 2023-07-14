let cartIcon = document.querySelector('#cart-icon');
let favoritesIcon = document.querySelector('#favorites-icon');
let cart = document.querySelector('.cart');
let favorites = document.querySelector('.favorites');
let closeCart = document.querySelector('#close-cart');
let closeCart2 = document.querySelector('#close-cart2');

cartIcon.onclick = () => {
    cart.classList.add('active');
};

favoritesIcon.onclick = () => {
    favorites.classList.add('active');
};

closeCart.onclick = () => {
    cart.classList.remove('active');
};

closeCart2.onclick = () => {
    favorites.classList.remove('active');
};

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}   

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }

    var removeFavoritesButtons = document.getElementsByClassName('favorites-remove');
    console.log(removeFavoritesButtons)
    for(var i = 0; i < removeFavoritesButtons.length; i++){
        var button2 = removeFavoritesButtons[i]
        button2.addEventListener('click', removeFavoritesItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    var addCart2 = document.getElementsByClassName('add-cart2');
    for (var i = 0; i < addCart2.length; i++){
        var button3 = addCart2[i];
        button3.addEventListener("click", addFavoritesClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function removeFavoritesItem(event){
    var buttonClicked2 = event.target;
    buttonClicked2.parentElement.remove();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
            alert("You have already added this item to your cart");
            return; 
        }
    }
    var cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
 </div>
<i class='bx bxs-trash cart-remove' ></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}

function addFavoritesClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToFavorites(title, price, productImg);
}

function addProductToFavorites(title, price, productImg) {
    var favoritesShopBox = document.createElement("div");
    favoritesShopBox.classList.add("favorites-box");
    var favoritesItems = document.getElementsByClassName("favorites-content")[0];
    var favoritesItemsNames = favoritesItems.getElementsByClassName("favorites-product-title");
    for (var i = 0; i < favoritesItemsNames.length; i++) {
        if (favoritesItemsNames[i].innerHTML == title) {
            alert("You have already added this item to your favorites");
            return; 
        }
    }
    var favoritesBoxContent = `
<img src="${productImg}" alt="" class="favorites-img">
<div class="detail-box">
    <div class="favorites-product-title">${title}</div>
    <div class="favorites-price">${price}</div>
 </div>
<i class='bx bxs-trash favorites-remove' ></i>`;

favoritesShopBox.innerHTML = favoritesBoxContent;
favoritesItems.append(favoritesShopBox);
favoritesShopBox.getElementsByClassName('favorites-remove')[0].addEventListener("click", removeFavoritesItem);
}

function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;

}

// try {
//     favoritesIcon.onclick = () => {
//         favorites.classList.add('active');
//     };

//     closeCart2.onclick = () => {
//         favorites.classList.remove('active');
//     };

//     if (document.readyState == 'loading'){
//         document.addEventListener('DOMContentLoaded', ready);
//     } else {
//         ready();
//     }

//     function ready(){
    
//         var removeFavoritesButtons = document.getElementsByClassName('favorites-remove');
//         console.log(removeFavoritesButtons)
//         for(var i = 0; i < removeFavoritesButtons.length; i++){
//             var button2 = removeFavoritesButtons[i]
//             button2.addEventListener('click', removeFavoritesItem);
//         }
    
//         var quantityInputs2 = document.getElementsByClassName('favorites-quantity');
//         for (var i = 0; i < quantityInputs2.length; i++){
//             var input2 = quantityInputs2[i];
//             input2.addEventListener("change", quantityChanged2);
//         }
    
//         var addCart2 = document.getElementsByClassName('add-cart2');
//         for (var i = 0; i < addCart2.length; i++){
//             var button3 = addCart2[i];
//             button3.addEventListener("click", addFavoritesClicked);
//         }
//     }

//     function removeFavoritesItem(event){
//         var buttonClicked2 = event.target;
//         buttonClicked2.parentElement.remove();
//         updatetotal2();
//     }

//     function quantityChanged2(event){
//         var input2 = event.target;
//         if (isNaN(input2.value) || input2.value <= 0) {
//             input2.value = 1;
//         }
//         updatetotal2();
//     }

//     function addFavoritesClicked(event){
//         var button = event.target;
//         var shopProducts = button.parentElement;
//         var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
//         var price = shopProducts.getElementsByClassName("price")[0].innerText;
//         var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
//         addProductToFavorites(title, price, productImg);
//         updatetotal2();
//     }
    
//     function addProductToFavorites(title, price, productImg) {
//         var favoritesShopBox = document.createElement("div");
//         favoritesShopBox.classList.add("favorites-box");
//         var favoritesItems = document.getElementsByClassName("favorites-content")[0];
//         var favoritesItemsNames = favoritesItems.getElementsByClassName("favorites-product-title");
//         for (var i = 0; i < favoritesItemsNames.length; i++) {
//             if (favoritesItemsNames[i].innerHTML == title) {
//                 alert("You have already added this item to your favorites");
//                 return; 
//             }
//         }
//         var favoritesBoxContent = `
//     <img src="${productImg}" alt="" class="favorites-img">
//     <div class="detail-box">
//         <div class="favorites-product-title">${title}</div>
//         <div class="favorites-price">${price}</div>
//         <input type="number" value="1" class="favorites-quantity">
//      </div>
//     <i class='bx bxs-trash favorites-remove' ></i>`;
    
//     favoritesShopBox.innerHTML = favoritesBoxContent;
//     favoritesItems.append(favoritesShopBox);
//     favoritesShopBox.getElementsByClassName('favorites-remove')[0].addEventListener("click", removeFavoritesItem);
//     favoritesShopBox.getElementsByClassName('favorites-quantity')[0].addEventListener("change", quantityChanged2);
//     }
    
//     function updatetotal2(){
//         var favoritesContent = document.getElementsByClassName('favorites-content')[0];
//         var favoritesBoxes = favoritesContent.getElementsByClassName('favorites-box');
//         var total = 0;
//         for(var i = 0; i < favoritesBoxes.length; i++){
//             var favoritesBox = favoritesBoxes[i];
//             var priceElement = favoritesBox.getElementsByClassName('favorites-price')[0];
//             var quantityElement = favoritesBox.getElementsByClassName("favorites-quantity")[0];
//             var price = parseFloat(priceElement.innerText.replace("$", ""));
//             var quantity = quantityElement.value;
//             total = total + (price * quantity);
//         }
    
//             document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
//     }

// } catch(err) {

// }