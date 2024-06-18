export const priceDetails = async({data: dataUpdate} = res) => {
    console.log(dataUpdate)
    let plantilla = "";
        if (dataUpdate.product_price ==  null) {
            plantilla +=  /*html*/`
    <li>    
        <a href="checkout.html?id=${dataUpdate.asin}">
            <img src="${dataUpdate.product_photo}">
            <span>Add to Cart No Price</span>
        </a>
    </li>`
    return plantilla
}
    if (dataUpdate.product_original_price ==  null){
        plantilla += /*html*/`
    <li>    
        <a id="linkCheck" href="checkout.html?id=${dataUpdate.asin}">
            <img src="../storage/img/shopping-cart.svg">
            <span id= "precio__total">Add to Cart $${dataUpdate.product_price}</span>
        </a>
    </li>`
    return plantilla
    }
    plantilla += /*html*/`
    <li>    
    <a href="checkout.html?id=${dataUpdate.asin}">
        <img src="../storage/img/shopping-cart.svg">
        <span id= "precio__total" >Add to Cart $${dataUpdate.product_price}<del><sub>$${dataUpdate.product_original_price}</sub></del></span>
    </a>
</li>`
return plantilla
};