/**
 *
 * 金额增加逗号,每三位数
 */

export const MoneyToThousands=(num)=>{
  if(num){
    if(Number(num) == 0 ){
      return num;
    }else if(Number(num) < 0){
      //console.log('0-0-0-0-0',num,Number(num))
      num=Math.abs(Number(num))
      num = num.toString().replace(/\$|\,/g,'');
      //如果num不是数字，则将num置0，并返回
      if(''==num || isNaN(num)){return num;}
      //如果num是负数，则获取她的符号
      var sign = num.indexOf("-")> 0 ? '-' : '';
      //如果存在小数点，则获取数字的小数部分
      var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
      cents = cents.length>1 ? cents : '' ;//注意：这里如果是使用change方法不断的调用，小数是输入不了的
      //获取数字的整数数部分
      num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
      //如果没有小数点，整数部分不能以0开头
      if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return num;}}
      //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
      else{if(num.length>1 && '0' == num.substr(0,1)){return num;}}
      //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
      /*
       也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
       字符串长度为0/1/2/3时都不用添加
       字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
       */
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      {
        num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
      }
      //将数据（符号、整数部分、小数部分）整体组合返回
      return ('-'+sign + num + cents);
    }
    else{
      //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
      num = num.toString().replace(/\$|\,/g,'');
      //如果num不是数字，则将num置0，并返回
      if(''==num || isNaN(num)){return num;}
      //如果num是负数，则获取她的符号
      var sign = num.indexOf("-")> 0 ? '-' : '';
      //如果存在小数点，则获取数字的小数部分
      var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
      cents = cents.length>1 ? cents : '' ;//注意：这里如果是使用change方法不断的调用，小数是输入不了的
      //获取数字的整数数部分
      num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
      //如果没有小数点，整数部分不能以0开头
      if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return num;}}
      //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
      else{if(num.length>1 && '0' == num.substr(0,1)){return num;}}
      //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
      /*
       也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
       字符串长度为0/1/2/3时都不用添加
       字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
       */
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
      {
        num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
      }
      //将数据（符号、整数部分、小数部分）整体组合返回
      return (sign + num + cents);
    }
  }else{
    return num;
  }


};

/**
 * 格式化money
 * s为要格式化的money
 * n为小数位数
 */
export function fmoney(s, n){
    if(s==='')
        return s;
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for(let i = 0; i < l.length; i ++ ) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    if(n==0){
        return t.split("").reverse().join("")
    }else
        return t.split("").reverse().join("") + "." + r;
}

/**
 * 格式化money  不四舍五入
 * s为要格式化的money
 * n为小数位数
 */
export function fmoneyNoRound(value, count=2){


    if(!value)
        return '0.00'
    if(count==0){
        return parseInt(value).toString()
    }
    const [integer, decimal = '0'.repeat(count)] = value.toString().split('.');

    // console.log('fmoneyfmoney',value,count,integer,decimal,(decimal + '0'.repeat(count - 1)).substr(0, count))
    // 加0是为了第二种情况
    return integer + '.' + (decimal + '0'.repeat(count - 1)).substr(0, count);
}
//小数点超出n位四舍五入
export function fmoneyRound(s, n){
    if(s==='')
        return s;
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for(let i = 0; i < l.length; i ++ ) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
    }
    if(n==0){
        return t.split("").reverse().join("")
    }else
        return t.split("").reverse().join("") + "." + r;
}
/**
 * 大数字转换，将大额数字转换为万、千万、亿等
 * @param value 数字值
 */
export function bigNumberTransform (value) {
    const newValue = ['', '', '']
    let fr = 1000
    let num = 3
    let text1 = ''
    let fm = 1
    while (value / fr >= 1) {
        fr *= 10
        num += 1
        // console.log('数字', value / fr, 'num:', num)
    }
    if (num <= 4) { // 千
        newValue[0] = parseInt(value / 1000) + ''
        newValue[1] = '千'
    } else if (num <= 8) { // 万
        text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
        // tslint:disable-next-line:no-shadowed-variable
        fm = text1 === '万' ? 10000 : 10000000
        if (value % fm === 0) {
            newValue[0] = parseInt(value / fm) + ''
        } else {
            newValue[0] =fmoneyNoRound(parseFloat(value / fm)) + ''
        }
        newValue[1] = text1
    } else if (num <= 16) { // 亿
        text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
        text1 = (num - 8) / 4 > 1 ? '万亿' : text1
        text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
        // tslint:disable-next-line:no-shadowed-variable
        fm = 1
        if (text1 === '亿') {
            fm = 100000000
        } else if (text1 === '千亿') {
            fm = 100000000000
        } else if (text1 === '万亿') {
            fm = 1000000000000
        } else if (text1 === '千万亿') {
            fm = 1000000000000000
        }
        if (value % fm === 0) {
            newValue[0] = parseInt(value / fm) + ''
        } else {
            newValue[0] =fmoneyNoRound(parseFloat(value / fm)) + ''
        }
        newValue[1] = text1
    }
    if (value < 1000) {
        newValue[0] = value + ''
        newValue[1] = ''
    }
    return newValue.join('')
}

//判断有几位小数
export function countDecimalPlaces(num) {
  if (typeof num !== 'number') {
    return 0;
  }

  // 使用正则表达式匹配小数部分
  const decimalPart = num.toString().split('.')[1];

  // 如果没有小数部分，返回 0
  if (!decimalPart) {
    return 0;
  }

  // 返回小数部分的位数
  return decimalPart.length;
}
