import calculateBmi from "./bmiCalculator";

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});