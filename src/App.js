import React from 'react';
import './App.css';
import FileUpload from './test3';
import Header from './header';


function App() {
  return (
    <>
      <Header />
      <div className='main'>
        <FileUpload />
      </div>
    </>
  );
}

export default App;