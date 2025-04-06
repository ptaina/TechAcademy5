import request from 'supertest';
import app from '../src/index'; 
import '../src/models/UserModel';
import sequelize from '../src/config/database'; 
import { createTestUser } from './helpers/createTestUser';
import { cpf } from 'faker-br';



beforeAll(async () => {
  await sequelize.authenticate(); 
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close(); 
});

describe('User API - Create User', () => {
  it('should create a user successfully', async () => {
    const fakeCpf: string = cpf.generate();

    const uniqueEmail = `dean${Date.now()}@gmail.com`;
  
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Dean Winchester',
        email: uniqueEmail,
        cpf: fakeCpf,
        password: 'minhaCaranga67'
      });
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user.name).toBe('Dean Winchester');
  });

  it('should return 400 if CPF is invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Dean Winchester',
        email: 'winchester@gmail.com',
        cpf: '123',
        password: 'minhaCaranga67'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid CPF format');
  });

  it('should return 400 if email or CPF already exists', async () => {
    await request(app).post('/users').send({
      name: 'Dean Winchester',
      email: 'dean1@gmail.com',
      cpf: '11111111111',
      password: 'ValidPass123'
    });

    const response = await request(app).post('/users').send({
      name: 'Sam Winchester',
      email: 'dean1@gmail.com',
      cpf: '11111111111',
      password: 'AnotherValid123'
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email or CPF already registered');
  });

  it('should return 400 if password is weak', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Weak User',
        email: 'weak@gmail.com',
        cpf: '98765432109',
        password: '123'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/Password must contain/);
  });
});

describe('User API - Update User', () => {
  let token: string;
  let userId: number;

  beforeEach(async () => {
    const user = await createTestUser();

    const loginResponse = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: 'DeanTeAmo23'
      });

    expect(loginResponse.status).toBe(200); 

    token = loginResponse.body.token;
    userId = loginResponse.body.user.id;
  });

  it('should update user successfully', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Castiel Novak',
        password: 'newPower456'
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully');
    expect(response.body.user.name).toBe('Castiel Novak');
  });

  it('should return 404 for non-existing user', async () => {
    const response = await request(app)
      .put('/users/9999')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Non Existent',
        password: 'whatever'
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should return 401 if token is not provided', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'No Token',
        password: 'nope'
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Access denied. No token');
  });

  it('should not allow email update', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'newemail@gmail.com'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email cannot be changed');
  });
});
