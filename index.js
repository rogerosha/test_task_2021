// @ts-check
const arrayOfGoods = require('./arrayOfGoods.json');

function parse(goods) {
  return +(goods.pricePerItem || goods.pricePerKilo).slice(1).replace(',', '.');
}

function validatePrice(goods) {
  return !Number.isNaN(parse(goods));
}

function validation(goods) {
  return goods.filter(
    (good) =>
      typeof good.item === 'string' &&
      typeof good.type === 'string' &&
      (typeof good.weight === 'number' || typeof good.quantity === 'number') &&
      validatePrice(good),
  );
}

const check = validation(arrayOfGoods);
console.log('Validated array is - ', check);

function watermelonsTotal(goods) {
  const someMelons = goods.filter((good) => good.item === 'watermelon').map((good) => good.quantity);
  const quantityOfMelons = someMelons.reduce((accumulator, current) => accumulator + current);
  return quantityOfMelons;
}

const quantity = watermelonsTotal(arrayOfGoods);
console.log(`Watermelons - ${quantity}`);

function applesTotal(goods) {
  const someApples = goods.filter((good) => good.item === 'apple').map((good) => good.weight);
  const weightOfApples = someApples.reduce((accumulator, current) => accumulator + current);
  return weightOfApples;
}

const weight = applesTotal(arrayOfGoods);
console.log(`Apples - ${weight}`);

function alphabet(goods) {
  const someGoods = goods.sort((a, b) => a.item.localeCompare(b.item));
  return someGoods;
}

const sort = alphabet(arrayOfGoods);
console.log('The sorted array in alphabetical order -', sort);

function sortByPrice(goods) {
  const sorted = goods.sort((a, b) => {
    const item = parse(a) * (a.quantity || a.weight);
    const kilo = parse(b) * (b.quantity || b.weight);
    return kilo - item;
  });
  return sorted;
}

const price = sortByPrice(arrayOfGoods);
console.log('The sorted array by cost of the record - ', price);

function cheaperOranges(goods) {
  let leastCost = null;
  let leastCostOfItem = null;

  goods
    .filter((good) => good.item === 'orange')
    .forEach((good) => {
      const value = parse(good);
      if (leastCost === null || value < leastCost) {
        leastCost = value;
        leastCostOfItem = good.type;
      }
    });
  return leastCostOfItem;
}

const type = cheaperOranges(arrayOfGoods);
console.log(`The cheapest orange type is: ${type}`);
