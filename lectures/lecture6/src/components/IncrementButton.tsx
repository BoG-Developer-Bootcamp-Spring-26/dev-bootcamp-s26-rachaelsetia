// curly braces allows you to import a specific function so you don't have to do React.useState() every time
import React, { useState } from "react";

interface IncrementButtonProps {
    // setCounter has a number parameter called counter that returns nothing
    // setCounter: (counter: number) => void;
    // counter: number
    // instead of passing down 2 things, we can pass in the increment function

    increment: () => void;
}

export default function IncrementButton({
    // setCounter
    increment
}: IncrementButtonProps) {
    return (
        <div>     
            {/* instead of adding an eventListener in JS, we can use onClick */}
            <button onClick={() => increment()}>Increment Counter</button>
        </div>
    );
}