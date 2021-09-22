import React, { useState } from 'react';

function Count(props) {
    
    const [count, setCount] = useState(0);
    const clickString = props.click || 'Click'; // props.click이 존재하면 사용하고 아니면 기본값으로 'Click'을 사용

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <button onClick={ increment }>
            { clickString } { count }
        </button>
    )
};

export default Count;