import Categories from '../models/Category';


const allCategoriesMiddleWare = async function (req, res) {
    const allInstances = []

    await Promise.all(Categories.map((database) => {
        return database.findAll().then((entity) => {
            entity.map((instance) => {
                return allInstances.push(instance['dataValues'])
            })
        })
    })).then(() => {
        return res.json({
            log: allInstances
        })
    })
}

export default allCategoriesMiddleWare;