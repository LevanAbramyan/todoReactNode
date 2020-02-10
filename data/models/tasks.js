module.exports = (Sequelize, type) => {
    const Tasks = Sequelize.define('Tasks', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: type.STRING,
        'user_id': {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        'status': {
            type: type.BOOLEAN,
            allowNull: false,
        }
        
    }, {
        tableName: 'tasks',
        timestamps: false,
    });


    return Tasks;

};