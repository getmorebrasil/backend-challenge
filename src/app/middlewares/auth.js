import jwt from 'jsonwebtoken';

import { promisify } from 'util';

import authConfig from '../../config/auth'

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    };

    const [, token] = authHeader.split(' ');


    /* promisify é uma lib que vem junto no node
    para transformar funções que retornam um callback em funções
    que se adptem ao async wait
    
    dentro do promisify(x) se passa o metodo que ele quer
    promisificar (jwt.verify), agora ele vai retornar uma outra função
    sem precisar passar o callback, só os restante dos parametros
    
    e como ele retorna uma função, já da pra chamar ela logo em seguida 
    
    */
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token is  not valid' })
    }

}