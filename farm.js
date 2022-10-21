const getYieldForPlant = (plantHarvest) => plantHarvest.yield;

const getYieldForCrop = (cropHarvest) =>
  cropHarvest.crop.yield * cropHarvest.numCrops;

const getTotalYield = ({ crops }) =>
  crops.reduce(
    (previousValue, currentValue) =>
      previousValue + getYieldForCrop(currentValue),
    0
  );

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield };
