// 封装与Web Worker交互的功能
function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./app.worker.js');
        // worker.postMessage(4000000000); // 假设此处传递的是安全的数据
        worker.postMessage([123123, 1485486, 12, 0, 555]); // 假设此处传递的是安全的数据

        worker.onmessage = (e) => {
            console.log("收到worker的消息", e.data);
            resolve(e.data); // 假设这里是处理完成的数据，适当的时候调用resolve
        };

        worker.onerror = (error) => {
            console.error("Worker发生错误:", error);
            reject(error); // 发生错误时，通过reject传递出去
        };
    });
}

// 使用封装的函数，并处理Promise
async function handlerLoading() {
    try {
        // 使用async/await语法
        const result = await createWorker();
        console.log("从Worker接收到的结果:", result);
    } catch (error) {
        console.error("处理Web Worker时发生错误:", error);
    }
}

// 调用函数
// handlerLoading();