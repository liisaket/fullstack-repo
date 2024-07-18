const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100)**2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
      return "Overweight";
  } else {
      return "Obese";
  }
}

export default calculateBmi;

/*const h: number = Number(process.argv[2])
const w: number = Number(process.argv[3])
console.log(calculateBmi(h, w))   /// Normal (healthy weight)*/