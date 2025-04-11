# 🩺 Consult - Sistema de Gerenciamento de Consultas Médicas

Projeto desenvolvido por **Mariana** e **Tainá** como parte do módulo final do programa **Tech Academy 5**.

## 📘 Descrição

O **Consult** é uma aplicação web desenvolvida com o objetivo de facilitar o gerenciamento de consultas médicas. A plataforma permite o cadastro e autenticação de usuários, bem como o gerenciamento de pacientes, médicos e agendamentos.

O foco do projeto é aplicar conceitos de desenvolvimento fullstack com boas práticas, componentização, autenticação segura e uso de TypeScript.

---

## 🎯 Funcionalidades

### 🔐 Autenticação
- Login com e-mail e senha
- Validação de e-mail com regex
- Armazenamento seguro da senha (backend)
- Retorno e validação de token JWT
- Permissão apenas para usuários cadastrados

### 👤 Usuários
- Cadastro de novo usuário com nome, e-mail, senha e CPF
- Validação de CPF e senha forte
- Edição de perfil (exceto e-mail)
- Restrição para que o usuário edite apenas os próprios dados

### 📋 CRUDs Completos
- **Pacientes** (cadastro, edição, exclusão, listagem com paginação)
- **Médicos**
- **Consultas**
- Relacionamentos entre os recursos

---

## 🧱 Tecnologias Utilizadas

### Frontend
- React + Vite
- TypeScript
- React Hook Form + Zod
- React Router DOM v7
- TailwindCSS
- Context API
- Axios
- jwt-decode

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Bcrypt para criptografia de senhas

---

## 🧪 Testes

Foram implementados testes para todos os casos de uso obrigatórios marcados com `*`, garantindo a qualidade e funcionamento das funcionalidades principais.

