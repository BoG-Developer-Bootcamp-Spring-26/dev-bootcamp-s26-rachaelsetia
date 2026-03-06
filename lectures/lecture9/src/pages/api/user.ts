import { userAgent } from "next/server";
import { User } from "../.././types/types";
import type { NextApiRequest, NextApiResponse } from "next";

// instead of creating our User type here, we can put it in another folder in src (types) so that we can grab this type from other files too
// interface User {
//     name: string;
// }

type Data = {
  users: User[];
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    try {
        // need to create a user and return all of the existing users
        const users = req.body.users;
        // look at index.tsx to see where the req.body pulls data from
        users.push({
            name: req.body.userName,
        });

        res.status(200).json({
            users: users,
            message: "User was created successfully."
        });
    } catch (e) {
        res.status(500).json({
            users: [],
            message: "Error creating user."
        });
    }

  } else if (req.method === "DELETE") {
    try {
        // given the user's name to delete, how do I remove them from my array?
        const users = req.body.users.filter((user: User) => user.name !== req.body.userName)
        res.status(200).json({
            users: users,
            message: "User was deleted successfully."
        })
    } catch (e) {
        res.status(500).json({
            users: [],
            message: "Error deleting user."
        })
    }
  } else if (req.method === "PATCH") {
    try {
        // first delete the old username
        const users = req.body.users.filter((user: User) => user.name !== req.body.oldUserName);
        users.push({
            name: req.body.newUserName
        })

        res.status(200).json({
            users: users,
            message: "Username was edited successfully."
        });
    } catch (e) {
        res.status(500).json({
            users: [],
            message: "Error editing username."
        });
    }
    } else {
    res.status(500).json({
        users: [],
        message: "This API does not support this type of HTTP request."
    })
  }
}
