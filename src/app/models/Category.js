import Sequelize, { Model } from 'sequelize';

class Masculino extends Model {
    static modelId = 0
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    len: [300, 399]
                },
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
    static modelId = 1
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    len: [300, 399]
                },
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
    static modelId = 2
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        len: [200, 299]
                    },
                    primaryKey: true
                },
                name: Sequelize.STRING,
                children_ids: Sequelize.ARRAY(Sequelize.INTEGER)
            },
            {
                sequelize, freezeTableName: true
            }
        );
    }
}

class Modafem extends Model {
    static modelId = 3
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    len: [200, 299]
                },
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
    static modelId = 4
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    len: [1, 199]
                },
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