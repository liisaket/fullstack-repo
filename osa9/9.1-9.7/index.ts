import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const express = require('express');
const app = express();

/*app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});*/

app.get('/bmi', (req: any, res: any) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (height && weight && !isNaN(height) && !isNaN(weight)) {
    const result = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: result
    });
  } else {
    res.json({
      error: "malformatted parameters"
    });
  }
});

app.use(express.json())

app.post('/exercises', (req: any, res: any) => {
  const data = req.body;
  const daEx = data["daily_exercises"]
  const target = data["target"]
  if (!daEx || !target) {
    res.json({
      error: "parameters missing"
    })
  } else if (typeof target != "number" || typeof daEx != "object" || daEx.every((arg: any) => isNaN(arg)) || daEx.length == 0) {
    res.json({
      error: "malformatted parameters"
    })
  } else {
    const result = calculateExercises(data["daily_exercises"], data["target"]);
    res.json(result)
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});