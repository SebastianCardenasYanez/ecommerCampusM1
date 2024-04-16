import {getProductId, getProductsBuy} from "./module/checkout.js";
import { galleryCheckout, priceCheckout } from "./components/gallery.js";
import {checkoutPrice, sumPrice} from "./components/section.js";


let checkout__details = document.querySelector(".checkout__details");
let costs = document.querySelector("#costs");

    //suma de los productos
    
    
addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    let info = JSON.parse(localStorage.getItem(id));
    let res = await getProductsBuy();
    checkout__details.innerHTML = await galleryCheckout(res);
    
    document.getElementById('payButton').addEventListener('click', function(event) {
        event.preventDefault();
        var alert = document.getElementById('alert');
        alert.style.display = 'flex'; // Muestra la alerta
        setTimeout(function() {
            alert.style.display = 'none';
        }, 2000); // La alerta desaparecerá después de 5 segundos
    });
    
    
    //suma de los productos
    let price = priceCheckout(res);
    
    let totalprice = sumPrice(price);
    console.log(totalprice);
    
    costs.innerHTML =  checkoutPrice(res, totalprice);

    let decreaseButton = document.querySelectorAll(".minus");
    let increaseButton = document.querySelectorAll(".plus");
    let quantitySpan = document.querySelector(".quantity");

    decreaseButton.forEach(decrase => {
        decrase.addEventListener('click', async e => {
                console.log(e.target);
                let parentArticle = e.target.closest('div');
                let totalString = (parentArticle.closest('main').querySelector(".total"));
                let totalnum = parseFloat(totalString.textContent.replace('Total (','').replace(")",""))
                console.log(totalnum);
                totalnum--
                totalString.textContent = `Total (${totalnum--})`
                let money = parseFloat(parentArticle.closest('article').querySelector('.price__product').textContent.replace('$',''))
                let index = price.findIndex(item => {
                    return item === money;
                })
                if (index !== -1) {
                    price.splice(index, 1);
                }
                console.log(price);
                console.log(parentArticle)
                totalprice = sumPrice(price);
                console.log(totalprice)
                costs.innerHTML =  checkoutPrice(res, totalprice);
                console.log(parentArticle.querySelector('span'))
                let span = parentArticle.querySelector('span')
                let quantityfy = parseInt(span.textContent);
                if(quantityfy > 1){
                    span.textContent = quantityfy - 1;
                }

        })
    })

    increaseButton.forEach(increase => {
        increase.addEventListener('click', async e => {
                let parentArticle = e.target.closest('div');
                let totalString = (parentArticle.closest('main').querySelector(".total"));
                console.log(totalString);
                let totalnum = parseFloat(totalString.textContent.replace('Total (','').replace(")",""))
                console.log(totalnum);
                totalnum++
                totalString.textContent = `Total (${totalnum++})`
                let money = parseFloat(parentArticle.closest('article').querySelector('.price__product').textContent.replace('$',''))
                price.push(money);
                totalprice = sumPrice(price);
                costs.innerHTML =  checkoutPrice(res, totalprice);
                console.log(price);
                let span = parentArticle.querySelector('span')
                let quantityfy = parseInt(span.textContent);
                span.textContent = quantityfy + 1;
        })
    })


    // const updateTotal = async() => {
        //     console.log(priceElements); 
        //     let total = 0;
        //     for (let i = 0; i < priceElements.length; i++) {
            //         total += parseFloat(priceElements[i].textContent) || 0;
            //     }
            //     document.querySelector('#sub__total').textContent = `$${total.toFixed(2)}`;
            // }
            // updateTotal();
            // costs.innerHTML = await updateTotal()
        });
