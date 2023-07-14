if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}  

function ready(){
    document.getElementsByClassName("btn")[0].addEventListener("click", buyButtonClicked);
    document.getElementsByClassName("btn2")[0].addEventListener("click", buyButtonClicked2);
}

function buyButtonClicked() {
    alert("Your order is placed");
}

function buyButtonClicked2() {
    alert("Your pizza has been added to Favorites");
}