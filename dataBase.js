const products = {}

function saveProduct(product) {
    let arrayChildrens = JSON.parse(product.childrenIds)
    let existChildren = (arrayChildrens.length > 0) ? true : false
    let allProducts = getProducts()
    let isValidChildrens = true
    if (existChildren) {
        let amountValidated = 0
        for (let i = 0; i < allProducts.length; i++) {
            if (arrayChildrens.includes(allProducts[i].id)) amountValidated += 1
        }
        if (amountValidated !== arrayChildrens.length) isValidChildrens = false
    }
    if (!products[product.id] && isInteger(product.id) && isValidChildrens){
        product.id = parseInt(product.id)
        product.childrenIds = arrayChildrens
        products[product.id] = product
        return "ok"
    } else if (!isInteger(product.id)) {
        return "invalidId"
    } else if (!isValidChildrens) {
        return "InvalidCategories"
    } else {
        return "idRepeated"
    }
}

function getProduct(id) {
    return products[id] || {}
}

function getProducts() {
    return Object.values(products)
}

function isInteger(value) {
    return /^\d+$/.test(value);
}

module.exports = {saveProduct, getProduct, getProducts}