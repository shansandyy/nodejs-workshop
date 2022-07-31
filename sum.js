//prettier排版
//ESLint語法
//資料結構＆演算法

//A. for-loop
function sum(n) {
   let result = 0;
   for (let i = 0; i <= n; i++) {
    result += i;
   }
   return result;
}
console.log(sum(10));


//B. 公式解
function sum2(n){
    return ((n+1) * n) / 2;
}
console.log(sum2(5));
