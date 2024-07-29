interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CourseDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface Props {
  parts: CoursePart[];
}

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

const Part = ({ parts }: Props): JSX.Element => {
  return (
    <div>
      {parts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name} style={{ marginBottom: "1em" }}>
                <h3 style={{ margin: 0 }}>
                  {part.name} {part.exerciseCount}
                </h3>
                <em>{part.description}</em>
              </div>
            );
          case "group":
            return (
              <div key={part.name}>
                <h3 style={{ margin: 0 }}>
                  {part.name} {part.exerciseCount}
                </h3>
                <p style={{ marginTop: 0 }}>
                  project exercises {part.groupProjectCount}
                </p>
              </div>
            );
          case "background":
            return (
              <div key={part.name}>
                <h3 style={{ margin: 0 }}>
                  {part.name} {part.exerciseCount}
                </h3>
                <em>{part.description}</em>
                <p style={{ marginTop: 0 }}>
                  background material <b>{part.backgroundMaterial}</b>
                </p>
              </div>
            );
          case "special":
            return (
              <div key={part.name}>
                <h3 style={{ margin: 0 }}>
                  {part.name} {part.exerciseCount}
                </h3>
                <em>{part.description}</em>
                <p style={{ marginTop: 0 }}>
                  required skills: {part.requirements.join(", ")}
                </p>
              </div>
            );
          default:
            break;
        }
      })}
    </div>
  );
};

const Content = ({ parts }: Props): JSX.Element => {
  return <Part parts={parts} />;
};

const Total = ({ parts }: Props): JSX.Element => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <div>Total exercises: {totalExercises}</div>;
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
