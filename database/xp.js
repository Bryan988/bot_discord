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
    farm:  async function(idUser,username,xp){
        if(!(await this.findUser(idUser))){
            try{
                await this.addUser(idUser,username);
            }
            catch(err) {
                console.error(err);
            }
        }
        connection.query('UPDATE Xp SET xp=xp + ? WHERE idUSer=?',[xp,idUser],(err)=>{
            if(err)throw err;
        });
    }


};
module.exports = Xp;
