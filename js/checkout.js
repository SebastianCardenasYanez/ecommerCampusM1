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
    let price = await priceCheckout(res);
    
    let totalprice = await sumPrice(price);
    console.log(totalprice);
    
    costs.innerHTML = await checkoutPrice(res, totalprice);
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
