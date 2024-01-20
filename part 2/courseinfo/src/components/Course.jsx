const Header = ({ coursename }) => {
  
  return (
    <div>
      <h1>{coursename}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
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

const Total = ({ parts }) => {

  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises;
  }
  
  return (
    <div>
      <b>total of {sum} exercises</b>
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