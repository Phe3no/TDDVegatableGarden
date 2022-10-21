//helperfunction for getYieldForPlant, returns expected crop-result, based on eFactor
//if environmentFactor (eFactor) is 0, wether it is high, medium or low, just return the original value
const calculateWithEnvironmentFactors = (plantFactor, eFactor, yieldResult) => {
  let result = yieldResult;
  if (eFactor === "low" && plantFactor.low !== 0)
    result = result + (result * plantFactor.low) / 100;
  if (eFactor === "medium" && plantFactor.medium !== 0)
    result = result + (result * plantFactor.medium) / 100;
  if (eFactor === "high" && plantFactor.high !== 0)
    result = result + (result * plantFactor.high) / 100;
  if (result < 0) return 0;
  return result;
};

const getYieldForPlant = (plantHarvest, eFactor) => {
  //JavaScript is a loosely typed language, so you don’t have to specify what type of information will be stored in a variable in advance
  //when no arguments are passed to the parameter 'factor', the value will be undefined.
  if (eFactor === undefined) return plantHarvest.yield;

  let yieldResult = plantHarvest.yield;
  //sunFactor
  if (eFactor.sun) {
    yieldResult = calculateWithEnvironmentFactors(
      plantHarvest.factor.sun,
      eFactor.sun,
      yieldResult
    );
  }
  //windFactor
  if (eFactor.wind) {
    yieldResult = calculateWithEnvironmentFactors(
      plantHarvest.factor.wind,
      eFactor.wind,
      yieldResult
    );
  }
  //more factors could be added, probably it needs a new helperfunction

  return yieldResult;
};

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
