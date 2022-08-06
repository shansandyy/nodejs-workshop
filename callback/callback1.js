function doWork(job, timer, cb, cb1) {
    // 為了模擬一個非同步工作
    setTimeout(() => {
      let dt = new Date();
      
      cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);

    

  }

  
  
  let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);


  // 刷牙(3) => 吃早餐(5) => 寫功課(3)
  // 開始工作 at 2022-08-06T02:46:54.746Z
  // 執行成功: 完成工作 刷牙 at 2022-08-06T02:46:57.761Z
  // 執行成功: 完成工作 吃早餐 at 2022-08-06T02:47:02.761Z
  // 執行成功: 完成工作 寫功課 at 2022-08-06T02:47:05.761Z
  doWork('刷牙', 3000, function (err, data) {
    if (err) {
      console.error('發生錯誤了', err);
    } else {
      console.log('執行成功:', data);
    }
  });

  doWork('吃早餐', 8000, function (err, data) {
    if (err) {
      console.error('發生錯誤了', err);
    } else {
      console.log('執行成功:', data);
    }
  });

  doWork('寫功課', 11000, function (err, data) {
    if (err) {
      console.error('發生錯誤了', err);
    } else {
      console.log('執行成功:', data);
    }
  });
  