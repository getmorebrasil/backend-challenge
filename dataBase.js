const products = {}

function saveProduct(products) {
    if (isIdRepeated(products.id)) {
        
    }
}

function isIdRepeated(value) {
    for (let i=0; i < products.length; i++) {
        if (products[i].id = value) return true
    }
    return false
}

function getProduct(id) {
    return products[id] || {}
}

function getProducts() {
    return Object.values(products)
}
