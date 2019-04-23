const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');
const app = express();

app.use(express.json());
app.use('/api/courses/', courses);
app.use('/', home);

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
