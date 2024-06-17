import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory, getAllClothesUnder10} from "./module/app.js";

let input__search = document.querySelector("#input__search");
let main__article = document.querySelector(".main__article");
let nav__ul = document.querySelector(".nav__ul");

addEventListener("DOMContentLoaded", async e=>{
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));
    let params = new URLSearchParams(location.search);
    let idCategory = params.get('id');
    if(idCategory== undefined){
        let res = await getAllClothesUnder10();
        main__article.innerHTML = galleryIndex(res, "Fashion");
    }else{
        let res = await getAllClothesUnder10();
        main__article.innerHTML = galleryIndex(res, idCategory);
    }
})

input__search.addEventListener("change", async e => {
    let params = new URLSearchParams(location.search);
    let data = { search : e.target.value, id : params.get('id')};
    input__search.value = null;
    let res = await getAllProductName(data)
    main__article.innerHTML = galleryIndex(res, params.get('id'));
});