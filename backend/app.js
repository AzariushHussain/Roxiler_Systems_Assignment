const express = require('express');
const cors = require('cors');
const http = require('http');
const client = require('./connection');
const db = require('./models/index')
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL || 'http://localhost:3000',
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

(async () => {
        await client.connect()
            .then(() => console.log('Connected to PostgreSQL'))
            .catch(err => console.error('PostgreSQLConnection error', err.stack));
})();

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const PORT = process.env.PORT || 8000;

(async()=>{
    try{
        await db.sequelize.sync({ alter: true }); 
        console.log('Database synced');
        server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch(error){
        console.error('Error syncing database:', error);
    }
})();