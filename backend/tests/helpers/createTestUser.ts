
import bcrypt from 'bcryptjs';
import UserModel from '../../src/models/UserModel';
import { cpf } from 'faker-br'; 

export const createTestUser = async () => {
  try {
    
    const randomCpf = cpf.generate();

  
    const uniqueEmail = `user${Date.now()}@example.com`;

   
    const hashedPassword = await bcrypt.hash('DeanTeAmo23', 10);

    
    await UserModel.destroy({ where: { cpf: randomCpf } });


    const user = await UserModel.create({
      name: 'Jimmy Novak',
      email: uniqueEmail,
      password: hashedPassword,
      cpf: randomCpf,
    });

    return user;
  } catch (err) {
    console.error('Erro ao criar usuário de teste:', err);
    throw err;
  }
};
