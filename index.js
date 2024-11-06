(function () {
  // 获取机器人表情接口
  const apiUrl = 'https://ku.shenzhuo.vip/emo/status';
  // 表情数据数组
  const dataList = []
  // 定义请求函数
  function makeRequest() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // 判断接口返回的状态码是否为0
        if (data.code !== 0) return;
        // 处理接口返回的数据
        const dataInfo = data.data;

        // 判断表情数组是否为空
        if (dataInfo.emojiList.length === 0) return;

        if (parseInt(dataInfo.speed) === 0) { // 如果速度为0，则清空表情数组，重新赋值
          dataList.length = 0;
          dataList.push(dataInfo);
        } else { // 如果速度不为0，则将表情添加到数组中
          dataList.push(dataInfo);
        }

        // 设置表情图片
        setBiaoqing();
      })
      .catch(error => {
        // 处理请求错误
      });
  }

  // makeRequest();
  // 定时调用请求函数
  setInterval(makeRequest, 1000);

  // 表情定时器
  let timer = null;
  let superIndex = 0;
  // 设置表情图片函数
  function setBiaoqing() {
    // 判断表情数组是否为空
    if (dataList.length === 0) return;

    if (dataList.length === 1) {
      // 清除表情定时器
      clearInterval(timer);
      superIndex = 0;
    }

    recursionTimer();
  }

  // 递归定时器函数
  function recursionTimer() {
    const biaoqing = document.getElementById('biaoqing');
    let info = dataList[superIndex]
    let index = 0;
    biaoqing.src = `./img/${info.emojiList[index]}.jpeg`;
    index++;
    const speed = +info.speed === 0 ? 5000 : info.speed;
    // 清除表情定时器
    clearInterval(timer);
    // 重新设置表情定时器
    timer = setInterval(() => {
      if (index >= info.emojiList.length - 1) {
        index = info.emojiList.length - 1;
      } else {
        index = (index + 1) % info.emojiList.length;
      }
      biaoqing.src = `./img/${info.emojiList[index]}.jpeg`;

      // 检查是否已经循环到当前 item 的最后一个 emoji
      if (index === info.emojiList.length - 1 && dataList.length > 1) {
        superIndex++
        if (superIndex < dataList.length) {
          recursionTimer();
        } else {
          superIndex = dataList.length - 1;
        }
      }
    }, speed);
  }
})()