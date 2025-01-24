const asyncClass = (errorHandler) => (target) => {
    Object.getOwnPropertyNames(target.prototype).forEach(key => {
        const func = target.prototype[key];
        target.prototype[key] = async function(...args) {
            try {
                await func.apply(this, args);
            } catch (error) {
                if (errorHandler) {
                    errorHandler(error);
                }
            }
        };
    });
    return target;
};

const successRequest = () => Promise.resolve('a');
const failRequest = () => Promise.reject('b');

const iAsyncClass = asyncClass(error => {
    console.log('统一异常处理', error); // 统一异常处理 b
});

class Action {
    async successReuqest() {
        const result = await successRequest();
        console.log('successReuqest', '处理返回值', result);
    }

    async failReuqest() {
        try {
            const result = await failRequest();
        } catch (error) {
            console.log('failReuqest', '处理返回值22222222222222', error); // 永远不会执行
        }
       
      
    }

    async allReuqest() {
        const result1 = await successRequest();
        console.log('allReuqest', '处理返回值 success', result1);
        const result2 = await failRequest();
        console.log('allReuqest', '处理返回值 success', result2); // 永远不会执行
    }
}

// 使用装饰器来增强类的功能
iAsyncClass(Action); // 将类通过装饰器进行增强

const action = new Action();
action.successReuqest();
action.failReuqest();
action.allReuqest();
