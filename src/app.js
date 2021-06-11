const { getProductList, updateProduct } = require('./service/product.services');
const yargs = require("yargs");


//get all products
yargs.command({
    command: "get-all",
    handler: () => {
        let result = getProductList();
        console.log(result);
    }
})
// add new product
yargs.command({
    command: "add",
    builder: {
        name: {
            type: "string"
        },
        price: {
            type: "number"
        },
        amount: {
            type: "number"
        },
        description: {
            type: "string"
        }
    },
    handler: (args) => {
        const { name, price, amount, description } = args;
        let productList = getProductList();
        productList = [...productList, { id: Math.floor(Math.random() * 100), name: name, price: price, amount: amount, description: description }];
        updateProduct(productList);

    }
})
//edit product
yargs.command({
    command: "edit",
    builder: {
        id: {
            id: "number"
        },
        name: {
            type: "string"
        },
        price: {
            type: "number"
        },
        amount: {
            type: "number"
        },
        description: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id, name, price, amount, description } = args;
        let productList = getProductList();
        let itemIndex = productList.findIndex(item => item.id === id);
        if (itemIndex != -1) {
            productList[itemIndex].id = id;
            productList[itemIndex].name = name;
            productList[itemIndex].amount = amount;
            productList[itemIndex].description = description;
            productList[itemIndex].price = price;
            updateProduct(productList);
            console.log("update successfully");
        } else {
            console.log("item not found");
        }
    }
})
//get detail
yargs.command({
    command: "get-detail",
    builder: {
        id: {
            type: "number"
        }
    },
    handler: (args) => {
        let { id } = args;
        let productList = getProductList();
        let item = productList.find(item => item.id === id);
        if (item) {
            console.log(item);
        } else {
            console.log("item not found");
        }

    }
})
//delete item
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "number"
        }
    },
    handler: (args) => {
        let { id } = args;
        let productList = getProductList();
        let itemIndex = productList.findIndex(item => item.id === id);
        if (itemIndex != -1) {
            productList.splice(itemIndex,1);
            updateProduct(productList);
            console.log("item has been deleted");
        }else{
            console.log("item not found");
        }
    }
})
//reStock
yargs.command({
    command: "reStock",
    builder: {
        id: {
            type: "number"
        }
    },
    handler: (args) => {
        const { id } = args;
        let productList = getProductList();
        let itemIndex = productList.findIndex(items => items.id === id);
        if (itemIndex != -1) {
            productList[itemIndex].amount += 50;

            updateProduct(productList);
            console.log("update successfully");
        } else {
            console.log("Items not found");
        }
    }
})
yargs.parse();