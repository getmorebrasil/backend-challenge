/* Yup é uma lib que injeta validações dentro dos nossos
req.bodys, ele cria validações para o json
emque é posto regras para o cliente quando ele for 
enviar uma requisição

o "*" as Yup para importar Yup, quer dizer que
é pra importar todo o documento, e tudo que estiver nele
poderá ser acessível nesse script*/

import * as Yup from 'yup'

import User from "../models/User";

class UserController {
  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()

    });
    /* aqui ele receberá o nosso req.body (requisição do cliente)
    e "isValid" é para verificar se o nosso req.body atende a todas
    as validações postas acima 
    
    o "isValid é asincrono, por isso ele precisa receber await*/

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'creation failed' })
    }

    const userExists = await User.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json({ error: "User already exists." })
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }
  async update(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field),

      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" })
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" })
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();
