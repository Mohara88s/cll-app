import React from 'react';
import Row from '../Row/Row';

export default function Grid({ guesses, currentGuess, turn, solutionLength }) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return (
            <Row
              key={i}
              currentGuess={currentGuess}
              solutionLength={solutionLength}
            />
          );
        }
        return <Row key={i} guess={g} solutionLength={solutionLength} />;
      })}
    </div>
  );
}
