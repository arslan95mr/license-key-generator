const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./router');

const PORT = 4000;

app.use(
    cors({
        credentials: true,
        origin: 'http://127.0.0.1:3000'
    })
);
app.use(express.json());
app.use('/api', router);

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running at port ${PORT}`); 
});