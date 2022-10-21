const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

//get yield for plant
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForPlant with environment settings", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -20,
        medium: 0,
        high: 30,
      },
      wind: {
        low: 15,
        medium: 0,
        high: -10,
      },
    },
  };
  test("Get yield for plant with sun low and wind high", () => {
    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(21.6);
  });
  test("Get yield for plant with sun medium and wind low", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(34.5);
  });
});

//get yield for crop
describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getYieldForCrop with environment factors", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -20,
        medium: 0,
        high: 30,
      },
      wind: {
        low: 15,
        medium: 0,
        high: -10,
      },
    },
  };
  test("Get yield for multiple crops with sun medium and wind low and 5 plants", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "low",
    };
    const input = {
      crop: corn,
      numCrops: 5,
      eFactor: environmentFactors,
    };
    expect(getYieldForCrop(input)).toBe(172.5);
  });
});

//get total yield
describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getTotalYield with environment factors", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -20,
        medium: 0,
        high: 30,
      },
      wind: {
        low: 15,
        medium: 0,
        high: -10,
      },
    },
  };
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -10,
        medium: 0,
        high: 40,
      },
      wind: {
        low: 15,
        medium: 5,
        high: -5,
      },
    },
  };
  test("Calculate total yield with multiple crops and environment factors", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "low",
    };
    const crops = [
      { crop: corn, numCrops: 5, eFactor: environmentFactors },
      { crop: pumpkin, numCrops: 2, eFactor: environmentFactors },
    ];
    expect(getTotalYield({ crops })).toBe(26.45);
  });

  test("Calculate total yield with 1 crop at 0 amount", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    const crops = [
      { crop: corn, numCrops: 0, eFactor: environmentFactors },
      { crop: pumpkin, numCrops: 4, eFactor: environmentFactors },
    ];
    expect(getTotalYield({ crops })).toBe(21.28);
  });
});

//get costs for crop
describe("getCostsForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    cost: 2,
  };

  test("Get costs for a number of crops", () => {
    const crop = { crop: corn, numCrops: 5 };
    expect(getCostsForCrop(crop)).toBe(10);
  });

  test("Get costs for 0 crops", () => {
    const crop = { crop: corn, numCrops: 0 };
    expect(getCostsForCrop(crop)).toBe(0);
  });
});

// get revenue for crop
describe("getRevenueForCrop", () => {
  const strawberry = {
    name: "strawberry",
    yield: 2,
    cost: 7,
    salePrice: 12,
  };

  test("Get revenue for a number of strawberry-crops", () => {
    const crop = { crop: strawberry, numCrops: 4 };
    expect(getRevenueForCrop(crop)).toBe(96);
  });
  test("Get revenue for 0 strawberry-crops", () => {
    const crop = { crop: strawberry, numCrops: 0 };
    expect(getRevenueForCrop(crop)).toBe(0);
  });
});

describe("getRevenueForCrop with environment factors", () => {
  const strawberry = {
    name: "strawberry",
    yield: 2,
    cost: 7,
    salePrice: 12,
    factor: {
      sun: {
        low: -10,
        medium: 0,
        high: 40,
      },
      wind: {
        low: 15,
        medium: 5,
        high: -5,
      },
    },
  };

  test("Get revenue for a number of strawberry-crops with environment factors", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    const crop = { crop: strawberry, numCrops: 5, eFactor: environmentFactors };
    expect(getRevenueForCrop(crop)).toBe(159.6);
  });
  test("Get revenue for 0 strawberry-crops with environment factors", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    const crop = { crop: strawberry, numCrops: 0, eFactor: environmentFactors };
    expect(getRevenueForCrop(crop)).toBe(0);
  });
});

//get profit for crop
describe("getProfitForCrop", () => {
  const blueberry = {
    name: "blueberry",
    yield: 3,
    cost: 8,
    salePrice: 11,
  };
  test("Get profit for a number of blueberry-crops", () => {
    const crop = { crop: blueberry, numCrops: 3 };
    expect(getProfitForCrop(crop)).toBe(75);
  });
  test("Get profit for 0 blueberry-crops", () => {
    const crop = { crop: blueberry, numCrops: 0 };
    expect(getProfitForCrop(crop)).toBe(0);
  });
  test("Get profit for 1 blueberry-crop", () => {
    const crop = { crop: blueberry, numCrops: 1 };
    expect(getProfitForCrop(crop)).toBe(25);
  });
});

describe("getProfitForCrop with environment factors", () => {
  const blueberry = {
    name: "blueberry",
    yield: 3,
    cost: 8,
    salePrice: 11,
    factor: {
      sun: {
        low: -30,
        medium: 10,
        high: 60,
      },
      wind: {
        low: 15,
        medium: 10,
        high: 5,
      },
    },
  };
  test("Get profit for a number of blueberry-crops with environment factors 1", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    const crop = { crop: blueberry, numCrops: 3, eFactor: environmentFactors };
    expect(getProfitForCrop(crop)).toBe(142.32);
  });
  test("Get profit for 0 blueberry-crops with environment factors 2", () => {
    const environmentFactors = {
      sun: "high",
      wind: "medium",
    };
    const crop = { crop: blueberry, numCrops: 0, eFactor: environmentFactors };
    expect(getProfitForCrop(crop)).toBe(0);
  });
  test("Get profit for 1 blueberry-crop with environment factors 3", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "low",
    };
    const crop = { crop: blueberry, numCrops: 1, eFactor: environmentFactors };
    expect(getProfitForCrop(crop)).toBe(33.8);
  });
});

//get total profit
describe("getTotalProfit", () => {
  const apple = {
    name: "apple",
    yield: 15,
    cost: 15,
    salePrice: 3,
  };
  const pear = {
    name: "pear",
    yield: 18,
    cost: 20,
    salePrice: 3.5,
  };
  const walnut = {
    name: "walnut",
    yield: 5,
    cost: 28,
    salePrice: 9,
  };
  test("get total profit of 3 crops of apple and 5 crops of pear", () => {
    const crops = [
      { crop: apple, numCrops: 3 },
      { crop: pear, numCrops: 5 },
    ];
    expect(getTotalProfit({ crops })).toBe(305);
  });
  test("get total profit of 3 crops of apple and 0 crops of pear", () => {
    const crops = [
      { crop: apple, numCrops: 3 },
      { crop: pear, numCrops: 0 },
    ];
    expect(getTotalProfit({ crops })).toBe(90);
  });
  test("get total profit of 2 crops of apple, 3 crops of pear and 1 crop of walnut", () => {
    const crops = [
      { crop: apple, numCrops: 2 },
      { crop: pear, numCrops: 3 },
      { crop: walnut, numCrops: 1 },
    ];
    expect(getTotalProfit({ crops })).toBe(206);
  });
});
