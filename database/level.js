let connection = require('./connection');

const Level={
    create: function(){
        connection.query('DROP TABLE Level');
        connection.query(
            'CREATE TABLE Level(' +
            'level integer not null,' +
            'xp integer not null,'+
            'constraint level Primary Key(level)'+
            ');');
    },

    init: function(){
        for (let i=1;i<20;i++){
            connection.query('INSERT INTO level SET ?',{level:i,xp:i*100},(err)=>{
                if(err)console.error(err);
            });
            console.log("level = "+i+" xp = "+i*100);
        }
    },
};
module.exports = Level;