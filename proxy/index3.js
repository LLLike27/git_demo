function proxyArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            if (Number(propKey) < 0) {
                propKey = String(target.length + Number(propKey));
            }
            return Reflect.get(target, propKey, receiver);
        }
    }
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
let arr = proxyArray('a', 'b', 'c')