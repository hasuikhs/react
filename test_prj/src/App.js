import { useState } from 'react';

function App() {
  const [number, setNumber] = useState(1);

  const double = () => {
    setNumber(prevState => prevState * 2);
    setNumber(prevState => prevState * 2);
  };

  return (
    <>
      <div>{ number }</div>
      <button onClick={ double }>submit</button>
    </>
  );
}

export default App;
