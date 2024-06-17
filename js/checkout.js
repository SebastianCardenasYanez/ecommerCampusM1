import {getProductId} from "./module/checkout.js";
import { galleryCheckout } from "./components/gallery.js";

let checkout__details = document.querySelector(".checkout__details");

addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    let info = JSON.parse(localStorage.getItem(id));
    checkout__details.innerHTML = await galleryCheckout(info);
});