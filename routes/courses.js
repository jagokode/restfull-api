const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'kursus1' },
  { id: 2, name: 'kursus2' },
  { id: 3, name: 'kursus3' }
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('course yang anda minta tidak tersedia');
  res.send(course);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

// --- PUT --- //
// cari course yang mau diubah
// jika tidak ada, return 404
// validasi
// jika invalid, return 400 - bad request
// update course
// kembali ke course yg sudah update
router.put('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('Course yang diminta tidak tersedia');

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;

  res.send(courses);
});

// --- DELETE --- //
// cari course yang mau dihapus
// jika tidak ada, return 404
// delete
// tampilkan course
router.delete('/:id', (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('Course yang diminta tidak tersedia');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  };

  return Joi.validate(course, schema);
}

module.exports = router;
