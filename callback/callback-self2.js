//Promise 是表示非同步運算的最終完成或失敗的物件
//物件 ＝> new promise()
//promise(executor)
//executor --> resolve(成功), reject(失敗)
//function executor(resolve, reject)

function doWork(job, timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            // reject({error:'沒有成功'});
            resolve(`完成： ${job} at ${dt.toISOString()}`);
        },timer);
    });
}
let dt = new Date();
console.log(dt.toISOString());

let brushPromise = doWork('刷牙', 3000);
// console.log(brushPromise); //pending還不知道結果
brushPromise
//.then接住resolve的東西
.then((data) => {
    console.log('成功完成：', data);

    // let eatPromise = doWork('eat', 5000);
    // return eatPromise;
    return doWork('eat', 5000);
})
.then((data) => {
    console.log('成功完成：', data);

    return doWork('write', 3000);
})
.then((data) => {
    console.log('成功完成：', data);
})
.catch((err) => {
    console.error('沒有完成：', err)
})