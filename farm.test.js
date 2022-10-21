const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

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

describe("getRevenueForCrop", () => {
  const strawberry = {
    name: "strawberry",
    yield: 2,
    cost: 7,
    salePrice: 12,
  };

  test("Get revenue for a number of crops", () => {
    const crop = { crop: strawberry, numCrops: 4 };
    expect(getRevenueForCrop(crop)).toBe(96);
  });
  test("", () => {
    const crop = { crop: strawberry, numCrops: 0 };
    expect(getRevenueForCrop(crop)).toBe(0);
  });
});
