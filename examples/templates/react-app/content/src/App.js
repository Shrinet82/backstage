import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Welcome to ${{ values.component_id }}</h1>
      <p>${{ values.description }}</p>
    </div>
  );
}

export default App;
