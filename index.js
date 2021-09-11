const arrayOfGoods = require('./arrayOfGoods.json');

function parsePrice(good) {
  return +(good.pricePerItem || good.pricePerKilo).slice(1).replace(',', '.');
}

function validatePrice(good) {
  return !Number.isNaN(parsePrice(good));
}

function validateGoods(goods) {
  return goods.filter(
    (good) =>
      typeof good.item === 'string' &&
      typeof good.type === 'string' &&
      ((typeof good.weight === 'number' && good.pricePerKilo) || (typeof good.quantity === 'number' && good.pricePerItem)) &&
      validatePrice(good),
  );
}

function countWatermelons(goods) {
  return goods
    .filter((good) => good.item === 'watermelon')
    .map((good) => good.quantity)
    .reduce((accumulator, current) => accumulator + current);
}

function countApples(goods) {
  return goods
    .filter((good) => good.item === 'apple')
    .map((good) => good.weight)
    .reduce((accumulator, current) => accumulator + current);
}

function sortByAlphabet(goods) {
  return [...goods].sort((a, b) => a.item.localeCompare(b.item));
}

function sortByPrice(goods) {
  return [...goods].sort((a, b) => {
    const firstCount = parsePrice(a) * (a.quantity || a.weight);
    const secondCount = parsePrice(b) * (b.quantity || b.weight);

    return secondCount - firstCount;
  });
}

function getCheapestOrangeType(goods) {
  let leastCost = null;
  let leastCostOfItem = null;

  goods
    .filter((good) => good.item === 'orange')
    .forEach((good) => {
      const value = parsePrice(good);

      if (leastCost === null || value < leastCost) {
        leastCost = value;
        leastCostOfItem = good.type;
      }
    });

  return leastCostOfItem;
}

function getFruitsPrice(goods) {
  let costOranges = 0;
  let costApples = 0;
  let costWatermelons = 0;
  let costPineapples = 0;
  let costFruits = 0;

  goods
    .filter((good) => good.item === 'orange')
    .forEach((good) => {
      costOranges += parsePrice(good) * good.weight;
    });

  goods
    .filter((good) => good.item === 'apple')
    .forEach((good) => {
      costApples += parsePrice(good) * good.weight;
    });

  goods
    .filter((good) => good.item === 'watermelon')
    .forEach((good) => {
      costWatermelons += parsePrice(good) * good.quantity;
    });

  goods
    .filter((good) => good.item === 'pineapple')
    .forEach((good) => {
      costPineapples += parsePrice(good) * good.quantity;
    });

  costFruits = costOranges + costApples + costWatermelons + costPineapples;
  return { costApples, costPineapples, costWatermelons, costOranges, costFruits };
}

const validatedArray = validateGoods(arrayOfGoods);
const quantityOfMelons = countWatermelons(validatedArray);
const weightOfApples = countApples(validatedArray);
const sort = sortByAlphabet(validatedArray);
const price = sortByPrice(validatedArray);
const cheapestOrangeType = getCheapestOrangeType(validatedArray);
const { costApples, costPineapples, costWatermelons, costOranges, costFruits } = getFruitsPrice(validatedArray);

console.log('Validated array is - ', validatedArray);
console.log(`Watermelons - ${quantityOfMelons}`);
console.log(`Apples - ${weightOfApples}`);
console.log('The sorted array in alphabetical order -', sort);
console.log('The sorted array by cost of the record - ', price);
console.log(`The cheapest orange type is: ${cheapestOrangeType}`);
console.log(`Apples - ${costApples}`);
console.log(`Pineapples - ${costPineapples}`);
console.log(`Watermelons - ${costWatermelons}`);
console.log(`Oranges - ${costOranges}`);
console.log(`Cost that should be paid for all these goods - ${costFruits}`);
