const db = {
    'user': [
      { id: '1', name: 'Carlos'},
    ]
}

async function list (tabla) {
  return db[tabla];
}

async function get (tabla, id) {
  let col = await list(tabla);
  return col.find(item => item.id === id) || null;
}

async function upsert (tabla, data) {
  if( !db[tabla] ) {
    db[tabla] = [];
  }
  db[tabla].push(data);
  console.log(db);
  return data
}

async function query (tabla, q) {
  let col = await list(tabla);
  let key = Object.keys(q)[0];
  return col.find(item => q[key] === item[key]) || null
}

function remove (tabla, id) {
  return true;
}


module.exports = {
  list, get, upsert, remove, query
}