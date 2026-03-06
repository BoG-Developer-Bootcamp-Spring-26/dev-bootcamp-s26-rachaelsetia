// if our URL just ends in /pokemon, (no id) we want to return all the pokemon
import type { NextApiRequest, NextApiResponse } from "next";

type PokemonData = {
  names: string[];
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData>,
) {
    if (req.method === "GET") {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0");
                // limit will cut off any pokemon with id higher than 1025
                // offset tells where to start
            const data = await response.json();
                // all pokemon will be in data.results
            const pokemonNames = data.results.map((pokemon: any) => pokemon.name);
                // take the full pokemon object and map it just to its name
            res.status(200).json({
                names: pokemonNames,
                message: "All pokemon fetched successfully!",
            });
        } catch (e) {
            res.status(500).json({
                names: [],
                message: "Error was encountered. ID is invalid",
            });
        }
    } else {
        res.status(500).json({
            names: [],
            message: "This generic pokemon endpoint does not handle HTTP methods besides GET.",
        });
    }
}
