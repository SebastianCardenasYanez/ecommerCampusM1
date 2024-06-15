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