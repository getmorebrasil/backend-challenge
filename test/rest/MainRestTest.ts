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

       it('Ler todas', (done) => {
           chai.request('http://localhost:1337')
               .get('/api/categories')
               .send(get)
       });
   });


});