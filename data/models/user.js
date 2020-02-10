module.exports = (Sequelize, type) => {
    const User = Sequelize.define('User', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING
    }, {
        tableName: 'user',
        timestamps: false,
    });

    return User;


};