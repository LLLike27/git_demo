class MobilePhoneFactory {
    // 提供操作系统的接口
    createOS() {
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
    // 提供硬件的接口
    createHardWare() {
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
}

// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}

class newStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供苹果系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供小米硬件实例
        return new MiWare()
    }
}
class newStarFactory1 extends MobilePhoneFactory {
    createOS() {
        // 提供鸿蒙系统实例
        return new HUAWEI_HarmonyOS()
    }
    createHardWare() {
        // 提供小米硬件实例
        return new MiWare()
    }
}

// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用苹果的方式去操作硬件')
    }
}

class HUAWEI_HarmonyOS extends OS {
    controlHardWare() {
        console.log('我会用鸿蒙的方式去操作硬件')
    }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}

// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()

// 这是我的手机
const myPhone1 = new newStarFactory()
// 让它拥有操作系统
const myOS1 = myPhone1.createOS()
// 让它拥有硬件
const myHardWare1 = myPhone1.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS1.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare1.operateByOrder()

// 这是我的手机
const myPhone2 = new newStarFactory1()
// 让它拥有操作系统
const myOS2 = myPhone2.createOS()
// 让它拥有硬件
const myHardWare2 = myPhone2.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS2.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare2.operateByOrder()