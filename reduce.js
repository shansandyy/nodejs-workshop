let ary = [
    {
      id: 1,
      name: 'Mia',
      height: 150
    },
    {
      id: 2,
      name: 'John',
      height: 160
    },
    {
      id: 3,
      name: 'Eva',
      height: 170
    },
];
  
// 三個人的平均身高
  
//reduce()
let heightTotle = ary.reduce((acc, item) => acc + item.height, 0)
let heightAvg = heightTotle / ary.length;
console.log(heightAvg); 
//三位的平均身高為160
  
  
//for-loop
function reduce(ary) {
  let heightTtl = 0;
    for (let i = 0; i < ary.length; i++) {
      heightTtl += ary[i].height; 
    }
    return heightTtl / ary.length;
}
console.log(reduce(ary));
//三位的平均身高160