import { checkConstraints } from './constraints';

/**
 * アイテム情報
 */
export type KnapsackItem = {
  weight: number;
  value: number;
};

/**
 * ナップサック問題の解答
 */
export type SolveResult = {
  maximumValue: number;
  choicedItems: KnapsackItem[];
};

/**
 * ナップサック問題を解く関数
 * @param items アイテム情報（重さ、価値）の配列
 * @param weightSumLimit 重さ上限
 * @returns 解答（価値の総和の最大値、選んだアイテムの配列）
 */
export const solveKnapsackProblem = (
  items: KnapsackItem[],
  weightSumLimit: number
): SolveResult | null => {
  const n = items.length;

  // 入力値の妥当性確認
  checkConstraints(items, weightSumLimit);

  // DPテーブルを0で初期化
  const dp: number[][] = [...Array(n + 1)].map(() =>
    Array(weightSumLimit + 1).fill(0)
  );
  // アイテム選択状態テーブルを空文字で初期化（
  const choiced: string[][] = [...Array(n + 1)].map(() =>
    Array(weightSumLimit + 1).fill('')
  );

  // 動的計画法で解く
  for (let i = 0; i < n; i++) {
    const w = items[i].weight;
    const v = items[i].value;

    for (let j = 0; j < weightSumLimit + 1; j++) {
      dp[i + 1][j] = dp[i][j];
      choiced[i + 1][j] = choiced[i][j] + '0'; // アイテム[i+1]を選ばない場合は、アイテム選択状態に0を付加する
      if (j - w >= 0) {
        if (dp[i + 1][j] < dp[i][j - w] + v) {
          dp[i + 1][j] = dp[i][j - w] + v;
          choiced[i + 1][j] = choiced[i][j - w] + '1'; // アイテム[i+1]を選ぶ場合は、アイテム選択状態に1を付加する
        }
      }
    }
  }

  // この時点で choiced[n][weightSumLimit] には、アイテムの選択状態が 0と1 を組み合わせた文字列として格納されている
  // 0はそのアイテムが選択されなかったことを表し、1は選択されたことを表す
  // 例えば、5個のアイテムのうち 1個目と3個目が選択された場合、「10100」という文字列が格納される

  // 選択されたアイテムの配列を生成
  const choicedItems: KnapsackItem[] = [];
  choiced[n][weightSumLimit].split('').forEach((value, index) => {
    if (value === '1') {
      choicedItems.push(items[index]);
    }
  });

  // 問題を解いた結果（最大価値、選択されたアイテム）をリターン
  return {
    maximumValue: dp[n][weightSumLimit],
    choicedItems: choicedItems,
  };
};
