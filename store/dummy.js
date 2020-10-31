const db = {}

function list (tabla) {
  return db[tabla];
}
function get (tabla, id) {
  let col = list(tabla);
  return col.find(item => item.id === id) || null;
}
function upsert (tabla, data) {
  //db[]
}
function remove (tabla, id) {}


module.exports = {
  list, get, upsert, remove
}