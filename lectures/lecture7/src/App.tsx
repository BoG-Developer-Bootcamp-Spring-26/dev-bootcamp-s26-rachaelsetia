import { useState } from 'react'
import './App.css'

import { Link, useNavigate } from "react-router";

function App() {
  const nav = useNavigate();

  return (
    <>
      <Link to="/ditto">Ditto</Link>
      <button onClick={() => nav("/pokemon/1")}>Bulbasaur</button>
    </>
  )
}

export default App
