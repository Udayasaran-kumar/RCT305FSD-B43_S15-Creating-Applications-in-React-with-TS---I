import React, { useState } from 'react'
import Timer from './Timer';

const App = () => {
  const [count,setCount]=useState<Number>(0);
  return (
    <div>
      <Timer/>
    </div>
  )
}

export default App
