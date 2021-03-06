import { cloneDeep, times, sample, isNumber } from "lodash";
import { filterObjectByValue } from "core/helpers";
import getRandomColor from "randomcolor";
import Test from "./test";
import { transposeMatrix } from "./utils";

const colorsEnum = Object.freeze([
  `rgba(102, 187, 106,1.0)`,
  `rgba(255, 238, 88,1.0)`,
  `rgba(255, 167, 38,1.0)`,
  `rgba(141, 110, 99,1.0)`,
  `rgba(120, 144, 156,1.0)`,
  `rgba(239, 83, 80,1.0)`,
  `rgba(171, 71, 188,1.0)`,
  `rgba(92, 107, 192,1.0)`,
  `rgba(41, 182, 246,1.0)`,
]);

class State {
  tests = null;

  totalQuestions = null;

  totalCategories = null;

  totalComplexity = null;

  // set
  suites = null;

  // map
  suiteComplexities = null;

  fitnessValue = null;

  constructor(data, transposed = false) {
    let initTests;
    if (transposed) {
      initTests = transposeMatrix(data);
    } else initTests = data;
    const firstTest = initTests[0][0];
    const isSkeleton = typeof firstTest === "number";
    if (!isSkeleton && !firstTest) {
      throw new Error("Invalid tests");
    }
    const tests = isSkeleton
      ? initTests.map((questionTests) =>
          questionTests.map((complexity) => new Test(complexity))
        )
      : initTests;
    this.tests = tests;
    this.totalQuestions = tests.length;
    this.totalCategories = tests[0].length;
    this.#defineSuites();
    this.calculateComplexities();
  }

  static initSample() {
    const [YELLOW, GREEN] = [1, 2];
    const tests = [
      // 1 category                2 category
      [new Test(3, YELLOW), new Test(2, YELLOW)], // 1 question
      [new Test(1, YELLOW), new Test(7, YELLOW)], // 2 question
      [new Test(9, GREEN), new Test(5, GREEN)], // 3 question
      [new Test(2, GREEN), new Test(6, GREEN)], // 4 question
    ];
    return new State(tests);
  }

  #defineSuites = () => {
    this.suites = this.tests.reduce(
      (suites, questionTests) =>
        new Set([
          ...questionTests.reduce((qSuites, test) => {
            if (isNumber(test.suite)) {
              return new Set([...qSuites, test.suite]);
            }
            return qSuites;
          }, new Set()),
          ...suites,
        ]),
      new Set()
    );
  };

  calculateComplexities = () => {
    if (!this.suites.size) return;
    const complexities = new Map();

    let totalComplexity = 0;

    this.suites.forEach((suite) => {
      const complexity = this.#calcSuiteComplexity(suite);
      complexities.set(suite, complexity);
      totalComplexity += complexity;
    });

    this.suiteComplexities = complexities;
    this.totalComplexity = totalComplexity;
    this.fitnessValue = this.#fitness();
  };

  #calcSuiteComplexity = (suite) =>
    this.tests.reduce(
      (sum, questionTests) =>
        sum +
        questionTests.reduce((questionSum, test) => {
          if (test.suite !== suite) return questionSum;
          return questionSum + test.complexity;
        }, 0),
      0
    );

  #fitness = () => {
    const complexityArr = [...this.suiteComplexities.values()].sort(
      (a, b) => a - b
    );
    return Math.abs(complexityArr[0] - complexityArr[complexityArr.length - 1]);
  };

  clone = () => {
    const tests = cloneDeep(this.tests);
    return new State(tests);
  };

  randomizeSuites = (suitsTotalCount) => {
    // in each category should be equal numbers of suits
    const suiteCountPerCategory = this.totalQuestions / suitsTotalCount;

    const transposedTests = this.getTransposedTests();
    transposedTests.forEach((categoryTests) => {
      const suites = {};
      times(suitsTotalCount, (i) => {
        suites[i + 1] = suiteCountPerCategory;
      });
      categoryTests.forEach((test) => {
        const permittedSuites = filterObjectByValue(suites, (val) => val > 0);
        const randomSuite = sample(Object.keys(permittedSuites));
        // eslint-disable-next-line no-param-reassign
        test.suite = +randomSuite;
        suites[randomSuite]--;
      });
    });
    this.#defineSuites();
    this.calculateComplexities();
  };

  getTransposedTests = () => transposeMatrix(this.tests);

  getColor = (suite) =>
    colorsEnum[suite - 1] ||
    getRandomColor({
      luminosity: "bright",
      alpha: 0.3,
      format: "rgba",
    });
}

export default State;
