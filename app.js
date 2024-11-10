
const express = require('express');
const app = express();
app.use(express.json());
const listRoutes = require('./routes/listRoutes');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const corsOptions = {
    origin: process.env.CORS_ALLOW_ORIGINS.split(','),
    methods: process.env.CORS_ALLOW_METHODS.split(','),
    credentials: true

};
app.use(cors(corsOptions));

app.use('/api/lists',authMiddleware, listRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
console.log("listening on port" + PORT);
});
