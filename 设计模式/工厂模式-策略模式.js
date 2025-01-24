// 策略模式的实现

// 定义策略类
class Strategy {
    execute(a, b) {
        throw new Error("This method should be overridden!");
    }
}

// 具体策略类
class AddStrategy extends Strategy {
    execute(a, b) {
        return a + b;
    }
}

class SubtractStrategy extends Strategy {
    execute(a, b) {
        return a - b;
    }
}

class MultiplyStrategy extends Strategy {
    execute(a, b) {
        return a * b;
    }
}

class DivideStrategy extends Strategy {
    execute(a, b) {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    }
}

// 上下文类
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    executeStrategy(a, b) {
        return this.strategy.execute(a, b);
    }
}

// 使用策略模式
const context = new Context(new AddStrategy());
console.log("Add: ", context.executeStrategy(10, 5)); // Add: 15

context.setStrategy(new SubtractStrategy());
console.log("Subtract: ", context.executeStrategy(10, 5)); // Subtract: 5

context.setStrategy(new MultiplyStrategy());
console.log("Multiply: ", context.executeStrategy(10, 5)); // Multiply: 50

context.setStrategy(new DivideStrategy());
console.log("Divide: ", context.executeStrategy(10, 5)); // Divide: 2
/**
 * 策略模式是一种行为设计模式，它定义了一系列算法，并将每个算法封装起来，使它们可以相互替换。
 * 策略模式使得算法可以在不影响客户端的情况下发生变化。
 * 
 * 在策略模式中，通常有三个角色：
 * 1. 上下文（Context）：持有一个策略类的引用，最终会使用策略类来执行具体的算法。
 * 2. 策略（Strategy）：定义了一个算法族的公共接口。
 * 3. 具体策略（ConcreteStrategy）：实现了策略接口的具体算法。
 * 
 * 策略模式的优点：
 * 1. 可以动态地更改对象的行为。
 * 2. 避免了使用多重条件语句（如if-else或switch-case）。
 * 3. 提高了代码的可读性和可维护性。
 * 
 * 策略模式的缺点：
 * 1. 客户端必须知道所有的策略类，并自行决定使用哪一个策略类。
 * 2. 策略类会增多，增加了系统的复杂性。
 */
