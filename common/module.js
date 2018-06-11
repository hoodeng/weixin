function moduleTest(i1, j1) {
  let i = i1;
  let j = j1;

  

  return {
    add: function () {
      return i + j;
    },
    sub: function () {
      return i - j;
    },
    mul: function () {
      return i * j;
    },
    div: function () {
      return i / j;
    }
  }
}

module.exports = moduleTest(10,5)