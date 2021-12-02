
let options={
    protocol: "mysql",
    host: 'localhost',
    port: 3306,
    user     : "games",
    password : "test123",
    database : 'retropelit'
}

let mysql=require("mysql");
let pool=mysql.createPool(options);

function query(queryString){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,conn){
            if (err) reject(err);
            else{
                conn.query(queryString,function(err,rows,fields){
                    conn.release();
                    if (err) reject(err);
                    else resolve(rows);
                });
            }
        });
        
    });
}

function paramQuery(queryString,params){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,conn){
            if (err) reject(err);
            else{
                conn.query(queryString,params,function(err,rows,fields){
                    conn.release();
                    if (err) reject(err);
                    else resolve(rows);
                });
            }
        });
        
    });
}

function getById(table,id){
    let queryString='SELECT * FROM '+table+' WHERE id=?';
    let params=[id];
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,conn){
            if (err) reject(err);
            else{
                conn.query(queryString,params,function(err,rows,fields){
                    conn.release();
                    if (err) reject(err);
                    else {
                        if (!rows.length) reject({error:'Not found'})
                        else resolve(rows[0]);
                    }
                });
            }
        });
        
    });
}

function cleanup(){
    pool.end(function(err){
        if (err) console.log(err);
    })
}

module.exports={query,paramQuery,cleanup,getById};