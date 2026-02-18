import React from 'react';
import logo from './logo.svg';
import './App.css';
// import our components
import ProfileCard from './components/ProfileCard/ProfileCard';

function App() {
  const profiles = [
    {
      name: "Nathan",
      year: "4",
      homeState: "Tennessee"
    },
    {
      name: "Shivani",
      year: "4",
      homeState: "New Hampshire"
    },
    {
      name: "Peter",
      year: "4",
      homeState: "Georgia"
    }
  ]

  return (
    <div className="App">
        {/* pass in the  props in the element tag */}
        <ProfileCard name="Nathan" year="4" homeState="Tennessee"/>
        {/* <ProfileCard></ProfileCard> also works */}

        {
          profiles.map((profile) => {
            return <ProfileCard {...profile} />
          })
        }
    </div>
  );
}

export default App;
