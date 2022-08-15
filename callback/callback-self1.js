function doWork(job, timer, cb) {
    setTimeout(() => {
        let dt = new Date();
        cb(null, `完成： ${job} at ${dt.toISOString()}`);
    },timer)
}

let dt = new Date();
console.log(dt.toISOString());

doWork('刷牙', 3000, function(err, data){
    if (err) {
        console.error('沒有完成：', err);
        return;
    } 
    console.log('成功完成：', data);
    doWork('eat', 5000, function(err, data){
        if (err) {
            console.error('沒有完成：', err);
            return;
        }
        console.log('成功完成：', data);
        doWork('write', 3000, function(err, data){
            if (err) {
                console.error('沒有完成：', err);
                return;
            } 
            console.log('成功完成：', data);
        })
        
    })
    
})