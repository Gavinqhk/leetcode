function myInstanceof (left, right) {
    if(typeof left !== 'object' || left === null) return false
    let proto = Object.getPrototypeOf(left)
    while(true) {
        if(proto ===  null) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

const str = [1,2,3]
function P () {
    this.name = "p"
}
const p = new P()
console.log(myInstanceof(p, Object))


const a = {
    value: 0,
    valueOf: function () {
        this.value ++
        return this.value
    }
}

console.log(a==1 && a==2)