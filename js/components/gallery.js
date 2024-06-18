export const galleryIndex = (res, category) => {
    let {products} = res.data
    let plantilla = "";
    products.forEach((value,index) => {
        plantilla += /*html*/`
        <section>
           <div class="section__front_page">
               <a href="views/detail.html?id=${value.asin}">
                   <img src="${value.product_photo}">
               </a>
               <img src="storage/img/heart.svg">
           </div>
           <h5>${value.product_title}</h5>
           <small>${category}</small>
           <div class="section__price">
               <span>${value.product_price}</span>
               <div  class="price__score">
                   <img src="storage/img/star.svg">
                   <p>${(value.product_star_rating!=null) ? value.product_star_rating : 0} </p>
               </div>
           </div>
       </section>
       `;
    });
    return plantilla
};

export const galleryCategory = ({data: {product_photos}} = res) => {
    return /*html*/`
    <article class="article__products">
        <div class="product__image">
            ${product_photos.map(value => `<div class="product__image__item"><img src="${value}"></div>`).join('')}
        </div>
        <div class="product__menu">
            <a href="../index.html">
                <img src="../storage/img/back.svg" >
            </a>
        <img src="../storage/img/heartBlack.svg">
        </div>
    `   
};

export const galleryCheckout = async ({data: dataUpdate} = res) => {
    console.log(dataUpdate)
    let createDescripHTML = async() => {
        let description = await dataUpdate.product_title;
        let trunDescription = description;
        if (description.length > 10) {
            trunDescription = description.substring(0, 19) + '...';
        }
        return `${trunDescription}`;
    }
    let create = await createDescripHTML();
    let category = () => {
        let catg;
        if (dataUpdate.category_path.length > 0) {
            let firtsCategory = dataUpdate.category_path[0];
            if (typeof(firtsCategory.name) !== "undefined") {
                catg = firtsCategory.name;
            }
        } else {
            catg = "";
        }
        return catg;
    };
    
    let contentFuction = await category();
    return /*html*/`
            <article class="details__product">
                <div class="product__imagen">
                    <img src="${dataUpdate.product_photo}">
                </div>
                <div class="product__description">
                    <h3 id="title__description">${create}</h3>
                    <small>${contentFuction}</small>
                    <span>${dataUpdate.product_price}</span>
                </div>
                <div class="product__custom">
                    <img src="../storage/img/option.svg">
                    <div class="product__select">
                        <img src="../storage/img/minusAlone.svg">
                        <span>1</span>
                        <img src="../storage/img/plusAlone.svg">
                    </div>
                </div>
            </article>
            `};