const TABLA = 'auth';
const auth = require('../../../auth');
const bcrypt = require('bcrypt');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function login(username, password){
      const data = await store.query(TABLA, {username: username});
      console.log('la data:', data);
      console.log('la data{}:', {...data});
      return bcrypt.compare(password, data.password)
          .then(sonIguales =>{
            if(sonIguales) {
              return auth.sign({...data});
            } else {
              throw new Error('Informacion invalida')
            }
          });        
    }

    async function upsert(data, isNew) {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 7);
        }

        return store.upsert(TABLA, authData, isNew);
    }

    return {
        upsert,
        login
    };
}