import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // descending sort
  let sortedVotesArray = [...votes].sort((a, b) => b - a);

  console.log("votes array", votes);
  console.log("sorted votes array", sortedVotesArray);
  console.log(
    "index of most voted anecdote:",
    votes.indexOf(sortedVotesArray[0])
  );

  const randomNumGen = (maxNum) => {
    let randomNum = Math.floor(Math.random() * Math.floor(maxNum));
    // console.log(randomNum);
    return randomNum;
  };

  const handleVote = () => {
    // to avoid directly mutating state, make copy of state array and then setState
    let votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "1.25rem",
        fontWeight: "bold",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>Anecdotes</h1>
      <div
        id="main-anecdote-container"
        style={{
          display: "flex",
          margin: "auto",
          height: "6.5rem",
          minHeight: "6.5rem",
          maxHeight: "auto",
          width: "fit-content",
          border: "2px solid #333333",
          marginBottom: "1rem",
        }}
      >
        <p
          style={{
            maxWidth: "60ch",
            height: "auto",
            display: "block",
            padding: "1rem",
            margin: "auto",
          }}
        >
          {anecdotes[selected]}
        </p>
      </div>
      <p>{votes[selected]} votes so far...</p>
      <button onClick={() => handleVote()}>Vote</button>

      <button onClick={() => setSelected(randomNumGen(anecdotes.length))}>
        Next
      </button>

      {/* only display highest voted anecdote when votes > 0 */}
      {sortedVotesArray[0] > 0 && (
        <>
          <h2>Highest voted anecdote</h2>
          <h3>Number of votes: {sortedVotesArray[0]}</h3>
          <p
            style={{
              maxWidth: "60ch",
              height: "auto",
              display: "block",
              margin: "auto",
              padding: "1rem",
            }}
          >
            {anecdotes[votes.indexOf(sortedVotesArray[0])]}
          </p>
        </>
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
