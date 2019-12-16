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
        if (req.params.id === undefined) {
            return res.json({
                log: allInstances
            })

        } else {
            const findInstance = allInstances.find((value) => {
                return value.id == req.params.id
            })
            return res.json({
                log: findInstance
            })
        }
    })
}


export default allCategoriesMiddleWare;