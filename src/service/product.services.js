// console.log(12212)

const fs = require("fs");
const getProductList = () => {
    let result = fs.readFileSync('./src/product.json')

    result = JSON.parse(result);
    return result;
}
const updateProduct = (data) => {
    fs.writeFileSync('./src/product.json',JSON.stringify(data))
}

module.exports = {
    getProductList,
    updateProduct
}