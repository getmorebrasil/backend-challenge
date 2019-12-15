import * as Yup from 'yup';
import state from '../models/Models.ts';


//START Categories Class - This class will define functions for routes
//defined in src/routes.js
class Categories {
  //START Category/moda/masculino FUNCTION REST
  async postCategory(req, res) {

    const schema = Yup.object().shape({
      //3° CATEGORY LAYER
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: object({
        id: Yup.number().required(),
        name: Yup.string().required(),
      })
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



  //END Moda----------------------------
}


export default new Categories();
