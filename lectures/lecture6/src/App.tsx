import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import IncrementButton from './components/IncrementButton';
import ResetButton from './components/ResetButton';

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [pokemonName, setPokemonName] = useState<String>("");

  const increment = () => {
    setCounter(counter + 1);
  }

  useEffect(() => {
    const fetchPokemonName = async () => {
      // using `` injects the value inside the string (interpolation)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${counter}`);
      const data = await response.json();
      setPokemonName(data.name);
    }

    fetchPokemonName();
  }, [counter]);

  return (
    <div className="App">
      <p>{pokemonName}</p>
      <IncrementButton increment={increment} />
      <ResetButton setCounter={setCounter}/>
    </div>
  );
}

export default App;
