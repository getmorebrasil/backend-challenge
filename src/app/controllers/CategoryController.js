import * as Yup from 'yup';
import Categories from '../models/Category'




class CategoryController {
  async masc(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(299).lessThan(400).required(),
      name: Yup.string().required(),
      children_ids: Yup.array()
    });

    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }

    try { const masc = await Categories[0].create(req.body); }
    catch (err) { return res.status(400).json({ error: err }) }

    return res.json({
      ok: true,
    });
  }


  async fem(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(299).lessThan(400).required(),
      name: Yup.string().required(),
      children_ids: Yup.array()
    });

    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }

    try { const feminino = await Categories[1].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }
  async modamasc(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(199).lessThan(300).required(),
      name: Yup.string().required(),
      children_ids: Yup.array().required().min(1)
    });


    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }

    const { children_ids } = req.body;

    //check if childrens exists
    const hasValidChildren = await Categories[0].findAll({
      where: {
        id: children_ids
      }
    })

    if (hasValidChildren.length !== children_ids.length) {
      return res.status(401).json({
        ok: false,
        error: "InvalidCategories"
      })
    }

    try { const modamasc = await Categories[2].create(req.body) }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }

  async modafem(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(199).lessThan(300).required(),
      name: Yup.string().required(),
      children_ids: Yup.array().required().min(1)
    });


    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }

    const { children_ids } = req.body;


    //check if childrens exists
    const hasValidChildren = await Categories[1].findAll({
      where: {
        id: children_ids
      }
    })

    console.log(hasValidChildren.length, children_ids.length)

    if (hasValidChildren.length !== children_ids.length) {
      return res.status(401).json({
        ok: false,
        error: "InvalidCategories"
      })
    }

    try { const modafem = await Categories[3].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }

  async moda(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().moreThan(0).lessThan(200).required(),
      name: Yup.string().required(),
      children_ids: Yup.array().required().min(1)
    });


    if ((await schema.isValid(req.body))) {
      console.log('registered')
    } else {
      return await schema
        .validate(req.body)
        .catch((err) => {
          return res.status(400).json({ error: err.errors })
        }
        )
    }

    const { children_ids } = req.body;
    //check if childrens exists
    const hasValidChildren_1 = await Categories[2].findAll({
      where: {
        id: children_ids
      }
    })

    const hasValidChildren_2 = await Categories[3].findAll({
      where: {
        id: children_ids
      }
    })



    if ((hasValidChildren_1.length + hasValidChildren_2.length) !== children_ids.length) {
      return res.status(401).json({
        ok: false,
        error: "InvalidCategories"
      })
    }

    try { const moda = await Categories[4].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }

}




export default new CategoryController();
