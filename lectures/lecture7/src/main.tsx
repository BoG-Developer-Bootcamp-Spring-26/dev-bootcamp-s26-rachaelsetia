import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter, Routes, Route } from "react-router";
import { Pokemon } from "./pokemon.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path=":pokemon" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
