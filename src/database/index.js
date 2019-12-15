import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Category from '../app/models/Category';

const models = Category

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection))
    }
}

export default new Database();