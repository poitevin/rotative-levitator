import React, { useState } from "react";

// Example arrays for sonnet lines (add all lines similarly)
const firstLine = [
  "No omen in a call, it's still a sign,",
  "No omen of one dragon, evil sign,",
  "No omen old as sore, no evil sign,",
  "No omen as a sore, no evil sign,",
  "No omen in a caw as level sign,",
  "No omen. Old eye level, still. A sign,",
  "No omen, I pull, ever stray, a sign,",
  "No omen, I pull air, ear even, sign",
  "No omen in a clam, red, level sign,",
  "No omen in a claro, manward sign,",
];
const secondLine = [
  "a faraway, reviled delivery.",
  "a faraway raid, a delivery.",
  "a faraway raid, spool, delivery.",
  "a faraway raid's flow, delivery.",
  "a faraway raid's drab delivery.",
  "a faraway raid, won delivery.",
  "a faraway raid's yaw, delivery.",
  "a faraway raid's doom delivery.",
  "a faraway raid's mood, delivery.",
  "a faraway raid, war, delivery.",
];
const thirdLine = [
  "Assay a war, a flavor of no wine,",
  "Assay a waste, gnome, devil, era, wine,",
  "Assay a way arts air as rotor's tine,",
  "Assay a way arts air, a level mine,",
  "Assay a way arts air, a level's tine,",
  "Assay a way arts air, a tenet's tine,",
  "Assay a way arts air as tenet's tine,",
  "Assay a way arts air, a rotor's tine,",
  "Assay a way arts air, as radar's tine,",
  "Assay a way arts air, a radar's tine,",
];
const fourthLine = [
  "risen urn, inward gaze, no laniary.",
  "risen urn, inward muse, no laniary.",
  "risen urn, inward dirge, no laniary.",
  "risen urn, inward page, no laniary.",
  "risen urn, inward name, no laniary.",
  "risen urn, inward, rife, no laniary.",
  "risen urn, inward tune, no laniary.",
  "risen urn, inward mare, no laniary.",
  "risen urn, inward pile, no laniary.",
  "risen urn, inward mire, no laniary.",
];
const fifthLine = [
  "Beryl, one rock, core mass laid rotative,",
  "Beryl, one rock, core laps laid rotative,",
  "Beryl, one rock, core pods laid rotative,",
  "Beryl, one rock, core nods laid rotative,",
  "Beryl, one rock, core nil laid rotative,",
  "Beryl, one rock, core dam laid rotative,",
  "Beryl, one rock, core laws laid rotative,",
  "Beryl, one rock, core law laid rotative,",
  "Beryl, one rock, core firs laid rotative,",
  "Beryl, one rock, core fir laid rotative,",
];
const sixthLine = [
  "layer gyrator, never ever apt,",
  "layer grammar, gaps, argot's liar, apt,",
  "layer gyrator, divan, ever apt,",
  "layer gyrator's timer, ever apt,",
  "layer gyrator, liver, ever apt,",
  "layer gyrator, redder, ever apt,",
  "layer gyrator's partner ever apt,",
  "layer grammar got duals, ever apt,",
  "layer gyrator, no duals, ever apt,",
  "layer gyrator, damn warder ever apt,",
];
const seventhLine = [
  "a gift, part saved, I ride, yaw. Still, I give",
  "a gift, part saved, I side, yaw. Still, I give",
  "a gift, part lobed, I ride, yaw. Still, I give",
  "a gift, part lobed, I side, yaw. Still, I give",
  "a gift, part caped, I ride, yaw. Still, I give",
  "a gift, part caped, I side, yaw. Still, I give",
  "a gift, part saved, I bide, yaw. Still, I give",
  "a gift, part lobed, I bide, yaw. Still, I give",
  "a gift, part caped, I bide, yaw. Still, I give",
  "a gift, part saved, I hide, yaw. Still, I give",
];
const eighthLine = [
  "no one vigil. Lit, swayed, I ride, vast, rapt.",
  "no one vigil. Lit, swayed, I side, vast, rapt.",
  "no one vigil. Lit, swayed, I ride, bolt, rapt.",
  "no one vigil. Lit, swayed, I side, bolt, rapt.",
  "no one vigil. Lit, swayed, I ride pact, rapt.",
  "no one vigil. Lit, swayed, I side pact, rapt.",
  "no one vigil. Lit, swayed, I bide, vast, rapt.",
  "no one vigil. Lit, swayed, I bide, bolt, rapt.",
  "no one vigil. Lit, swayed, I bide pact, rapt.",
  "no one vigil. Lit, swayed, I hide, vast, rapt.",
];
const ninthLine = [
  "Fig at par, ever even, rotary, grey,",
  "Fig at par ails to grasp a grammar, grey,",
  "Fig at par, even, avid, rotary, grey,",
  "Fig at par ever emits rotary grey,",
  "Fig at par, ever evil, rotary, grey,",
  "Fig at par, eve redder, rotary, grey,",
  "Fig at par, ever entraps rotary grey,",
  "Fig at par, eve's laud to grammar grey,",
  "Fig at par, eve's laud on rotary grey,",
  "Fig at par, eve redrawn, mad rotary grey,",
];
const tenthLine = [
  "a levitator dial's same rock core.",
  "a levitator dial's pale rock core.",
  "a levitator dial, dope rock core.",
  "a levitator dial's done rock core.",
  "a levitator dial, line, rock core.",
  "a levitator dial made rock core.",
  "a levitator dial's wale, rock core.",
  "a levitator dial, wale, rock core.",
  "a levitator dial's rife rock core.",
  "a levitator dial, rife rock core.",
];
const eleventhLine = [
  "No lyre by rain, a lone zag drawn in rune.",
  "No lyre by rain, a lone sum drawn in rune.",
  "No lyre by rain, a lone grid drawn in rune.",
  "No lyre by rain, a lone gap drawn in rune.",
  "No lyre by rain, a lone man drawn in rune.",
  "No lyre by rain, a lone fir drawn in rune.",
  "No lyre by rain, a lone nut drawn in rune.",
  "No lyre by rain, a lone ram drawn in rune.",
  "No lyre by rain, a lone lip drawn in rune.",
  "No lyre by rain, a lone rim drawn in rune.",
];
const twelfthLine = [
  "Siren I won for oval far away:",
  "Siren, I ware; live demon gets a way:",
  "Siren, its rotors' aria stray away:",
  "Siren, I'm level, aria stray away:",
  "Siren, its level aria stray away:",
  "Siren, its tenet aria stray away:",
  "Siren, its tenet's aria stray away:",
  "Siren, its rotor—aria stray away:",
  "Siren, its radar's aria stray away:",
  "Siren, its radar–aria stray away:",
];
const thirteenthLine = [
  "Assay reviled delivery, a war;",
  "Assay, reviled, a diary, a war;",
  "Assay, reviled loop's diary, a war;",
  "Assay, reviled Wolf's diary, a war;",
  "Assay reviled bard's diary, a war;",
  "Assay, reviled now, diary, a war;",
  "Assay reviled ways' diary, a war;",
  "Assay, reviled, mood's diary, a war;",
  "Assay, reviled doom's diary, a war;",
  "Assay, reviled, raw diary, a war;",
];
const fourteenthLine = [
  "a fang is all: it's still a canine moon.",
  "a fang is live, no garden of one moon.",
  "a fang is live on Eros, sad lone moon.",
  "a fang is live on Eros, a sane moon.",
  "a fang is level saw, a canine moon.",
  "a fang, is all: its level eyed lone moon.",
  "a fang, I say! Arts revel, lupine moon.",
  "a fang is never aerial lupine moon.",
  "a fang is level, dermal, canine moon.",
  "a fang is drawn: amoral, canine moon.",
];

function App() {
  // Initialize state with palindromic indices for each line
  const [currentIndices, setCurrentIndices] = useState(() => {
    const halfIndices = Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    // The last index is repeated as we need an odd number of unique lines for the sonnet to be a palindrome
    return [...halfIndices, ...halfIndices.slice(0).reverse()];
  });

  // Function to generate a new random palindromic sonnet
  const newSonnet = () => {
    const halfIndices = Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    // Generate a new set of palindromic indices
    setCurrentIndices([...halfIndices, ...halfIndices.slice(0).reverse()]);
  };

  // Function to handle line clicks, cycling through options, ensuring palindromic structure
  const cycleLineOption = (indexWithinStanza, stanza) => {
    // Calculate the actual line index based on its stanza
    const actualLineIndex = {
      0: indexWithinStanza, // First quatrain
      1: 4 + indexWithinStanza, // Second quatrain
      2: 8 + indexWithinStanza, // First tercet
      3: 11 + indexWithinStanza, // Second tercet
    }[stanza];

    const newIndices = [...currentIndices];
    const newIndex = (newIndices[actualLineIndex] + 1) % firstLine.length;

    // Update the selected line
    newIndices[actualLineIndex] = newIndex;

    // Calculate and update the mirror index for the selected line
    const totalLines = 14;
    const mirrorIndex = totalLines - 1 - actualLineIndex;
    newIndices[mirrorIndex] = newIndex;

    setCurrentIndices(newIndices);
  };

  const calculateSonnetIndex = (indices) => {
    // Only the first 7 indices are needed for unique identification
    return indices
      .slice(0, 7)
      .reverse()
      .reduce((acc, curr, i) => acc + curr * Math.pow(10, 6 - i), 1);
  };

  // Aggregate all lines into an array for easy mapping
  const allLines = [
    firstLine,
    secondLine,
    thirdLine,
    fourthLine,
    fifthLine,
    sixthLine,
    seventhLine,
    eighthLine,
    ninthLine,
    tenthLine,
    eleventhLine,
    twelfthLine,
    thirteenthLine,
    fourteenthLine,
  ];

  return (
    <div className="brand-container" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Header */}
      <header className="brand-header">
        <h1 className="brand-site-title">Ten Million Palindromic Sonnets</h1>
        <p className="brand-section-title">Interactive Poetry Generator</p>
        
        <div className="brand-info-section">
          <p className="brand-text-center">
            <strong>Version:</strong> {calculateSonnetIndex(currentIndices).toLocaleString()} of 10,000,000
          </p>
        </div>
        
        <div className="brand-constraint-note">
          <strong>Constraint:</strong> Complete sonnets that read identically forwards and backwards, generated through systematic permutation. Click on any line to cycle through variations.
        </div>
      </header>

      {/* Sonnet Container */}
      <div className="brand-card">
        <div className="brand-poem-text">
          {/* First Quatrain */}
          <div className="brand-stanza-break">
            {allLines.slice(0, 4).map((lineArray, indexWithinStanza) => (
              <div
                key={`first-quatrain-${indexWithinStanza}`}
                onClick={() => cycleLineOption(indexWithinStanza, 0)}
                className="brand-poem-line"
                style={{
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--light-gray)';
                  e.target.style.borderLeftColor = 'var(--accent-color)';
                  e.target.style.transform = 'translateX(0.5rem)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderLeftColor = 'transparent';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                {lineArray[currentIndices[indexWithinStanza]]}
              </div>
            ))}
          </div>

          {/* Second Quatrain */}
          <div className="brand-stanza-break">
            {allLines.slice(4, 8).map((lineArray, indexWithinStanza) => (
              <div
                key={`second-quatrain-${indexWithinStanza}`}
                onClick={() => cycleLineOption(indexWithinStanza, 1)}
                className="brand-poem-line"
                style={{
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--light-gray)';
                  e.target.style.borderLeftColor = 'var(--accent-color)';
                  e.target.style.transform = 'translateX(0.5rem)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderLeftColor = 'transparent';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                {lineArray[currentIndices[4 + indexWithinStanza]]}
              </div>
            ))}
          </div>

          {/* First Tercet */}
          <div className="brand-stanza-break">
            {allLines.slice(8, 11).map((lineArray, indexWithinStanza) => (
              <div
                key={`first-tercet-${indexWithinStanza}`}
                onClick={() => cycleLineOption(indexWithinStanza, 2)}
                className="brand-poem-line"
                style={{
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--light-gray)';
                  e.target.style.borderLeftColor = 'var(--accent-color)';
                  e.target.style.transform = 'translateX(0.5rem)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderLeftColor = 'transparent';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                {lineArray[currentIndices[8 + indexWithinStanza]]}
              </div>
            ))}
          </div>

          {/* Second Tercet */}
          <div style={{ marginBottom: '1rem' }}>
            {allLines.slice(11, 14).map((lineArray, indexWithinStanza) => (
              <div
                key={`second-tercet-${indexWithinStanza}`}
                onClick={() => cycleLineOption(indexWithinStanza, 3)}
                className="brand-poem-line"
                style={{
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--light-gray)';
                  e.target.style.borderLeftColor = 'var(--accent-color)';
                  e.target.style.transform = 'translateX(0.5rem)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderLeftColor = 'transparent';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                {lineArray[currentIndices[11 + indexWithinStanza]]}
              </div>
            ))}
          </div>

          {/* Author Attribution */}
          <div style={{ textAlign: 'right', marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            – Pedro Poitevin
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="brand-card brand-card-compact brand-text-center">
        <button
          onClick={newSonnet}
          className="brand-btn brand-btn-primary brand-btn-large"
          style={{ marginBottom: '1rem' }}
        >
          <span style={{ marginRight: '0.5rem' }}>🔄</span>
          Generate New Palindromic Sonnet
        </button>
        
        <div className="brand-info-section">
          <p className="brand-text-small">
            Each sonnet reads identically forwards and backwards, letter by letter. 
            This collection contains 10 million unique palindromic sonnets, 
            paying homage to Raymond Queneau's <em>Cent mille milliards de poèmes</em>.
          </p>
        </div>
      </div>

      {/* Footer with link back to main site */}
      <div className="brand-text-center" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="brand-text-muted brand-text-small">
          Part of the digital poetry collection by{' '}
          <a href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>
            Pedro Poitevin
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
