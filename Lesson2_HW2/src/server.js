const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
