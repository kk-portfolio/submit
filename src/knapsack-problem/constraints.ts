import { KnapsackItem } from '.';

/**
 * n、weight[i]、value[i]、総和W の範囲の定義
 */
const ITEM_LENGTH_LOWER_LIMIT = 2; // n
const ITEM_LENGTH_UPPER_LIMIT = 100;
const WEIGHT_LOWER_LIMIT: number = 1; // weight[i]
const WEIGHT_UPPER_LIMIT: number = 1000;
const VALUE_LOWER_LIMIT: number = 1; // value[i]
const VALUE_UPPER_LIMIT: number = 1000;
const WEIGHT_SUM_LOWER_LIMIT: number = 1; // 総和W
const WEIGHT_SUM_UPPER_LIMIT: number = 10000;

/**
 * 例外の定義
 */
export const ITEMS_LENGTH_OUT_OF_RANGE: string = `${ITEM_LENGTH_LOWER_LIMIT} <= n <= ${ITEM_LENGTH_UPPER_LIMIT} を満たしていません`;
export const WEIGHTS_CONTAINS_NON_INTEGERS: string = `weight[i] に整数以外が含まれています`;
export const VALUES_CONTAINS_NON_INTEGERS: string = `value[i] に整数以外が含まれています`;
export const WEIGHT_SUM_NON_INTEGER: string = `W が整数ではありません`;
export const WEIGHTS_OUT_OF_RANGE: string = `${WEIGHT_LOWER_LIMIT} <= weight[i] <= ${WEIGHT_UPPER_LIMIT} を満たしていない値が含まれています`;
export const VALUES_OUT_OF_RANGE: string = `${VALUE_LOWER_LIMIT} <= value[i] <= ${VALUE_UPPER_LIMIT} を満たしていない値が含まれています`;
export const WEIGHT_SUM_OUT_OF_RANGE: string = `${WEIGHT_SUM_LOWER_LIMIT} <= W <= ${WEIGHT_SUM_UPPER_LIMIT} を満たしていません`;

/**
 * 1 < n <= 100 であることを確認する関数
 * @param itemLength n
 * @returns 確認結果（true:適切、false:不適切）
 */
const validateItemLength = (itemLength: number): boolean => {
  return (
    itemLength >= ITEM_LENGTH_LOWER_LIMIT &&
    itemLength <= ITEM_LENGTH_UPPER_LIMIT
  );
};

/**
 * 配列の要素が全て整数であることを確認する関数
 * @param numbers number型配列
 * @returns 確認結果（true:全て整数、false:整数以外が含まれる）
 */
const checkAllIntegers = (numbers: number[]): boolean => {
  const notIntegers = numbers.filter((value) => !Number.isInteger(value));
  return notIntegers.length === 0;
};

/**
 * 1 <= weight[i] <= 1000 であることを確認する関数
 * @param weights weightの配列
 * @returns 確認結果（true:適切、false:不適切）
 */
const validateWeights = (weights: number[]): boolean => {
  const validWeights = weights.filter(
    (weight) => weight >= WEIGHT_LOWER_LIMIT && weight <= WEIGHT_UPPER_LIMIT
  );
  return validWeights.length === weights.length;
};

/**
 * 1 <= value[i] <= 1000 であることを確認する関数
 * @param values valueの配列
 * @returns 確認結果（true:適切、false:不適切）
 */
const validateValues = (values: number[]): boolean => {
  const validValues = values.filter(
    (value) => value >= VALUE_LOWER_LIMIT && value <= VALUE_UPPER_LIMIT
  );
  return validValues.length === values.length;
};

/**
 * 1 <= W <= 10000 であることを確認する関数
 * @param weightSumLimit W
 * @returns 確認結果（true:適切、false:不適切）
 */
const validateWeightSumLimit = (weightSumLimit: number): boolean => {
  return (
    weightSumLimit >= WEIGHT_SUM_LOWER_LIMIT &&
    weightSumLimit <= WEIGHT_SUM_UPPER_LIMIT
  );
};

/**
 * ナップサック問題の制約をチェックする関数
 * @param items アイテム情報（重さ、価値）の配列
 * @param weightSumLimit 重さ上限
 */
export const checkConstraints = (
  items: KnapsackItem[],
  weightSumLimit: number
) => {
  const n = items.length;
  const weights = items.map((item) => item.weight);
  const values = items.map((item) => item.value);

  // 1 < n <= 100 であることを確認
  if (!validateItemLength(n)) {
    throw new Error(ITEMS_LENGTH_OUT_OF_RANGE);
  }

  // weight[i] が整数であることを確認
  if (!checkAllIntegers(weights)) {
    throw new Error(WEIGHTS_CONTAINS_NON_INTEGERS);
  }
  // 1 <= weight[i] <= 1000 であることを確認
  if (!validateWeights(weights)) {
    throw new Error(WEIGHTS_OUT_OF_RANGE);
  }

  // value[i] が整数であることを確認
  if (!checkAllIntegers(values)) {
    throw new Error(VALUES_CONTAINS_NON_INTEGERS);
  }
  // 1 <= value[i] <= 1000 であることを確認
  if (!validateValues(values)) {
    throw new Error(VALUES_OUT_OF_RANGE);
  }

  // W が整数であることを確認
  if (!Number.isInteger(weightSumLimit)) {
    throw new Error(WEIGHT_SUM_NON_INTEGER);
  }
  // 1 <= W <= 10000 であることを確認
  if (!validateWeightSumLimit(weightSumLimit)) {
    throw new Error(WEIGHT_SUM_OUT_OF_RANGE);
  }
};
