import {
  KnapsackItem,
  solveKnapsackProblem,
  SolveResult,
} from '../src/knapsack-problem';

import {
  ITEMS_LENGTH_OUT_OF_RANGE,
  VALUES_CONTAINS_NON_INTEGERS,
  VALUES_OUT_OF_RANGE,
  WEIGHTS_CONTAINS_NON_INTEGERS,
  WEIGHTS_OUT_OF_RANGE,
  WEIGHT_SUM_NON_INTEGER,
  WEIGHT_SUM_OUT_OF_RANGE,
} from '../src/knapsack-problem/constraints';

/**
 * 2つのアイテム情報配列の差分を配列として取得する関数
 * @param itemsA 1つ目のアイテム情報配列
 * @param itemsB 2つ目のアイテム情報配列
 * @returns 差分のアイテム情報配列
 */
const diffItems = (
  itemsA: KnapsackItem[],
  itemsB: KnapsackItem[]
): KnapsackItem[] => {
  const add = itemsA.filter(
    (a) => !itemsB.some((b) => b.weight === a.weight && b.value === a.value)
  );
  const remove = itemsB.filter(
    (b) => !itemsA.some((a) => a.weight === b.weight && a.value === b.value)
  );
  return [...add, ...remove];
};

describe('正常系', () => {
  test('ケース1. n=6, W=9', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 2, value: 3 },
      { weight: 1, value: 2 },
      { weight: 3, value: 6 },
      { weight: 2, value: 1 },
      { weight: 1, value: 3 },
      { weight: 5, value: 85 },
    ];
    const inputWeightLimit = 9;

    const expectValue: SolveResult = {
      maximumValue: 94,
      choicedItems: [
        { weight: 3, value: 6 },
        { weight: 1, value: 3 },
        { weight: 5, value: 85 },
      ],
    };
    const result = solveKnapsackProblem(inputItems, inputWeightLimit);
    // 価値の総和の最大値が期待通りか確認
    expect(result.maximumValue).toBe(expectValue.maximumValue);
    // 選択されたアイテムの組み合わせが期待通りか確認
    expect(
      diffItems(result.choicedItems, expectValue.choicedItems).length
    ).toBe(0);
  });

  test('ケース2. n=3, W=4', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 3, value: 5 },
      { weight: 2, value: 3 },
      { weight: 2, value: 3 },
    ];
    const inputWeightLimit = 4;

    const expectValue: SolveResult = {
      maximumValue: 6,
      choicedItems: [
        { weight: 2, value: 3 },
        { weight: 2, value: 3 },
      ],
    };
    const result = solveKnapsackProblem(inputItems, inputWeightLimit);
    // 価値の総和の最大値が期待通りか確認
    expect(result.maximumValue).toBe(expectValue.maximumValue);
    // 選択されたアイテムの組み合わせが期待通りか確認
    expect(
      diffItems(result.choicedItems, expectValue.choicedItems).length
    ).toBe(0);
  });
});

describe('制約チェック: 1 < n <= 100', () => {
  test('nが1のとき、ITEMS_LENGTH_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [{ weight: 2, value: 3 }];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      ITEMS_LENGTH_OUT_OF_RANGE
    );
  });

  test('nが2のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 2, value: 3 },
      { weight: 2, value: 3 },
    ];
    const inputWeightLimit = 9;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('nが100のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [];
    for (let i = 0; i < 100; i++) {
      inputItems.push({ weight: 2, value: 3 });
    }
    const inputWeightLimit = 9;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('nが101のとき、ITEMS_LENGTH_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [];
    for (let i = 0; i < 101; i++) {
      inputItems.push({ weight: 2, value: 3 });
    }
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      ITEMS_LENGTH_OUT_OF_RANGE
    );
  });
});

describe('制約チェック: 1 <= weight[i] <= 1000、weight[i]は整数', () => {
  test('weight[i] が0のとき、WEIGHTS_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 0, value: 3 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      WEIGHTS_OUT_OF_RANGE
    );
  });

  test('weight[i] が1のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('weight[i] が1000のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1000, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('weight[i] が1001のとき、WEIGHTS_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1000, value: 2 },
      { weight: 1001, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      WEIGHTS_OUT_OF_RANGE
    );
  });

  test('weight[i] が小数のとき、WEIGHTS_CONTAINS_NON_INTEGERS 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 3.5, value: 5 },
      { weight: 1, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      WEIGHTS_CONTAINS_NON_INTEGERS
    );
  });
});

describe('制約チェック: 1 <= value[i] <= 1000、value[i]は整数', () => {
  test('value[i] が0のとき、VALUES_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 0 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      VALUES_OUT_OF_RANGE
    );
  });

  test('value[i] が1のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 2, value: 1 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('value[i] が1000のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 2, value: 2 },
      { weight: 3, value: 1000 },
    ];
    const inputWeightLimit = 9;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('value[i] が1001のとき、VALUES_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 2, value: 2 },
      { weight: 3, value: 1001 },
    ];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      VALUES_OUT_OF_RANGE
    );
  });

  test('value[i] が小数のとき、VALUES_CONTAINS_NON_INTEGERS 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 3, value: 5 },
      { weight: 1, value: 2 },
      { weight: 3, value: 6.1 },
    ];
    const inputWeightLimit = 9;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      VALUES_CONTAINS_NON_INTEGERS
    );
  });
});

describe('制約チェック: 1 <= W <= 10000、Wは整数', () => {
  test('W が0のとき、WEIGHT_SUM_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 5 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 0;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      WEIGHT_SUM_OUT_OF_RANGE
    );
  });

  test('W が1のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 5 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 1;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('W が10000のとき、例外が発生しない', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 5 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 10000;
    expect(() =>
      solveKnapsackProblem(inputItems, inputWeightLimit)
    ).not.toThrow();
  });

  test('W が10001のとき、WEIGHT_SUM_OUT_OF_RANGE 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 5 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 10001;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      WEIGHT_SUM_OUT_OF_RANGE
    );
  });

  test('W が小数のとき、WEIGHT_SUM_NON_INTEGER 例外が発生する', () => {
    const inputItems: KnapsackItem[] = [
      { weight: 1, value: 5 },
      { weight: 3, value: 2 },
      { weight: 3, value: 6 },
    ];
    const inputWeightLimit = 9.5;
    expect(() => solveKnapsackProblem(inputItems, inputWeightLimit)).toThrow(
      WEIGHT_SUM_NON_INTEGER
    );
  });
});
