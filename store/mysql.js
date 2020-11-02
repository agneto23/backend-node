const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection;

function handleCon() {
  connection = mysql .createConnection(dbConfig);

  connection.connect(err=>{
    if(err){
      console.log('[ db err ]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('[ db connected ]');
    }
  })

  connection.on('error', err => {
    console.log('[bd err]', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla}`, (err, data) => {
      if(err) return reject(error);
      resolve(data);
    })
  });
}

function get(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE id=${id} `, (err, data) => {
      if(err) return reject(error);
      resolve(data);
    })
  });
}
function insert(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ? `, data, (err, result) => {
      if(err) return reject(error);
      resolve(result);
    })
  });
}

function update(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${tabla} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if(err) return reject(error);
      resolve(result);
    })
  });
}

function upsert (table, data, isNew) {
  console.log(data);
  if(isNew) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
}

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
      console.log(result);
      if(err) return reject(error);
      resolve(result[0] || null);
    })
  });
}

module.exports = {
  list,
  get,
  upsert,
  query
}