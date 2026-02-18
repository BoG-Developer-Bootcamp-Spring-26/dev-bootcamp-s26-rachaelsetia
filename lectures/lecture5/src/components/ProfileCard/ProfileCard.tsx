// lots of imports when using React
import React from "react";
// import our styles
import styles from "./styles.module.css";

// can use "type" keyword instead of interface, it does a similar thing
interface ProfileCardProps extends React.ComponentProps<"div"> {
    name: string;
    year: string;
    homeState: string;
}

// export: makes ProfileCard() accecssible elsewhere in the code
// default: makes this function the default export from this file
export default function ProfileCard({
    // we unpack the props here instead of having to index through them when we need to find them later
    name,
    year,
    homeState,
    ...props        // all the props we naturally have on a div element
}: ProfileCardProps) {
    // returns JSX (basically HTML)
    return (
        // className connects this to the css file
        <div className={styles.container}>
            <p>Hi! My name is {name}, I'm a {year}th year CS student at Georgia Tech from {homeState}.</p>
        </div>
    );
}