let connection = require('./connection');
let Discord=require("discord.js");
const Xp={
    create: function(){
        connection.query('DROP TABLE Xp');
        connection.query('CREATE TABLE Xp(' +
            'idUser integer not null,' +
            'username varchar(255) not null,'+
            'level integer not null DEFAULT 1,'+
            'xp integer not null DEFAULT 0,' +
            'constraint id Primary Key(idUser)'+
            'constraint idlevel FOREIGN KEY(level);');
    },
    findUser:  function(idUser){
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM Xp WHERE idUser=?',[idUser],(err,results)=> {
                if(err)reject(err);
                resolve((results[0] !== undefined));
            });
        });
    },
    addUser : async function(idUser,username){
        if(!(await this.findUser(idUser))){
            connection.query('INSERT INTO Xp SET ?',{idUser:idUser,username:username},(err)=>{
                if(err)throw err;
                console.log("user created");
            });
        }
    },
    farm:  async function(idUser,username,xp,message){
        if(!(await this.findUser(idUser))){
            try{
                await this.addUser(idUser,username);
            }
            catch(err) {
                console.error(err);
            }
        }
        await new Promise((resolve,reject) =>
        {
            connection.query('UPDATE Xp SET xp=xp + ? WHERE idUser=?', [xp, idUser], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
        try {
            let result=await this.checklevel(idUser);
            console.log(result);
            if(result[0]){
                connection.query("UPDATE XP SET level=level+1 WHERE idUser=?",[idUser],(err)=>{
                    if(err)throw err;
                    let level=parseInt(result[1])+1;
                    return message.reply("You just advanced to level "+level +" ! ");
                })
            }
        }catch (e) {
            console.error(e);
        }
    },
    checklevel: function(idUser){
        return new Promise(((resolve, reject) => {
            connection.query(
                "SELECT x.xp,x.level,l.xp as base FROM Xp x JOIN Level l ON x.level=l.level WHERE idUser=?",
                [idUser],
                (err,result)=>{
                    if(err)reject(err);

                    resolve([(result[0].xp>result[0].base),result[0].level]);
                }
            );
        }))
    },
    getRank: function(idUser){
        return new Promise((resolve, reject) => {
            let rank=1;
            let obj={};
            connection.query('SELECT x.idUser,x.xp,x.level,l.xp AS base FROM Xp x JOIN Level l ON x.level=l.level ORDER BY x.xp DESC',(err,result)=>{
                if(err)reject(err);
                for(let row of result){
                   if(row.idUser==idUser){
                       console.log("entered");
                        obj.realxp=row.xp;
                        obj.basexp=row.base;
                        obj.level=row.level;
                        obj.rank=rank;
                        resolve(obj);
                    }

                    rank++;
                }
                if(obj.realxp===undefined){
                    reject("No user found");
                }

            })
        })
    }


};
module.exports = Xp;
