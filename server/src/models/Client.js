const {Model, DataTypes } =require('sequelize');

class Client extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            number: DataTypes.INTEGER,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            country: DataTypes.STRING,
            cep: DataTypes.INTEGER,
        })
    }

}

module.exports = Client;