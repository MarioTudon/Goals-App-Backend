function buildUpdateQuery( action,table, id, data) {
    /*const allowedKeys = {
        nombre: true,
        edad: false,
        id: false
    };*/
    const keys = Object.keys(data)//.filter(key => allowedKeys[key])
    const values = keys.map(key => data[key])
    const setClause = keys.map(key => `${key} = ?`).join(', ')


    const sql = `${action} ${table} SET ${setClause} WHERE id = ?`
    console.log(sql)
    return { sql, params: [...values, id] }
}

function buildInsertQuery(table, id, data) {
    const ommitedKeys = {
        count: true,
        id: true
    }
    const keys = Object.keys(data).filter(key => ommitedKeys[key] === undefined)
    const values = keys.map(key => data[key])
    const setClause = keys.map(() => `?`).join(', ')
    const sql = `INSERT INTO ${table} (${keys}, count, id) VALUES (${setClause}, ?, ?)`
    const params = [...values,0 , id]
    console.log(sql)
    console.log(params)
    return { sql, params }
}


buildInsertQuery('test',2,{goal:"Hola mundo", count: 0, targer: 20})