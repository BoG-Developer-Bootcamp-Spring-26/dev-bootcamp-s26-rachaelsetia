import type { NextApiRequest, NextApiResponse } from "next";

type PokemonData = {
  name: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData>,
) {
    if (req.method === "GET") {
        try {
            const pokedexNumber = req.query.id;
                // req.query.id is populated with whatever number the user puts in the URL
                // ex. localhost:3000/api/pokemon/1 means that req.query.id is 1
                // this is because we have our dynamic routing set up since our class name is in brackets

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`);
            const data = await response.json();
            res.status(200).json({
                name: data.name,
                message: "Pokemon fetched successfully!",
            });
        } catch (e) {
            res.status(500).json({
                name: "",
                message: "Error was encountered. ID is invalid",
            });
        }
    } else {
        res.status(500).json({
            name: "",
            message: "This endpoint does not handle HTTP methods besides GET.",
        });
    }
}
