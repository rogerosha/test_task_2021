// @ts-check
const arrayOfGoods = require('./arrayOfGoods.json');

function parse(goods) {
    return (+(goods.pricePerItem || goods.pricePerKilo).slice(1).replace(',', '.'));
}

function validatePrice(goods) {
    return !Number.isNaN(parse(goods));
}

function validation(goods) {
    return goods.filter((good) => 
        typeof good.item === 'string'
        && typeof good.type === 'string'
        && (typeof good.weight === 'number'
        || typeof good.quantity === 'number')
        && validatePrice(good));
}

const check = validation(arrayOfGoods);
console.log(check);

function watermelonsTotal(goods) {
    let someMelons = goods
        .filter((good) => good.item === 'watermelon')
        .map((good) => good.quantity);
    let quantityOfMelons = someMelons.reduce((accumulator, current) => accumulator + current);
    return quantityOfMelons;
}

const quantity = watermelonsTotal(arrayOfGoods);
console.log(`Watermelons - ${quantity}`);

function applesTotal(goods) {
    let someApples = goods
        .filter((good) => good.item === 'apple')
        .map((good) => good.weight);
    let weightOfApples = someApples.reduce((accumulator, current) => accumulator + current);
    return weightOfApples;
}

const weight = applesTotal(arrayOfGoods);
console.log(`Apples - ${weight}`);

function alphabet(goods) {
    let someGoods = goods.sort((a, b) => a.item.localeCompare(b.item));
    return someGoods;
}

const sort = alphabet(arrayOfGoods);
console.log(`The sorted array in alphabetical order -`, sort);

function sortByPrice(a, b) {
    let sortedGoods = arrayOfGoods
        .map((good) => good.pricePerKilo || good.pricePerItem)
        .forEach((price) => +price.split("$")[1]);
    return a - b;
}

const price = sortByPrice(arrayOfGoods);
console.log(`The sorted array by cost of the record - ${price}`);
//does not see numbers //Output: NaN

function cheaperOranges(goods) {
    let someOranges = goods
        .filter((good) => good.item === 'orange')
        .map((good) => good.type);
    let value = someOranges.reduce((accumulator, currentValue) => {
        return (accumulator < currentValue ? accumulator : currentValue);
       }
   );
    return value;
}

const type = cheaperOranges(arrayOfGoods);
console.log(`The cheapest orange type is: ${type}`);
//wrong type of oranges //Output: Clementine

// function fruitsPrice(goods) {
//     let costOranges = 0;
//     let costApples = 0;
//     let costWatermelons = 0;
//     let costPineapples = 0;
//     let costFruits = 0;
//     switch (goods.item) {
//         case 'orange':
//             costOranges += goods.quantity * goods.pricePerKilo.slice(1);
//             break;
//         case 'apple':
//             costApples += goods.quantity * goods.pricePerKilo.slice(1);
//             break;
//         case 'watermelon':
//             costWatermelons += goods.quantity * goods.pricePerItem.slice(1);
//             break;
//         case 'pineapple':
//             costPineapples += goods.quantity * goods.pricePerItem.slice(1);
//     }
//     costFruits += goods.quantity * goods.pricePerItem.slice(1) || goods.quantity * goods.pricePerKilo.slice(1);
    
//     console.log(`Apples - ${costApples}`);
//     console.log(`Pineapples - ${costPineapples}`);
//     console.log(`Watermelons - ${costWatermelons}`);
//     console.log(`Oranges - ${costOranges}`);
//     console.log(`Cost of all fruits - ${costFruits}`);
//     return costFruits;
// }

