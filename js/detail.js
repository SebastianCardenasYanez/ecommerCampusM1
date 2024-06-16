import { galleryCategory } from "./components/gallery.js";
import { titleProductDetail, descriptionProductDetail} from "./components/section.js";
import { getProductId } from "./module/detail.js";
import {priceDetails} from "./components/footer.js";

let main__section_gallery = document.querySelector("#main__section__gallery");
let main__section__title = document.querySelector("#main__section__title");
let mainsectiondescription = document.querySelector("#main__section__description");
let footer__ul = document.querySelector(".footer__ul");
let links = document.querySelectorAll('.circle_size');
const colors = document.querySelectorAll('#circle__color');


addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    let info = JSON.parse(localStorage.getItem(id));
    main__section_gallery.innerHTML = await galleryCategory(info);
    main__section__title.innerHTML = await titleProductDetail(info);
    mainsectiondescription.innerHTML = await descriptionProductDetail(info);
    console.log(priceDetails(info))
    footer__ul.innerHTML = await priceDetails(info);

    // tallas
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // colores
    colors.forEach(co => {
        co.addEventListener('click', (event) => {
            event.preventDefault();
            colors.forEach(l => l.classList.remove('active'));
            co.classList.add('active');
        });
    });

    //main__section_gallery.innerHTML = await galleryCategory(JSON.parse(localStorage.getItem(id)))
    // let {data} = res;
    // let {
    //     category_path,
    //     about_product,
    //     product_details,
    //     product_information,
    //     product_photos,
    //     product_variations,
    //     rating_distribution,
    //     review_aspects,
    //     ...dataUpdate
    // } = data;
    // console.log(dataUpdate);
    let optionViewMore = document.querySelector("#leerMasOption");
    let viewMore = document.querySelector("#informationProduct");


    optionViewMore.addEventListener('click', async (e) => {
        let complet = info.data.product_description;
        viewMore.textContent = complet;
    })

    
    // mas y menos
    let decreaseButton = document.querySelector("#decreaseQuantity");
        let increaseButton = document.querySelector("#increaseQuantity");
        let quantitySpan = document.querySelector("#quantity");
        let precio__total = document.querySelector("#precio__total")

        decreaseButton.addEventListener('click', async e => {
        let quantity = parseInt(quantitySpan.textContent);
        if (info.data.product_price !==  null) {
        let precioentero = parseFloat(info.data.product_price.replace('$',''))
        let precioOriginal = parseFloat(info.data.product_original_price.replace('$',''))
        if(quantity > 1){
            quantitySpan.textContent = quantity - 1;
            quantity = parseInt(quantitySpan.textContent);
            if (info.data.product_original_price !== null){
                precio__total.innerHTML =/*html*/`
                    <span id= "precio__total" >Add to Cart $${quantity * precioentero}<del><sub>$${quantity * precioOriginal}</sub></del></span>
            `}else if (info.data.product_price ==  null) {
                    precio__total.innerHTML = /*html*/`
                    <span>Add to Cart No Price</span>
                    `}
            else{
                    precio__total.innerHTML = /*html*/`
                    <span id= "precio__total">Add to Cart $${quantity * precioentero}</span>`
                }
        };
        }else {
            if(quantity > 1){
            quantitySpan.textContent = quantity - 1;
        };}
        });

        increaseButton.addEventListener('click', async e => {
        let quantity = parseInt(quantitySpan.textContent);
        if (info.data.product_price !==  null) {
        let precioentero = parseFloat(info.data.product_price.replace('$',''))
        let precioOriginal = parseFloat(info.data.product_original_price.replace('$',''))
        quantitySpan.textContent = quantity + 1;
        quantity = parseInt(quantitySpan.textContent);
        if (info.data.product_price ==  null) {
            precio__total.innerHTML = /*html*/`
                <span>Add to Cart No Price</span>`
        }
        else if (info.data.product_original_price !== null){
            precio__total.innerHTML =/*html*/`
                <span id= "precio__total" >Add to Cart $${quantity * precioentero}<del><sub>$${quantity * precioOriginal}</sub></del></span>
        `}
        else{
                precio__total.innerHTML = /*html*/`
                        <span id= "precio__total">Add to Cart $${quantity * precioentero}</span>`
        }
        }else return quantitySpan.textContent = quantity + 1;
        });
        });