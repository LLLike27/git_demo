var str = "abc123def";
var patt1 = /[0-9]+/;
console.log(patt1.test(str));
console.log(str.match(patt1)[0]);