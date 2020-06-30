import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ part }) => {
  return (
    <li>
      <p>
        {part.name}: {part.exercises}
      </p>
    </li>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
      <Total parts={parts} />
    </ul>
  );
};

const Total = ({ parts }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const arrayOfNumOfExercises = parts.map((part) => part.exercises);
  const sum = arrayOfNumOfExercises.reduce(reducer);
  return (
    <li>
      <p>
        <strong>Number of exercises: {sum}</strong>
      </p>
    </li>
  );
};

export const Course = ({ courses }) => {
  return (
    <>
      <h1>Full Stack Open</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header key={course.name} name={course.name} />
            <Content parts={course.parts} />
            {/* <Total parts={course.parts} /> */}
          </div>
        );
      })}
    </>
  );
};
