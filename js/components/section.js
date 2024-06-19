export const titleProductDetail = async({ data:dataUpdate } = res)=>{
    return /*html*/`
        <article class="article__detail">
            <div class="detail__head">
                <h1>${dataUpdate.product_title}</h1>
                <div class="product__select">
                    <img id="decreaseQuantity" src="../storage/img/minus.svg">
                    <span id="quantity" >1</span>
                    <img id="increaseQuantity" src="../storage/img/plus.svg" alt="">
                </div>
            </div>
            <div class="detail__score">
                ${new Array(parseInt(dataUpdate.product_star_rating)).fill(`<img src="../storage/img/star.svg">`).join('')}
                <span>${dataUpdate.product_star_rating}</span>
                <a href="${dataUpdate.product_url}">(${dataUpdate.product_num_ratings} reviews)</a>
            </div>
        </article>
        `;
}

export const descriptionProductDetail = async ({data:dataUpdate} = res) => {
    if (dataUpdate.product_description != null){
        let createDescripHTML = async() => {
            let description = await dataUpdate.product_description;
            let trunDescription = description;
            if (description.length > 150) {
                trunDescription = description.substring(0, 150) + '... <strong id = "leerMasOption"> Leer más.</strong>';
            }
            return `${trunDescription}`;
        }

        return /*html*/`
        <article class="product__information">
            <p id = "informationProduct">${await createDescripHTML()}</p>
            <hr>
        </article>
        `;
    }else return null;
    };


export const sizeProduct = async ({data:dataUpdate} = res) => {
    let plantilla = "";
    if (dataUpdate.product_variations) {
        if (dataUpdate.product_variations.color && dataUpdate.product_variations.size){
            return plantilla = /*html*/`
            <div class="product__size">
            <h5>Choose size</h5>
            <div class="size">
                <div class="circle_size">S</div>
                <div class="circle_size">M</div>
                <div class="circle_size">L</div>
                <div class="circle_size">XL</div>
            </div> 
        </div>
        <div class="product__color">
            <h5>Color</h5>
            <div class="color">
                <div id="circle__color" class="circle_color1"></div>
                <div id="circle__color" class="circle_color2"></div>
                <div id="circle__color" class="circle_color3"></div>
            </div>
        </div>
            `}else if (dataUpdate.product_variations.color){
                return /*html*/`
                <div class="product__color">
                <h5>Color</h5>
                <div class="color">
                    <div id="circle__color" class="circle_color1"></div>
                    <div id="circle__color" class="circle_color2"></div>
                    <div id="circle__color" class="circle_color3"></div>
                </div>
            </div>
                `}else if (dataUpdate.product_variations.size){
                    return plantilla = /*html*/`
                    <div class="product__size">
                    <h5>Choose size</h5>
                    <div class="size">
                        <div class="circle_size">S</div>
                        <div class="circle_size">M</div>
                        <div class="circle_size">L</div>
                        <div class="circle_size">XL</div>
                    </div> 
                </div>
                `}
    }
    console.log(plantilla)
    return plantilla
};


export const sumPrice = async array => {
    let posi = 1;
    for(let i = 0; i < array.length; i++){
    posi += array[i]
    };
    var sumaPrice =posi.toFixed(2)
    return sumaPrice
}

export const checkoutPrice = async (res, totalprice)=>{
    let plantilla = "";
    console.log(res);
    const check = []
    res.forEach((item) => {
        if (item.checkout) {
            check.push(item.checkout) ;
            let items = 0;
            for (let i = 0; i < check.length; i++) {
                items ++;
            }
            console.log(items);
            return plantilla = /*html*/`
            <article id="total__items" class="article__cost">
                <p>Total (${items})</p>
                <strong>$${totalprice}</strong>
            </article>
            <article id="shipping__fee" class="article__cost">
                <p>Shipping Fee</p>
                <strong>$.0.000</strong>
            </article>
            <br><hr>
            <article id="sub__total" class="article__cost">
                <p>Sub Total <p>
                <strong>$${totalprice}</strong>
            </article>
            `
        }

    });
    console.log(plantilla);
    return plantilla;
}
