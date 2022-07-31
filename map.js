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
  
// 三個人的身高各增加10公分
  
//reduce()
ary.map((item) => item.height += 10);
console.log(ary); 
//三位的身高分別增加為160, 170, 180
  
  
//for-loop
function map(ary) {
    let result = [];
    for (let i = 0; i < ary.length; i++) { 
        ary[i].height += 10; 
        result.push(ary[i]);
    }
    return result;
  }
  console.log(map(ary));
  //三位的身高分別增加為160, 170, 180