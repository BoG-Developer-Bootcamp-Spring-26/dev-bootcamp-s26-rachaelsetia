import {useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

type PokemonData = {
    sprites: {
        front_default: string;
        front_shiny: string;
    }
}

export const Pokemon = () => {
    const { pokemon } = useParams();
    const [data, setData] = useState<PokemonData | null> (null);
    const [shiny, setShiny] = useState<boolean> (false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <img style={{width: "300px"}} src={!shiny ? data.sprites.front_default : data.sprites.front_shiny} alt="pokemon"/>
            <button onClick={() => setShiny(!shiny)}>Toggle Shiny</button>
        </div>
    );
}