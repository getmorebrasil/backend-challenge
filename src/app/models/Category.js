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


export default Masculino