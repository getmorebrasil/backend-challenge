// arquivo para persistência de dados.

const sequence = {
    _id: 1,
    get id() {return this._id++}
}

const produtos = {}

function getProduto(id) {
    return produtos[id] || {}
}

function getProdutos() {
    return Object.values(produtos)
}