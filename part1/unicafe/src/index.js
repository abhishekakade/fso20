import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const FeedbackButton = ({ name, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      style={{
        fontFamily: "monospace",
        fontSize: "1rem",
        fontWeight: "bold",
        padding: "0.5rem",
        margin: "0 0.25rem",
        cursor: "pointer",
      }}
    >
      {name}
    </button>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ ratings }) => {
  const { good, neutral, bad } = ratings;
  return (
    // <hr
    //   style={{
    //     width: "10rem",
    //     height: "2px",
    //     backgroundColor: "#121212",
    //   }}
    // />
    <>
      <h2>Ratings</h2>
      <table style={{ textAlign: "center", margin: "auto" }}>
        <thead>
          <tr>
            <th colSpan={2}>Statistics</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text="Total" value={good + bad + neutral} />
          <Statistic
            text="Positive"
            value={`${((good / (good + bad + neutral)) * 100 || 0).toFixed(
              2
            )}%`}
          />
          <Statistic text="Positive" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Negative" value={bad} />
          <Statistic
            text="Average"
            value={((good - bad) / (good + bad + neutral) || 0).toFixed(2)}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "1.25rem",
        textAlign: "center",
        marginTop: "5rem",
      }}
    >
      <h1>Unicafe Reviews</h1>
      <h2>Click to Provide Your Feedback</h2>
      <FeedbackButton name="Good" handleClick={() => setGood(good + 1)} />
      <FeedbackButton
        name="Neutral"
        handleClick={() => setNeutral(neutral + 1)}
      />
      <FeedbackButton name="Bad" handleClick={() => setBad(bad + 1)} />
      {good || neutral || bad ? (
        <Statistics ratings={{ good, neutral, bad }} />
      ) : (
        <p>No ratings to display.</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
