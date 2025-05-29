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

/*
  CUSTOM FONT SETUP:
  To use custom fonts (like Google Fonts), you have two options:
  
  1. Add Google Fonts via HTML head (if using in a full HTML page):
     <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
     Then use: style={{fontFamily: "'Crimson Text', serif"}}
  
  2. Or import in CSS file:
     @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
     .custom-font { font-family: 'Crimson Text', serif; }
     Then use: className="custom-font"
  
  Built-in Tailwind font options:
  - font-sans (system default)
  - font-serif (Times, etc.)
  - font-mono (monospace)
*/

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
    /* 
      BACKGROUND CUSTOMIZATION:
      To change background colors, modify the gradient classes below:
      - Main background: bg-gray-50 (clean white/light background)
      - Change these to any Tailwind color (e.g., from-blue-900, via-indigo-900, to-blue-900)
      - Or use solid color: bg-white (replace entire gradient)
    */
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 py-2">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="inline-block">
            {/* 
              TITLE CUSTOMIZATION:
              - Font size: text-3xl md:text-4xl (further reduced)
              - Font weight: font-bold (options: font-light, font-normal, font-semibold, font-bold, font-black)
              - Colors: from-blue-600 via-purple-600 to-blue-600 (change to any gradient colors)
              - Font family: Uses default system fonts, add font-serif, font-mono, or custom font classes
            */}
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 tracking-wider">
              Rotative Levitator
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-1"></div>
            {/* 
              SUBTITLE CUSTOMIZATION:
              - Text color: text-gray-600 (change to any color)
              - Font size: text-sm (further reduced)
              - Font weight: font-light
            */}
            <p className="text-gray-600 text-sm font-light tracking-wide">
              Interactive Poetry Explorer
            </p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium border border-gray-300">
            Version {calculateSonnetIndex(currentIndices).toLocaleString()} of 10,000,000
          </span>
        </div>

        {/* Instructions */}
        <div className="text-center mb-3">
          <p className="text-gray-500 text-xs max-w-2xl mx-auto">
            Click on any line to cycle through variations.
          </p>
        </div>

        {/* Sonnet Container */}
        <div className="max-w-4xl mx-auto">
          {/* 
            SONNET CONTAINER CUSTOMIZATION:
            - Background: bg-white (clean white background)
            - Border: border-gray-200 (light gray border)
            - Shadow: shadow-lg (subtle shadow)
          */}
          <div className="bg-white rounded-2xl p-3 md:p-4 border border-gray-200 shadow-lg">
            
            {/* 
              POEM TEXT CUSTOMIZATION:
              - Font family: Adobe Caslon Pro with fallbacks
              - Font style: normal (not italic)
              - Text size: text-sm md:text-base (further reduced)
              - Very tight line spacing with custom style
              - Default color: text-gray-900 (dark text on light background)
              - Hover color: hover:text-red-600 (red for visibility on light background)
              - Hover border: hover:border-red-500/50 (should match hover text color)
              - All quatrains and tercets use the same styling pattern
            */}
            
            {/* First Quatrain */}
            <div className="mb-4 pb-2 border-b border-gray-100">
              {allLines.slice(0, 4).map((lineArray, indexWithinStanza) => (
                <p
                  key={`first-quatrain-${indexWithinStanza}`}
                  onClick={() => cycleLineOption(indexWithinStanza, 0)}
                  className="text-sm md:text-base mb-0 cursor-pointer transition-all duration-300 hover:text-red-600 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-3 py-0.5 border-l-2 border-transparent hover:border-red-500/50"
                  style={{fontFamily: "'Adobe Caslon Pro', 'Crimson Text', 'EB Garamond', serif", lineHeight: '1.1'}}
                >
                  {lineArray[currentIndices[indexWithinStanza]]}
                </p>
              ))}
            </div>

            {/* Second Quatrain */}
            <div className="mb-4 pb-2 border-b border-gray-100">
              {allLines.slice(4, 8).map((lineArray, indexWithinStanza) => (
                <p
                  key={`second-quatrain-${indexWithinStanza}`}
                  onClick={() => cycleLineOption(indexWithinStanza, 1)}
                  className="text-sm md:text-base mb-0 cursor-pointer transition-all duration-300 hover:text-red-600 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-3 py-0.5 border-l-2 border-transparent hover:border-red-500/50"
                  style={{fontFamily: "'Adobe Caslon Pro', 'Crimson Text', 'EB Garamond', serif", lineHeight: '1.1'}}
                >
                  {lineArray[currentIndices[4 + indexWithinStanza]]}
                </p>
              ))}
            </div>

            {/* First Tercet */}
            <div className="mb-4 pb-2 border-b border-gray-100">
              {allLines.slice(8, 11).map((lineArray, indexWithinStanza) => (
                <p
                  key={`first-tercet-${indexWithinStanza}`}
                  onClick={() => cycleLineOption(indexWithinStanza, 2)}
                  className="text-sm md:text-base mb-0 cursor-pointer transition-all duration-300 hover:text-red-600 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-3 py-0.5 border-l-2 border-transparent hover:border-red-500/50"
                  style={{fontFamily: "'Adobe Caslon Pro', 'Crimson Text', 'EB Garamond', serif", lineHeight: '1.1'}}
                >
                  {lineArray[currentIndices[8 + indexWithinStanza]]}
                </p>
              ))}
            </div>

            {/* Second Tercet */}
            <div className="mb-2">
              {allLines.slice(11, 14).map((lineArray, indexWithinStanza) => (
                <p
                  key={`second-tercet-${indexWithinStanza}`}
                  onClick={() => cycleLineOption(indexWithinStanza, 3)}
                  className="text-sm md:text-base mb-0 cursor-pointer transition-all duration-300 hover:text-red-600 hover:translate-x-2 hover:bg-gray-50 rounded-lg px-3 py-0.5 border-l-2 border-transparent hover:border-red-500/50"
                  style={{fontFamily: "'Adobe Caslon Pro', 'Crimson Text', 'EB Garamond', serif", lineHeight: '1.1'}}
                >
                  {lineArray[currentIndices[11 + indexWithinStanza]]}
                </p>
              ))}
            </div>

            {/* Author Attribution */}
            <div className="text-right mt-2 mb-1">
              {/* 
                AUTHOR TEXT CUSTOMIZATION:
                - Color: text-gray-600 (gray text on light background)
                - Font size: text-sm (further reduced)
                - Font weight: font-light (options: font-normal, font-medium, font-semibold)
                - Font style: italic (remove for normal text)
              */}
              <p className="text-gray-600 text-sm font-light italic" style={{fontFamily: "'Adobe Caslon Pro', 'Crimson Text', 'EB Garamond', serif"}}>
                – Pedro Poitevin
              </p>
            </div>
          </div>

          {/* Generate New Sonnet Button */}
          <div className="text-center mt-3">
            <button
              onClick={newSonnet}
              className="group relative inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:from-blue-400 hover:to-purple-400 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
            >
              <svg 
                className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Explore New Palindromic Sonnet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
