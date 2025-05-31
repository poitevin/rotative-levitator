import React, { useState } from "react";

// English sonnet lines - "Rotative Levitator"
const englishLines = {
  firstLine: [
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
  ],
  secondLine: [
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
  ],
  thirdLine: [
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
  ],
  fourthLine: [
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
  ],
  fifthLine: [
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
  ],
  sixthLine: [
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
  ],
  seventhLine: [
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
  ],
  eighthLine: [
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
  ],
  ninthLine: [
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
  ],
  tenthLine: [
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
  ],
  eleventhLine: [
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
  ],
  twelfthLine: [
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
  ],
  thirteenthLine: [
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
  ],
  fourteenthLine: [
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
  ]
};

// Spanish sonnet lines - "Soneto: rótenos"
const spanishLines = {
  firstLine: [
    "Amor banal, la nueva levedad,",
    "Amor, alegre vida, levedad,",
    "Amor alegre -¡vaya levedad!-,",
    "Amor, balsa de lisa levedad,",
    "Amor, alegre veta, levedad,",
    "Amor baldío, a sola levedad,",
    "Amor, barra banal, la levedad,",
    "Amor barómetro, petral, edad,",
    "Amor banal, la viva levedad,",
    "Amor alegre ve la levedad,",
  ],
  secondLine: [
    "y a modosita, a leve risa y ola,",
    "y a modo sodomita, a leve rola,",
    "y a modo sed, a leve risa y ola,",
    "y a modo sed, a birra, a leve rola,",
    "y a modo sed, a mora, a leve rola,",
    "y a modosita, a birra, a leve rola,",
    "y a modosita, a diva, a leve rola,",
    "y a modo sedación, a rap, a la ola,",
    "y a modoso mocete leve rola,",
    "y a modo sodomita y a más ola,",
  ],
  thirdLine: [
    "fácil panal payar a su maldad,",
    "fácil paz a la sima -a su maldad-,",
    "fácil paz a revés a su maldad,",
    "fácil panal payar a la maldad,",
    "fácil paz a la sima -a la maldad-,",
    "fácil paz a revés, a la maldad,",
    "fácil palo -golosa su maldad-,",
    "fácil palo -golosa la maldad-,",
    "fácil panal payar a mi maldad,",
    "fácil palo -golosa mi maldad-,",
  ],
  fourthLine: [
    "revelé ver soneto, no la cola.",
    "revelé verso neto, no la cola.",
    "revelé ver soneto, rola, cola.",
    "revelé verso neto, rola, cola.",
    "revelé verde sale de la cola.",
    "revelé verde sale de la cola.",
    "revelé verde si me dé la cola.",
    "revelé verde si me dé la cola.",
    "revelé verde sí, mi sima, cola.",
    "revelé verde sí, mi sima, cola.",
  ],
  fifthLine: [
    "La yací, risa y -ojo- sola, frágil,",
    "La yací, risa y ojos ola, frágil,",
    "La yací, risa y ojos, ola frágil,",
    "La yací, risa y -ojo- sola, frágil,",
    "La yací, risa y ojos ola, frágil,",
    "La yací, risa y ojos, ola frágil,",
    "La yací, risa y alas, ola frágil,",
    "La yací, risa y alas, ola frágil,",
    "La yací, risa y ala, sola, frágil,",
    "La yací, risa y -¡ala!- sola, frágil,",
  ],
  sixthLine: [
    "y el edén, o por prisas, otro corto",
    "y el edén, o por prisas, otro corto",
    "y el edén -¡opa y risas!-. Otro corto",
    "y el edén, -¡opa y risas!-. Otro corto",
    "y el edén, o por prisas, otro corto",
    "y el edén, -¡opa y risas!-. Otro corto",
    "y el edén, o por prisas, otro corto",
    "y el edén, o por prisas, otro corto",
    "y el edén, o por prisas, otro corto",
    "y el edén, -¡opa y risas!-. Otro corto",
  ],
  seventhLine: [
    "a otro le di. ¡Si soy, será más ágil!",
    "a otro le di. ¡Si soy, será más ágil!",
    "a otro le doy. Y ya será más ágil.",
    "a otro le doy. Y ya será más ágil.",
    "a otro le doy y ya. ¡Será más ágil!",
    "a otro le doy y ya. ¡Será más ágil!",
    "a otro le doy y ya. ¿Será más ágil?",
    "a otro le doy y ya. ¿Será más ágil?",
    "a otro le doy y -¡Alá!- ¿será más ágil?",
    "a otro le doy y -¡Alá!- ¿será más ágil?",
  ],
  eighthLine: [
    "- ¿Ligás a mares? - ¿Yo? ¡Sí, sí, del orto!",
    "- ¿Ligás a mares? - ¡Yo sí, sí, del orto!",
    "- ¿Ligás a mares? - Ay, ¿y yo? ¡Del orto!",
    "- ¿Ligás a mares, ay?- ¿Y yo? ¡Del orto!",
    "- ¿Ligás a mares? - Ay, ¿y yo? ¡Del orto!",
    "- ¿Ligás a mares, ay?- ¿Y yo? ¡Del orto!",
    "- ¿Ligás a mares? - Ay, ¿y yo? ¡Del orto!",
    "- ¿Ligás a mares, ay?- ¿Y yo? ¡Del orto!",
    "- ¿Ligás a mares, ala? - ¿Y yo? ¡Del orto!",
    "- ¿Ligás a mares, ala? - ¿Y yo? ¡Del orto!",
  ],
  ninthLine: [
    "A otro cortos asir propone: - Dele,",
    "A otro, cortos asir. Propone: - Dele,",
    "A otro cortos asir, ya pone: - Dele,",
    "A otro, cortos asir. ya pone: - Dele,",
    "A otro, cortos asir, propone. - Dele,",
    "¿A otro cortos asir? Ya pone: - Dele,",
    "¿A otro cortos asir? Propone: - Dele,",
    "¿A otro? Cortos asir, propone: - Dele,",
    "¿A otro, cortos? Asir propone: - Dele,",
    "¿A otro, cortos? ¡Asir! Ya pone: - Dele,",
  ],
  tenthLine: [
    "y ligar falos, ojo. - ¿Y así, rica?",
    "y ligar falos, ojo. - ¿Y así, rica?",
    "y ligar falos, ojo. - ¿Y así, rica?",
    "y ligar falos -ojo- ya. - ¿Sí, rica?",
    "y ligar falos -ojo- ya. - ¿Sí, rica?",
    "y ligar falos -ojo- ya. - ¿Sí, rica?",
    "y ligar falos, ¡ala, ya! - ¿Sí, rica?",
    "y ligar falos, ¡ala! - ¿Y así, rica?",
    "y ligar falos, ¡ala! - ¿Y así, rica?",
    "y ligar falos, ¡ala! - ¿Y así, rica?",
  ],
  eleventhLine: [
    "Ya la loca lo note, nos revele",
    "Ya la loca lo note, nos revele",
    "Ya la loca lo rote, nos revele",
    "Ya la loca lo rote, nos revele",
    "Ya la loca le dé la sed, revele",
    "Y a la loca le dé la sed, revele",
    "Ya la loca le dé mi sed, revele",
    "Y a la loca le dé mi sed, revele",
    "Ya la loca mi sí -mi sed- revele",
    "Y a la loca mi sí mi sed revele",
  ],
  twelfthLine: [
    "verdad, la musa raya plan, aplica",
    "verdad, la musa a mí salaz aplica",
    "verdad, la musa sé veraz aplica",
    "verdad, la mala raya plan, aplica",
    "verdad, la mala a mi salaz aplica",
    "verdad, la mala sé veraz aplica",
    "verdad, la musa -solo gol- aplica",
    "verdad, la mala -solo gol- aplica",
    "verdad, la mima raya plan, aplica",
    "verdad, la mima -solo gol- aplica",
  ],
  thirteenthLine: [
    "falo y así revela a ti Sodoma,",
    "falo, revela a ti modo Sodoma,",
    "falo y así revela de Sodoma,",
    "falo, revela arriba de Sodoma,",
    "falo, revela aroma de Sodoma,",
    "falo, revela arriba a ti Sodoma,",
    "falo, revela vida a ti Sodoma,",
    "falos a paranoica de Sodoma,",
    "falo, revélte como Sodoma,",
    "falos, ama, y a ti, modo Sodoma,",
  ],
  fourteenthLine: [
    "y da, devela, ve una llana broma.",
    "y da, devela di vergel, aroma.",
    "y da, devela ya vergel, aroma.",
    "y da, devela sí le das la broma.",
    "y da, devélate vergel, aroma.",
    "y da, devela losa, oíd la broma.",
    "y da, devela llana barra, broma.",
    "y da del arte por temor a broma.",
    "y da, devela viva llana broma.",
    "y da, devélale vergel, aroma.",
  ]
};

// App configurations for each project
const appConfigs = {
  en: {
    title: "Rotative Levitator",
    subtitle: "Interactive Explorer",
    versionText: "Version",
    totalVersions: "10,000,000",
    instructions: "Click on any line to cycle through variations.",
    buttonText: "Explore New Palindromic Sonnet",
    author: "– Pedro Poitevin",
    lines: englishLines
  },
  es: {
    title: "Soneto: rótenos",
    subtitle: "Explorador Interactivo",
    versionText: "Versión",
    totalVersions: "10.000.000",
    instructions: "Haz clic en cualquier línea para alternar entre variaciones.",
    buttonText: "Explorar Nuevo Soneto Palindrómico",
    author: "– Pedro Poitevin",
    lines: spanishLines
  }
};

function App() {
  // Detect language from URL parameters - defaults to English
  const getLanguageFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lang') === 'es' || urlParams.get('es') !== null ? 'es' : 'en';
  };

  const language = getLanguageFromURL();
  const config = appConfigs[language];

  // Initialize state with palindromic indices for each line
  const [currentIndices, setCurrentIndices] = useState(() => {
    const halfIndices = Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    return [...halfIndices, ...halfIndices.slice(0).reverse()];
  });

  // Function to generate a new random palindromic sonnet
  const newSonnet = () => {
    const halfIndices = Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
    setCurrentIndices([...halfIndices, ...halfIndices.slice(0).reverse()]);
  };

  // Function to handle line clicks, cycling through options, ensuring palindromic structure
  const cycleLineOption = (indexWithinStanza, stanza) => {
    const actualLineIndex = {
      0: indexWithinStanza,
      1: 4 + indexWithinStanza,
      2: 8 + indexWithinStanza,
      3: 11 + indexWithinStanza,
    }[stanza];

    const newIndices = [...currentIndices];
    const newIndex = (newIndices[actualLineIndex] + 1) % 10;

    newIndices[actualLineIndex] = newIndex;

    const totalLines = 14;
    const mirrorIndex = totalLines - 1 - actualLineIndex;
    newIndices[mirrorIndex] = newIndex;

    setCurrentIndices(newIndices);
  };

  const calculateSonnetIndex = (indices) => {
    return indices
      .slice(0, 7)
      .reverse()
      .reduce((acc, curr, i) => acc + curr * Math.pow(10, 6 - i), 1);
  };

  // Aggregate all lines into an array for easy mapping
  const allLines = [
    config.lines.firstLine,
    config.lines.secondLine,
    config.lines.thirdLine,
    config.lines.fourthLine,
    config.lines.fifthLine,
    config.lines.sixthLine,
    config.lines.seventhLine,
    config.lines.eighthLine,
    config.lines.ninthLine,
    config.lines.tenthLine,
    config.lines.eleventhLine,
    config.lines.twelfthLine,
    config.lines.thirteenthLine,
    config.lines.fourteenthLine,
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 py-2">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="inline-block">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 tracking-wider">
              {config.title}
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-1"></div>
            <p className="text-gray-600 text-sm font-light tracking-wide">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium border border-gray-300">
            {config.versionText} {calculateSonnetIndex(currentIndices).toLocaleString()} {language === 'es' ? 'de' : 'of'} {config.totalVersions}
          </span>
        </div>

        {/* Instructions */}
        <div className="text-center mb-3">
          <p className="text-gray-500 text-xs max-w-2xl mx-auto">
            {config.instructions}
          </p>
        </div>

        {/* Sonnet Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-3 md:p-4 border border-gray-200 shadow-lg">
            
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
              <p className="text-gray-600 text-sm font-light italic" style={{fontFamily: "'Adobe Caslon Pro', 'Crimson Text', 'EB Garamond', serif"}}>
                {config.author}
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
              {config.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
