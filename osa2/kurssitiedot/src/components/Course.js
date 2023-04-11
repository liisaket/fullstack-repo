const Header = ({ course }) => {
    return <h2>{course}</h2>
}
  
const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((s, p) => s + p, 0)
    return <b>total of {total} exercises</b>
}
  
const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
          )}
      </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course