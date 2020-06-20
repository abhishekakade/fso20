import React from "react";
import ReactDOM from "react-dom";

// Refactor the code so that it consists of three new components: Header, Content, and Total.

// All data still resides in the App component, which passes the necessary data to each component using props.

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      {name}: {exercises}
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;
  // console.log(parts);

  return (
    <div>
      <h2>Name: Exercises</h2>
      {parts.map((part, id) => (
        <Part name={part.name} key={id} exercises={part.exercises}></Part>
      ))}
    </div>
  );
};
const Total = (props) => {
  let sum = 0;
  const { parts } = props;
  // console.log(parts);

  parts.forEach((item) => (sum += parseInt(item.exercises)));

  return <p style={{ fontWeight: "bold" }}>Number of exercises: {sum}</p>;
};
const App = () => {
  // All data still resides in the App component, which passes the necessary data to each component using props.

  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
