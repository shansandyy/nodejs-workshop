const fs = require('fs');

function doRead(fileName, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, options, (err, data) => {
            if (err) {
                return reject('發生錯誤', err);
            }
            resolve(data);
        });
    })
}

let read = doRead('test.txt', 'utf8');
read
    .then((data) => {
        console.log('test.txt', data); //AAAAA
        return doRead('test1.txt', 'utf8');
    })
    .then((data) => {
        console.log('test1.txt', data); //BBBBB
    })
    .catch((err) => {
        console.log(err);
    })




// fs.readFile('test.txt', 'utf8', (err, data) => {
  
  
//   if (err) {
//     return console.error('發生錯誤', err);
//   }
//   console.log(data);
// });