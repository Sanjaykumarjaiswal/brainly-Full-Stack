"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "akljdanvjjci;uqenw1342r7834tybjhnvrityogu3feqd";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor((Math.random()) * length)];
    }
    return ans;
}
