
// self.onmessage = function (e) {
//     const data = e.data;
//     console.log("长任务开始");
//     console.time("calculate");
//     let count = 0;
//     for (let i = 0; i < data; i++) {
//         count++;
//     }
//     console.log("长任务结束");
//     console.timeEnd("calculate");
//     self.postMessage("处理完成");
// };

importScripts(
    "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js"
);

self.onmessage = function (e) {
    const data = e.data;

    // 确保data是非空数组
    if (!Array.isArray(data) || data.length === 0) {
        self.postMessage(null); // 或者发送一个错误消息
        return;
    }

    // 使用Lodash找到最大值
    const res = self._.max(data);

    // 如果res是undefined，可能是因为数组中没有有效值
    if (res === undefined) {
        self.postMessage(null); // 或者发送一个错误消息
    } else {
        self.postMessage(res);
    }
};