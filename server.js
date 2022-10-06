
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = require('./app');
const db = require('./src/configs/db.config');

db.connectDB();

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

