interface BMIValues {
  weight: number;
  height: number;
}

const parseBmiArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const strings2BMIValues = (heightString: string, weightString: string): BMIValues => {
  if (!isNaN(Number(heightString)) && !isNaN(Number(weightString))) {
    return {
      weight: Number(weightString),
      height: Number(heightString)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (bmiValues: BMIValues): string => {
  // lbs & inches
  // const bmi = (bmiValues.weight / (bmiValues.height * bmiValues.height)) * 703;
  // kg & cm
  const bmi = (bmiValues.weight / ((bmiValues.height * .01) * (bmiValues.height * .01)));
  if (bmi <= 15) {
    return 'Very severely underweight';
  } else if (bmi <= 16) {
    return 'Severely underweight';
  } else if (bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    return 'Overweight';
  } else if (bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
}

// try {
//   console.log(calculateBmi(parseBmiArguments(process.argv)));
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message);
// }

export const bmi = (height: string, weight: string): string => {
  return calculateBmi(strings2BMIValues(weight, height));
}