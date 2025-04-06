import request from 'supertest';
import app from '../src/index';  
import UserModel from '../src/models/UserModel';
import sequelize from '../src/config/database'; 

beforeAll(async () => {
  await sequelize.authenticate(); 
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close(); 
});
describe('POST /login', () => {
  let userId: number;

  
  beforeAll(async () => {
    const user = await UserModel.create({
      name: 'Jimmy Novak',
      email: 'novak@gmail.com',
      password: 'DeanTeAmo23',  
      cpf: '12345678901',
    });
    userId = user.id;
  });

  afterAll(async () => {
    
    await UserModel.destroy({ where: { id: userId } });
  });

  it('should return 400 if email or password is missing', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      password: '',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email and password are required');
  });

  it('should return 404 if user is not found', async () => {
    const response = await request(app).post('/login').send({
      email: 'nonexistentuser@gmail.com',
      password: 'testpassword',
    });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should return 400 if password is incorrect', async () => {
    const response = await request(app).post('/login').send({
      email: 'novak@gmail.com',
      password: 'wrongpassword',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email or password are invalid');
  });

  it('should return 200 and a token if login is successful', async () => {
    const response = await request(app).post('/login').send({
      email: 'novak@gmail.com',
      password: 'DeanTeAmo23',  
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();
  });
});
