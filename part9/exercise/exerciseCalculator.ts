interface ExerciseValue {
  hours: Array<number>;
  target: number;
}

// const parseExerciseArguments = (args: Array<string>): ExerciseValue => {
//   if (args.length < 4) throw new Error('Not enough arguments');

//   if (!isNaN(Number(args[2]))) {
//     const hourStrings = args.slice(3);
//     const hours = hourStrings.map(x => {
//       const i = Number(x);
//       if (isNaN(i))
//         throw new Error('Provided values were not numbers!');
//       else
//         return i;
//     });
//     return {
//       target: Number(args[2]),
//       hours: hours
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: Array<number>, dailyTarget: number): Result => {
  const average = hours.reduce((x, sum) => sum + x, 0) / hours.length;
  const ratingDescriptions = ['bad', 'not bad but could be better', 'good', 'excellent', 'amazing'];
  const ratingThresholds = [0.5, 1.0, 1.5, 2.0];
  let rating = 0;
  while (rating < 4 && average > dailyTarget * ratingThresholds[rating]) {
    rating++;
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(x => x > 0).length,
    success: average >= dailyTarget,
    rating: rating + 1,
    ratingDescription: ratingDescriptions[rating],
    target: dailyTarget,
    average: average
  };
};

// try {
//   const { hours, target } = parseExerciseArguments(process.argv);
//   console.log(calculateExercises(hours, target));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }

export const validateExerciseParameters = (hours: any, dailyTarget: any): boolean => {
  if (isNaN(Number(dailyTarget)) || !Array.isArray(hours)) {
    return false;
  }
  return hours.reduce((y, x) => { 
    if (isNaN(Number(x))) {
      return false;
    } else {
      return y;
    }
  }, true);
}