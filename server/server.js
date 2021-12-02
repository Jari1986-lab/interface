const serverPort=9000, webDir="../wwwroot";

let express = require('express');

let app = express();


app.use(express.static(webDir));

let bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/api/pelit',async function(req,resp){
    console.log("Kysely");
    resp.json(await daoGetAll()); 
});

app.get('/api/asiakkaat',async function(req,resp){
    console.log("toinen Kysely");
    resp.json(await daoGetAllAsiakkaat()); 
});

const mysql=require('./mysqlhelper');

function daoGetAll(){
    return new Promise(resolve => {
        mysql.query('SELECT * from pelit').then(pelit => resolve(pelit));
    })
}

function daoGetAllAsiakkaat(){
    return new Promise(resolve	=> {
        mysql.query('SELECT * from asiakkaat').then(asiakkaat => resolve(asiakkaat));
    })
}


app.post('/api/pelit',async function(req,resp){
    let a=req.body;
    //let err=dao.verify(a);

    let err=0;
    if (err){
        resp.status(500).json({error:err});
    }
    else{
        let pelit=await daoCreate(a);
        resp.json(pelit);
    }
});

function daoCreate(pelit){
    return new Promise(async (resolve,reject)=>{
        let q=`INSERT INTO pelit SET ?`;
        let info=await mysql.paramQuery(q,pelit);
        let bk=await daoGet(info.insertId);
        resolve(bk);
    });
}

function daoGet(id){
    return mysql.getById('pelit',id);
        
}

function deletepelit(id){
    let q=`DELETE pelit WHERE id=?`;
    return ms.paramQuery(q,[id]);
}


app.listen(serverPort);
console.log('Server listening on http://localhost:'+serverPort);
console.log('Distributing site from: '+webDir);