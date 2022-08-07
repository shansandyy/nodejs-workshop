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

async function result() {
    try{
        let content1 = await doRead('test.txt', 'utf8');
        console.log('test.txt', content1);

        let content2 = await doRead('test1.txt', 'utf8');
        console.log('test1.txt', content2);
    } catch (err) {
        console.log(err);
    }
}
result();

// let read = doRead('test.txt', 'utf8');
// read
//     .then((data) => {
//         console.log(data); //AAAAA
//     })
//     .catch((err) => {
//         console.log(err);
//     })
