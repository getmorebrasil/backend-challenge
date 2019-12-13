const products = {}

function saveProduct(product) {
    if (!products[product.id]){
        products[product.id] = product
        return 1
    } else {
        return 2
    }
}

function getProduct(id) {
    return products[id] || {}
}

function getProducts() {
    return Object.values(products)
}

module.exports = {saveProduct, getProduct, getProducts}