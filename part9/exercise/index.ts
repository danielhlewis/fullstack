import express from 'express';
import { bmi } from './calculateBmi'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmiString = bmi(req.query.weight.toString(), req.query.height.toString());
    res.send(bmiString);
  } catch (exception) {
    res.status(400).send({error: "malformatted parameters"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});