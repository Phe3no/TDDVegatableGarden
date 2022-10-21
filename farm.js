const getYieldForPlant = (plantHarvest) => plantHarvest.yield;

const getYieldForCrop = (cropHarvest) =>
  cropHarvest.crop.yield * cropHarvest.numCrops;

const getTotalYield = ({ crops }) =>
  crops.reduce(
    (previousValue, currentValue) =>
      previousValue + getYieldForCrop(currentValue),
    0
  );

const getCostsForCrop = (crops) => crops.crop.cost * crops.numCrops;

const getRevenueForCrop = (crops) =>
  crops.crop.salePrice * getYieldForCrop(crops);

const getProfitForCrop = (crops) =>
  getRevenueForCrop(crops) - getCostsForCrop(crops);

const getTotalProfit = ({ crops }) =>
  crops.reduce(
    (previousValue, currentValue) =>
      previousValue + getProfitForCrop(currentValue),
    0
  );

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
