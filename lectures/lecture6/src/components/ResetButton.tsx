import React from "react";

interface ResetButtonProps {
    setCounter: (counter: number) => void;
}

export default function ResetButton({
    setCounter
}: ResetButtonProps) {
    return (
        <button onClick={() => setCounter(1)}>Reset Counter</button>
    );
}
