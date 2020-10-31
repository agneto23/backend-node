const store = require('../../../store/dummy.js');

const TABLA = 'user'
function list() {
  return store.list(TABLA)
}

module.exports = {list}