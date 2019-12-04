import * as Yup from 'yup';
import state from '../models/Models.js';

//START MODEL - Model simulates database requisitions and responses states



//START Categories Class - This class will define functions for routes
//defined in src/routes.js
class Categories {
  //START Category/moda/masculino FUNCTION REST
  async masculino(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: Yup
        .array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    };

    const doc = await req.body;

    try {
      const obj = state.insertdoc(doc)
      console.log(state.docs)
    }

    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }

    return res.json({
      ok: true,
    });
  }
  //END Category/moda/masculino FUNCTION REST ------------


  //START Category/moda/feminino FUNCTION REST ------------
  async feminino(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: Yup
        .array()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    }

    const doc = await req.body;

    try {
      const obj = state.insertdoc(doc)
      console.log(state.docs)
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }

    return res.json({
      ok: true
    });
  }
  //END Category/moda/feminino --------------------------


  //START MODA Masculina
  async modaMasculina(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: Yup
        .array().of(Yup.number())
        .min(1)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    }

    const subcollection = await req.body;

    try {
      const obj = state.insertsubcols(subcollection)
      console.log(state.subcols)
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }


    return res.json({
      ok: true
    });
  }
  //END MODA Masculina-----------------------------------------

  //START MODAFEMININA
  async modaFeminina(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: Yup
        .array().of(Yup.number())
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    }

    const subcollection = await req.body;

    try {
      const obj = state.insertsubcols(subcollection)
      console.log(state.subcols)
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }



    return res.json({
      ok: true
    });
  }
  //END MODAFEMININA---------------------------------

  //START Moda
  async moda(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: Yup
        .array().of(Yup.number())
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    }

    const collection = await req.body;

    try {
      const obj = state.insertcolls(collection)
      console.log(state.colls)
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }

    return res.json({
      ok: true
    });
  }
  //END Moda----------------------------

  //START getCategories
  async getCategories(req, res) {




    return res.json({
      ok: true
    });
  }
  //END Moda----------------------------
}


export default new Categories();
