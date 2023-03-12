class linkList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
  append(value) {
    const node = new linkList(value);
    let head = this;
    while (head.next) {
      head = head.next;
    }
    head.next = node;
  }
  removeItem(value) {
    let head = this;
    let pre = null;
    if (head === null) return null;
    while (head) {
      if (head.value === value) {
        if (pre === null) {
          head = head.next;
          this.next = head.next;
          this.value = head.value;
        } else {
          pre.next = head.next;
        }
        return;
      }
      pre = head;
      head = head.next;
    }
  }
  toString() {
    let head = this;
    let res = "";
    while (head) {
      res = `${res ? `${res} ->` : ""} ${head.value}`;
      head = head.next;
    }
    console.log(res);
  }
}

let links = new linkList(1);
links.append(3);
links.append(5);
links.append(4);
links.append(2);
console.log(links.toString());
links.removeItem(1);
console.log(links.toString());
