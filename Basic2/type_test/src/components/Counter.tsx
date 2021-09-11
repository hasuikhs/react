import React, { useState } from "react";

interface Props {
    click?: string|'';  // optional
}

export default function Count(props: Props): JSX.Element {
    
    const [count, setCount] = useState<number>(0);
    const clickString: string = props.click || 'Click'; // props.click이 존재하면 사용하고 아니면 기본값으로 'Click'을 사용

    const increment = (): void => {
        setCount(count + 1);
    };

    return (
        <button onClick={ increment }>
            { clickString } { count }
        </button>
    )
};