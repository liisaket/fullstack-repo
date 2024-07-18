/*const parseArguments = (target: number, args: number[]) => {
  if (args.length < 1) throw new Error('Not enough arguments');
  if (isNaN(Number(target)) || !args.every(arg => !isNaN(Number(arg)))) {
    throw new Error('Provided values were not numbers!');
  }
};*/

interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number|string;
  ratingDescription: string|number;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[], target: number) => {
  const periodLength = exercises.length;
  const trainingDays = periodLength - exercises.filter(i => i == 0).length;
  const average = exercises.reduce((a,b) => a+b) / periodLength;

  const rating = () => {
    const success_rate = (average / target) * 100;
    if (success_rate < 70) {return [1, "needs improvement"];
    } else if (success_rate >= 70 && success_rate < 100) {
      return [2, "not too bad but could be better"];
    } else {
      return [3, "great job!"];
    }
  }
  const ratingResult = rating();

  let result: Result = { 
    periodLength: exercises.length,
    trainingDays: trainingDays,
    success: average >= target,
    rating: ratingResult[0],
    ratingDescription: ratingResult[1], 
    target: target, 
    average: average
  };
  
  return result
}

export default calculateExercises;

/*
const args = process.argv.slice(2);
const target = Number(args[0]);
const exercises = args.slice(1).map(arg => Number(arg));

try {
  parseArguments(target, exercises);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/