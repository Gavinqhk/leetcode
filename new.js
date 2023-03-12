function myNew() {
  const Constructor = Array.prototype.shift.call(arguments);
  const obj = new Object();
  obj._proto_ = Constructor.prototype;

  const resp = Constructor.apply(obj, [].slice.call(arguments));

  return typeof resp === "object" ? resp : obj;
}
