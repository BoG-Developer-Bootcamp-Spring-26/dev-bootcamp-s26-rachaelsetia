import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { User } from ".././types/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const[selectedUserName, setSelectedUserName] = useState<string>("");

  // since we don't have a database, we will store all users in another state variable
  const [users, setUsers] = useState<User[]>([]);

  const [newUserName, setNewUserName] = useState<string>("");

const handleCreate = async () => {
  // we use the second argument in the fetch() method to specify that we don't want this to be a GET request
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // need to use .stringify since body only takes string objects and not straight JSON
    body: JSON.stringify({
      users: users,
      userName: selectedUserName
    })
  });

  const data = await response.json();
  /*
    this will give us
        res.status(200).json({
            users: users,
            message: "User was created successfully."
        });
    from the user.ts file
  */

  // we need to set users state variable to the users passed in from the backend
  setUsers(data.users);

  // we now need to take each user and make it display as `<p>User with name {username}</p>`
};

const handleDelete = async() => {
  const response = await fetch("/api/user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      users: users,
      userName: selectedUserName
    })
  });

  const data = await response.json();
  setUsers(data.users);
}

const handleEdit = async() => {
  const response = await fetch("/api/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      users: users,
      oldUserName: selectedUserName,
      newUserName: newUserName
    })
  });

  const data = await response.json();
  setUsers(data.users);
}

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex flex-col min-h-screen items-center justify-center font-sans`}
    >
      <div className="flex flex-col items-center gap-4">
        {users.map((user) => {
          return (
            <p>User with name {user.name}</p>
          )
        })}
      </div>
      
      <div className="flex flex-col gap-4 items-center">
        {/* since we're using Tailwind CSS, we can use the className to add style attributes */}
        {/* if we put the className as "flex", this div is now a flexbox */}

        <div className="flex flex-row gap-4">
          <input onChange={(e) => setSelectedUserName(e.target.value)} type="text" className="border-black border-2 border-solid rounded-md" />
            {/* e holds all the data of the event (ie. the event that something changed) */}
            {/* everytime the text in the input box changes, we update the value of selectedUserName */}
          <button onClick={() => handleCreate()} className="border-black border-2 border-solid rounded-md" >Create User</button>
        </div>

        <div className="flex flex-row gap-4">
          <input onChange={(e) => setSelectedUserName(e.target.value)} type="text" className="border-black border-2 border-solid rounded-md" />
          <button onClick={() => handleDelete()} className="border-black border-2 border-solid rounded-md" >Delete User</button>
        </div>

        <div className="flex flex-row gap-4">
          <input onChange={(e) => setSelectedUserName(e.target.value)} type="text" className="border-black border-2 border-solid rounded-md" />
          <input onChange={(e) => setNewUserName(e.target.value)} type="text" className="border-black border-2 border-solid rounded-md" />
          <button onClick={() => handleEdit()} className="border-black border-2 border-solid rounded-md" >Change Username</button>
        </div>
      </div>
    </div>
  );
}
