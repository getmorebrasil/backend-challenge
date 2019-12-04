import * as Yup from 'yup';

//START MODEL - Model simulates database requisitions and responses states
const Model = {
  collections: [
    {
      id: 1,
      name: 'Moda',
      childrenIds: [
        {
          id: 100,
          name: 'masculino',
          childrenIds: [
            {
              id: 200,
              name: 'T-shirt SEXTOU',
              childrenIds: []
            }
          ]
        },
        {
          id: 101,
          name: 'feminino',
          childrenIds: [
            {
              id: 201,
              name: 'T-shirt Contatinho',
              childrenIds: []
            }
          ]
        }
      ]
    },
  ],
}
// Model.collections[0].childrenIds[x]
//x = 0 MASC
//x = 1 FEM
const modaMasc = Model.collections[0].childrenIds[0].childrenIds
const modaFem = Model.collections[0].childrenIds[1].childrenIds
const moda = Model.collections[0]
const category = Model.collections

const allReqs = []

//END MODEL ----------------------------------------------------------------



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

    const thisMascPiece = await req.body;

    try {
      modaMasc.push(thisMascPiece);
      allReqs.push(this.MascPiece);
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }

    return res.json({
      ok: true
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

    const thisFemPiece = await req.body;

    try {
      modaFem.push(thisFemPiece);
      allReqs.push(this.FemPiece);
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


  //START MODA
  async moda(req, res) {

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

    const thisModa = await req.body;

    try {
      moda.push(thisModa);
      allReqs.push(thisModa);
    }
    catch (err) {
      console.log(err);
      return res.status(400).json({ error: 'something goes wrong' })
    }


    return res.json({
      ok: true
    });
  }
  //END MODA -----------------------------------------

  //START Categories 
  async category(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      childrenIds: Yup
        .array().of(Yup.number())
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    }



    return res.json({
      ok: true
    });
  }
  //END Categories

}


export default new Categories();
