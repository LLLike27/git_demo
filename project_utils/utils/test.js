// function getUId(letterSize = 8, numberSize = 6){
//     let uId =
//       getRandomLetter(letterSize) +
//       (letterSize > 0 ? "-" : "") +
//       getRandomNumber(numberSize);
//     return uId;
//   };
  
//   function getRandomLetter(size = 8) {
//     let res = "";
//     for (let i = 0; i < size; i++) {
//       let ind = Math.floor(Math.random() * 26);
//       res += String.fromCharCode(ind + 65);
//     }
//     return res;
//   };

//   function getRandomNumber (size = 6) {
//     let res = Math.random();
//     while (size--) res *= 10;
//     return Math.ceil(res);
//   };

// console.log(  getUId(8,6));

class UUIDGenerator {
    static generate() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
  
  // 使用方法
  const uuid = UUIDGenerator.generate();
  console.log(uuid);  // 输出一个类似 'e8ae10a3-5f61-4c25-9c6b-66a50fb16f28' 的UUID
  

  function createUuid() {
    let d = new Date().getTime();
    // if (window.performance && typeof window.performance.now === 'function') {
    //   d += performance.now(); //use high-precision timer if available
    // }
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
    // localStorage.setItem('uuid', uuid);
    return uuid;
  }

  console.log(createUuid());