import express from 'express';
import { bmi } from './calculateBmi';
import { calculateExercises, validateExerciseParameters } from './exerciseCalculator';
const app = express();

app.use(express.json())

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

app.post('/exercises', (req, res) => {
  const params = req.body
  if (!params || !params.daily_exercises || !params.target) {
    res.status(400).send({error: "parameters missing"});
  } else if (!validateExerciseParameters(params.daily_exercises, params.target)) {
    res.status(400).send({error: "malformatted parameters"});
  } else {
    const result = calculateExercises(params.daily_exercises, params.target)
    res.status(400).send(result)
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});