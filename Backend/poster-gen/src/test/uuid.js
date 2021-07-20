// const { v5: UUIDv5, v1: UUIDv1 } = require("uuid");
// const MY_NAMESPACE = UUIDv5("www.ridd.xyz", UUIDv5.DNS);
// console.log(UUIDv5("admin", MY_NAMESPACE));
// let a = UUIDv1()
// console.log(typeof a);
// console.log(typeof a.toString());

let arr = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];

let obj = arr.find(o => o.name === 'string 1');

console.log(obj);