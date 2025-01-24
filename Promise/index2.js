function Promise1(fn) {
    this.cbs = [];

    const resolve = (value) => {
        setTimeout(() => {
            this.data = value;
            this.cbs.forEach((cb) => cb(value));
        });
    }

    fn(resolve);
}

Promise1.prototype.then = function (onResolved) {
    return new Promise1((resolve) => {
        this.cbs.push(() => {
            const res = onResolved(this.data);
            if (res instanceof Promise1) {
                res.then(resolve);
            } else {
                resolve(res);
            }
        });
    });
};

const fn = (resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 500);
};

new Promise1(fn);
