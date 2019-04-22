const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'kursus1' },
  { id: 2, name: 'kursus2' },
  { id: 3, name: 'kursus3' }
];

app.get('/', (req, res) => {
  res.send('Selamat Datang di Express');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));

  if (!course) res.status(404).send('course yang anda minta tidak tersedia');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
