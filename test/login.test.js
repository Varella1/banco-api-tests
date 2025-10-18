const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')


describe( 'Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com o token em string quando usar credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');

            
        })

        it('Deve retornar erro 405 ao enviar requisição GET com credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            
            const resposta = await request(process.env.BASE_URL) 
              .get('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(405);
            expect(resposta.text).to.include("Método não permitido");
            


        })

        it('Deve retornar erro 405 ao enviar requisição PUT com credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            
            const resposta = await request(process.env.BASE_URL) 
              .put('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(405);
            expect(resposta.text).to.include("Método não permitido");
            
        })

        it('Deve retornar erro 405 ao enviar requisição DELETE com credenciais válidas', async () => {
            const bodyLogin = {...postLogin}
            
            const resposta = await request(process.env.BASE_URL) 
              .delete('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(405);
            expect(resposta.text).to.include("Método não permitido")

        })

        it('Deve retornar erro 401 ao fazer o login com senha incorreta', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.senha = 'senhaerrada123'
            
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(401);
            expect(resposta.text).to.include("Usuário ou senha inválidos")
        
        })

         it('Deve retornar erro 401 ao fazer o login com usuario inexistente', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.username = 'usuarioinexistente123'
            
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(401);
            expect(resposta.text).to.include("Usuário ou senha inválidos")
        
        })

        it('Deve retornar erro 401 ao fazer o login com credencias inválidas', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.username = 'julio.lima@'
            bodyLogin.senha = '654321'
            
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(401);
            expect(resposta.text).to.include("Usuário ou senha inválidos")
        
        })

        it('Deve retornar erro 400 ao fazer o login com senha vazia', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.senha = ''
            
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(400);
            expect(resposta.text).to.include("Usuário e senha são obrigatórios")
        
        })

        it('Deve retornar erro 400 ao fazer o login com usuario e senha vazia', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.username = ''
            bodyLogin.senha = ''
            
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(bodyLogin)
           
            expect(resposta.status).to.equal(400);
            expect(resposta.text).to.include("Usuário e senha são obrigatórios")

         
        }) 

        it('Deve retornar 200 e um token válido ao enviar payload completo', async () => {
            const payloadCompleto = {
                "username": "julio.lima",
                "senha": "123456"
            } 
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(payloadCompleto)
           
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('token')
            expect(resposta.body.token).to.be.a('string')
        })

        it('Deve ignorar e retornar 200 ao enviar payload com campo extra', async () => {
            const payloadCampoExtra = {
                  "username": "julio.lima",
                  "senha": "123456",
                  "campoExtra": "valorExtra"
                 } 
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(payloadCampoExtra)
           
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('token')
            expect(resposta.body.token).to.be.a('string')
        })

        it('Deve retornar 400 ao enviar payload com tipos incorretos', async () => {
            const tiposIncorretos = {
                  "username": 12345,
                  "senha": true
                } 
            const resposta = await request(process.env.BASE_URL) 
              .post('/login')
              .set('Content-Type', 'application/json')
              .send(tiposIncorretos)
           
            expect(resposta.status).to.equal(400)
        
        })

   })  

})
