import React, { useState, useEffect } from 'react';
import './App.css';
import MainPage from './components/MainPage'
import ContentPage from './components/ContentPage'

function App() {

  const [isMain, setIsMain] = useState(true)

  function changePage(flag){
    flag ?
    setIsMain(true)
    : setIsMain(false)
  }
  return (
    <div className="App">
      <div className="top-row">
        <div className="top-block"><h1>varnavin1045</h1></div>
        <div className="top-block">
          <span className=" link" onClick={() => changePage(1)}>Главная страница</span><br></br>
          <span className="mt-2 link" onClick={() => changePage(0)}>Список студентов</span>
        </div>
      </div>
      {
        isMain ?
        <MainPage></MainPage>
        : 
        <ContentPage></ContentPage>
      }
    </div>
  );
}

export default App;
