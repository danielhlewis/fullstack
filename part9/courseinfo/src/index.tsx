import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescribed {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescribed {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescribed {
  name: "This is the fourth part";
  fakeData: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{header: string }> = ({ header }) => (<h1>{header}</h1>)
const Content: React.FC<{parts: Array<CoursePart>}> = ({ parts }) => (
  <div>
    {parts.map(part => {
      switch(part.name) {
        case "Fundamentals":
          return <div>{`${part.name} ${part.exerciseCount} ${part.description}`}</div>
        case "Using props to pass data":
          return <div>{`${part.name} ${part.exerciseCount} ${part.groupProjectCount}`}</div>
        case "Deeper type usage":
          return <div>{`${part.name} ${part.exerciseCount} ${part.description} ${part.exerciseSubmissionLink}`}</div>
        case "This is the fourth part":
          return <div>{`${part.name} ${part.exerciseCount} ${part.description} ${part.fakeData}`}</div>
        default:
          return assertNever(part);
      }
    }
    )
    }
  </div>
)

const Total: React.FC<{total: number}> = ({ total }) => (
  <p>{`Number of exercises ${total}`}</p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "This is the fourth part",
      exerciseCount: 11,
      description: "This is the description",
      fakeData: "This is fake data"
    },

  ];

  return (
    <div>
      <Header header={courseName} />
      <Content parts={courseParts} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
