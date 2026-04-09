import { UserData } from "@/types/types";
import user from "../models/User";

export async function createUser(userData: UserData) {
    const newUser = new user(userData);
    await newUser.save();                  // write to database
    return user;
}

export async function getUser(userId: string) {
    const newUser = await user.findById(userId);
    return newUser;
}

export async function updateUser(userId: string, newData: UserData) {
    const newUser = await user.findByIdAndUpdate(userId, newData);
    return newUser;
}

export async function deleteUser(userId: string) {
    await user.findByIdAndDelete(userId);
}