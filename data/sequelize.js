const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const TasksModel = require('./models/tasks');

const sequelize = new Sequelize('todo','postgres','postgres',{
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});

const User = UserModel(sequelize, Sequelize);
const Tasks = TasksModel (sequelize, Sequelize);


// Tasks.belongTo(User);


// sequelize.sync({force: true})
//     .then(()=>{
//         console.log(`Database & tables created!`)
//     });

    module.exports = {
        User,
        Tasks,
        

    }