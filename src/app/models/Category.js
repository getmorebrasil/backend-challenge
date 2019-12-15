import Sequelize, { Model } from 'sequelize';

class Masculino extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                children_ids: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            {
                sequelize, freezeTableName: true
            }
        )
    }
}

class Feminino extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                children_ids: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            {
                sequelize, freezeTableName: true
            }
        )
    }
}

class Modamasc extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                children_ids: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            {
                sequelize, freezeTableName: true
            }
        )
    }
}

class Modafem extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                children_ids: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            {
                sequelize, freezeTableName: true
            }
        )
    }
}

class Moda extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                children_ids: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            {
                sequelize, freezeTableName: true
            }
        )
    }
}





export default [Masculino, Feminino, Modamasc, Modafem, Moda]