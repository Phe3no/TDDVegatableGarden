const getYieldForPlant = (plantHarvest) => plantHarvest.yield;

const getYieldForCrop = (cropHarvest) =>
  cropHarvest.crop.yield * cropHarvest.numCrops;

const getTotalYield = ({ cropsHarvest }) => {};

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield };
