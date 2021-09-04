const arrayOfGoods = require('./arrayOfGoods.json');

function watermelonsTotal(goods) {
    let someMelons = arrayOfGoods
        .filter((good) => good.item === 'watermelon')
        .map((good) => good.quantity);
    let quantityOfMelons = someMelons.reduce((accumulator, current) => accumulator + current);
    return quantityOfMelons;
}

quantity = watermelonsTotal(arrayOfGoods);
console.log(`Watermelons - ${quantity}`);

function applesTotal(goods) {
    let someApples = arrayOfGoods
        .filter((good) => good.item === 'apple')
        .map((good) => good.weight);
    let weightOfApples = someApples.reduce((accumulator, current) => accumulator + current);
    return weightOfApples;
}

weight = applesTotal(arrayOfGoods);
console.log(`Apples - ${weight}`);

function alphabet(goods) {
    let someGoods = arrayOfGoods.sort((a, b) => a.item.localeCompare(b.item));
    return someGoods;
}

sort = alphabet(arrayOfGoods);
console.log(`The sorted array in alphabetical order - ${sort}`);
//does not show field 'item' //Output: [Obj obj]

function sortByPrice(a, b) {
    let sortedGoods = arrayOfGoods
        .map((good) => good.pricePerKilo || good.pricePerItem)
        .forEach((price) => +price.split("$")[1]);
    return a - b;
}

price = sortByPrice(arrayOfGoods);
console.log(`The sorted array by cost of the record - ${price}`);
//does not see numbers //Output: NaN

function cheaperOranges(goods) {
    let someOranges = arrayOfGoods
        .filter((good) => good.item === 'orange')
        .map((good) => good.type);
    let value = someOranges.reduce((accumulator, currentValue) => {
        return (accumulator < currentValue ? accumulator : currentValue);
       }
   );
    return value;
}

type = cheaperOranges(arrayOfGoods);
console.log(`The cheapest orange type is: ${type}`);
//wrong type of oranges //Output: Clementine

function fruitsPrice(goods) {
    let costOranges = 0;
    let costApples = 0;
    let costWatermelons = 0;
    let costPineapples = 0;
    let costFruits = 0;
    switch (good.item) {
        case 'orange':
            costOranges += good.quantity * good.pricePerKilo.slice(1);
            break;
        case 'apple':
            costApples += good.quantity * good.pricePerKilo.slice(1);
            break;
        case 'watermelon':
            costWatermelons += good.quantity * good.pricePerItem.slice(1);
            break;
        case 'pineapple':
            costPineapples += good.quantity * good.pricePerItem.slice(1);
    }
    costFruits += good.quantity * good.pricePerItem.slice(1) || good.quantity * good.pricePerKilo.slice(1);
    
    console.log(`Apples - ${costApples}`);
    console.log(`Pineapples - ${costPineapples}`);
    console.log(`Watermelons - ${costWatermelons}`);
    console.log(`Oranges - ${costOranges}`);
    console.log(`Cost of all fruits - ${costFruits}`);
    return costFruits;
}

