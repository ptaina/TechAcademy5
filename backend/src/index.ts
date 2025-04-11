import express from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import patientRoutes from './routes/patientRoutes';
import doctorRoutes from './routes/doctorRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import { associateModels } from './models/associateModels';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! :)');
});

app.use(userRoutes);
app.use(loginRoutes);
app.use(patientRoutes);
app.use(doctorRoutes);
app.use(appointmentRoutes);

const syncDatabase = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            // Primeiro, sincroniza o banco de dados
            await sequelize.sync({ alter: true });
            // Depois, associa os modelos
            associateModels(); // ⬅️ Chame após a sincronização do banco de dados
            console.log('Banco de dados sincronizado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao sincronizar database:', error);
    }
};

if (process.env.NODE_ENV !== 'test') {
    // Sincroniza o banco de dados antes de rodar o servidor
    app.listen(port, async () => {
        await syncDatabase(); // Sincronize o banco de dados antes de rodar o servidor
        console.log(`Servidor rodando na porta ${port}`);
    });
}

export default app;
