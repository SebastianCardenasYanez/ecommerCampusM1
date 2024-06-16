import { galleryCategory } from "./components/gallery.js";
import { titleProductDetail, descriptionProductDetail} from "./components/section.js";
import { getProductId } from "./module/detail.js";
import {priceDetails} from "./components/footer.js";

let main__section_gallery = document.querySelector("#main__section__gallery");
let main__section__title = document.querySelector("#main__section__title");
let mainsectiondescription = document.querySelector("#main__section__description");
let footer__ul = document.querySelector(".footer__ul");

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
        let precioentero = parseFloat(info.data.product_price.replace('$',''))
        if(quantity > 1){
            quantitySpan.textContent = quantity - 1;
            quantity = parseInt(quantitySpan.textContent);
            precio__total.innerHTML = `Add to Cart $${quantity * precioentero}`
        };
        });

        increaseButton.addEventListener('click', async e => {
        let quantity = parseInt(quantitySpan.textContent);
        let precioentero = parseFloat(info.data.product_price.replace('$',''))
        quantitySpan.textContent = quantity + 1;
        quantity = parseInt(quantitySpan.textContent);
        precio__total.innerHTML = `Add to Cart $${quantity * precioentero}`
        
        });

})