let ary = [
    {
      id: 1,
      name: 'Mia',
      color: 'orange',
    },
    {
      id: 2,
      name: 'John',
      color: 'yellow',
    },
    {
      id: 3,
      name: 'Eva',
      color: 'orange',
    },
];
  
// 找出 第一筆喜歡orange的人
  
//find()
let result = ary.find((item) => item.color === 'orange')
console.log(result); 
//Mia like orange
  
  
//for-loop
function find(ary) {
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].color === "orange") {
      return ary[i];
    }  
  }
}
console.log(find(ary));
//Mia like orange