import * as Yup from 'yup';
import Categories from '../models/Category'

class CategoryController {
  async masc(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      childrenIds: Yup.array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    };

    try { const masculino = await Categories.create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }


  async fem(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      childrenIds: Yup.array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    };

    try { const feminino = await Categories.create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }
}


export default new CategoryController();
