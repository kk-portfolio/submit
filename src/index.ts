import { KnapsackItem, solveKnapsackProblem } from './knapsack-problem';

// 正常なケース1
try {
  const W = 9;
  const items: KnapsackItem[] = [
    { weight: 2, value: 3 },
    { weight: 1, value: 2 },
    { weight: 3, value: 6 },
    { weight: 2, value: 1 },
    { weight: 1, value: 3 },
    { weight: 5, value: 85 },
  ];
  console.group(`正常なケース1. n=${items.length}, W=${W}`);
  console.group('入力：');
  console.log(`W=${W}`);
  console.log(items);
  console.groupEnd();
  console.group('出力：');
  console.log(solveKnapsackProblem(items, W));
} catch (e) {
  console.log('ERROR: ', e.message);
} finally {
  console.groupEnd();
  console.groupEnd();
}

console.log('\r\n--------------------------------------------------');

// 正常なケース2
try {
  const W = 4;
  const items: KnapsackItem[] = [
    { weight: 3, value: 5 },
    { weight: 2, value: 3 },
    { weight: 2, value: 3 },
  ];
  console.group(`正常なケース2. n=${items.length}, W=${W}`);
  console.group('入力：');
  console.log(`W=${W}`);
  console.log(items);
  console.groupEnd();
  console.group('出力：');
  console.log(solveKnapsackProblem(items, W));
} catch (e) {
  console.log('ERROR: ', e.message);
} finally {
  console.groupEnd();
  console.groupEnd();
}

console.log('\r\n--------------------------------------------------');

// 異常なケース
try {
  const W = 4;
  const items: KnapsackItem[] = [{ weight: 2, value: 3 }];
  console.group(`異常なケース. n=${items.length}, W=${W}`);
  console.group('入力：');
  console.log(`W=${W}`);
  console.log(items);
  console.groupEnd();
  console.group('出力：');
  console.log(solveKnapsackProblem(items, W));
} catch (e) {
  console.log('ERROR: ', e.message);
} finally {
  console.groupEnd();
  console.groupEnd();
}
