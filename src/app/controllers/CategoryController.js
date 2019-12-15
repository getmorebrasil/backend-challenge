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

    try { const masculino = await Categories[0].create(req.body); }
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

    try { const feminino = await Categories[1].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }
  async modamasc(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      childrenIds: Yup.array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    };

    try { const masculino = await Categories[2].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }

  async modafem(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      childrenIds: Yup.array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    };

    try { const masculino = await Categories[3].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }

  async moda(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      childrenIds: Yup.array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    };

    try { const masculino = await Categories[4].create(req.body); }
    catch (err) { console.log(err) }

    return res.json({
      ok: true,
    });
  }

}




export default new CategoryController();
