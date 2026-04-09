import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "@/types/types";
import { createUser, deleteUser, getUser, updateUser } from "@/db/actions/user";
import { connectDB } from "@/db/connectDb";

interface UserApiData {
    userData?: UserData;
    message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserApiData>,
) {
  if (req.method === "POST") {
    try {
        if (!req.body.firstname || !req.body.lastName) {
            res.status(500).json({
                message: "A first name and last name are required for creating a user."
            });
        }

        // an object that we can create our user with
        const userData = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName
        } as UserData;

        await connectDB();

        await createUser(userData);

        res.status(200).json({
            userData: userData,
            message: "User successfully created!"
        });

    } catch (e) {
        res.status(500).json({
            message: "There was an error when adding your user to the database."
        });
    }
    
  } else if (req.method === "GET") {
    try {
        if (!req.query.userId) {
            res.status(500).json({
                message: "Getting a user requires a userId."
            });
        }

        const user = await getUser(req.query.userId as string);

        if (!user) {
            res.status(500).json({
                message: "User not found!"
            });
        } else {
            res.status(200).json({
                userData: {
                    firstName: user.firstName,
                    middleName: user.middleName || "",
                    lastName: user.lastName
                },
                message: "User successfully retrieved!"
            });
        }

    } catch (e) {
        res.status(500).json({
            message: "There was an error when getting your user from the database."
        });
    }

  } else if (req.method === "PATCH") {
    try {
        if (!req.body.userId || !req.body.firstName || !req.body.lastName) {
            res.status(500).json({
                message: "Updating a user requires userId, firstName, and lastName"
            });
        }

        const userData = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName
        };

        await connectDB();

        const user = await updateUser(req.body.userId, userData);

        res.status(200).json({
            userData: userData,
            message: "Successfully updated user!"
        });

    } catch (e) {
        res.status(500).json({
            message: "There was an error when updating your user in the database."
        });
    }

  } else if (req.method === "DELETE") {
    try {
        if (!req.body.userId) {
            res.status(500).json({
                message: "Deleting a user requires a userId."
            });
        }

        await connectDB();

        await deleteUser(req.body.userId);

        res.status(200).json({
            message: "Successfully deleted user!"
        });

    } catch (e) {
        res.status(500).json({
            message: "There was an error when deleting your user from the database."
        });
    }

  } else {
    res.status(500).json({
        message: "This API does not support this HTTP method."
    });
  }
}
