var faker = require("faker");

for(var i=1;i<=10;i++) {
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}