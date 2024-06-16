

export const priceDetails = async({data: dataUpdate} = res) => {
    

    if (dataUpdate.product_price ==  null) {
        return /*html*/`
    <li>    
        <a href="checkout.html">
            <img src="../storage/img/shopping-cart.svg">
            <span>Add to Cart No Price</span>
        </a>
    </li>`
}
    if (dataUpdate.product_original_price ==  null){
        return /*html*/`
    <li>    
        <a href="checkout.html">
            <img src="../storage/img/shopping-cart.svg">
            <span id= "precio__total">Add to Cart $${dataUpdate.product_price}</span>
        </a>
    </li>`
    }
    return /*html*/`
    <li>    
    <a href="checkout.html">
        <img src="../storage/img/shopping-cart.svg">
        <span id= "precio__total" >Add to Cart $${dataUpdate.product_price}<del><sub>$${dataUpdate.product_original_price}</sub></del></span>
    </a>
</li>`};