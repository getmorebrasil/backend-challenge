import {TestManager} from "../TestManager";
import * as path from 'path';

const 
    chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect;

chai.use(chaihttp);

let testManager = null;

describe('MainRest Test', () => {
   before((done) => {
       testManager = new TestManager(done);
   });


   describe('Categorias', () => {

       describe('Ler', () => {

           it('Por codigo existente', (done) => {
               chai.request('http://localhost:2051')
                   .get('/api/categories/1')
                   .end((err, res) => {
                       expect(res.status).to.be.eqls(200);
                       expect(res.body).to.be.instanceOf(Array);
                       expect(res.body[0]).to.include.keys('id', 'name', 'code', 'childrenIds', 'childrenCodes');
                       expect(res.body[0].code).to.be.eqls(1);

                       done();
                   });
           });

           it('Por codigo inexistente', (done) => {
               chai.request('http://localhost:2051')
                   .get('/api/categories/30')
                   .end((err, res) => {
                       expect(err.status).to.be.eqls(400);
                       expect(err.response.body.success).to.be.false;
                       expect(err.response.body.error).to.be.instanceOf(Object);
                       expect(err.response.body.error).to.include.all.keys('buttons', 'description', 'title', 'type');
                       expect(err.response.body.error.type).to.be.eqls('nonexistentCategory');

                       done();
                   });
           });

           it('ALL', (done) => {
               chai.request('http://localhost:2051')
                   .get('/api/categories')
                   .end((err, res) => {
                       expect(res.status).to.be.eqls(200);
                       expect(res.body.length).to.be.greaterThan(0);
                       expect(res.body[0]).to.include.keys('name', 'id', 'code', 'childrenIds', 'childrenCodes');
                       expect(res.body[0].childrenIds.length).to.be.greaterThan(0);
                       expect(res.body[0].childrenIds[0]).to.include.keys
                       ('name', 'id', 'code', 'childrenIds', 'childrenCodes');

                       done();
                   });
           });

       });

       describe('Criar', () => {

           it('Com Parâmetros Faltando', (done) => {
               const category = {
                   name: 'Eletrodomesticos',
               };
               chai.request('http://localhost:2051')
                   .post('/api/categories')
                   .send(category)
                   .end((err, res) => {
                       expect(res.status).to.be.eqls(400);
                       expect(res.body.error).to.include.keys('code');
                       expect(res.body.error.code).to.include.all.keys('buttons', 'description', 'title', 'type');
                       expect(res.body.error.code.type).to.be.eqls('code.REQUIRED');

                       done();
                   });
           });

           it('Com Código já registrado', (done) => {
               const category = {
                   name: 'Eletrodomesticos',
                   code: 1
               };
               chai.request('http://localhost:2051')
                   .post('/api/categories')
                   .send(category)
                   .end((err, res) => {
                       expect(res.status).to.be.eqls(400);
                       expect(res.body.error).to.include.keys('code');
                       expect(res.body.error.code).to.include.all.keys('buttons', 'description', 'title', 'type');
                       expect(res.body.error.code.type).to.be.eqls('mongoCode11000');

                       done();
                   });
           });

           it('Com Categoria Filha não existente', (done) => {
               const category = {
                   name: 'Eletrodomesticos',
                   code: 3,
                   childrenCodes: [15]
               };
               chai.request('http://localhost:2051')
                   .post('/api/categories')
                   .send(category)
                   .end((err, res) => {
                       //todo expects
                       expect(res.status).to.be.eqls(400);
                       expect(res.body.error).to.include.keys('code');
                       expect(res.body.error.code).to.include.all.keys('buttons', 'description', 'title', 'type');
                       expect(res.body.error.code.type).to.be.eqls('mongoCode11000');

                       done();
                   });
           });

           it('Com Parâmetros corretos', () => {
                //todo
           });

       })

   });


});