interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  parts: CoursePart[];
}

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }: ContentProps): JSX.Element => {
  return (
    <div>
      {parts.map((course, index) => (
        <div key={index}>
          <p>Name: {course.name}</p>
          <p>Exercise Count: {course.exerciseCount}</p>
        </div>
      ))}
    </div>
  );
};

const Total = ({ parts }: ContentProps): JSX.Element => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <div>Total exercises: {totalExercises}</div>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
