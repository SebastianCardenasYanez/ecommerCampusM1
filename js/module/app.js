import { headers } from "../components/env.js";

export const getAllProductName = async({search:text, id:idCategory})=>{
    console.log("Esperando .......");
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${text}&page=1&country=US&sort_by=RELEVANCE&category_id=${idCategory}&product_condition=ALL`;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}

export const getAllCategory = async()=>{
    console.log("Esperando .......");
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-category-list?country=US`;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}

export const getAllClothesUnder10 = async(page=500)=>{
    console.log("Esperando .......");
    page = Math.random()*(page/20);
    page = parseInt(Math.round(page));
    if(!page)page=1;
    console.log(page)
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=Aesthetic-Clothes&page=${page}&country=US&sort_by=RELEVANCE&category_id=aps&product_condition=NEW`;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
};