import React from 'react';
import logo from './logo.svg';
import './App.css';

const Comp = (props) => (

 
      <div className="App" onLoad = {props.main0}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sentiment Analysis with Tensorflow.js</h1>
        </header><br/><br/>


          <div id="loading-message">
             <p>model is loading, this will take a few moments ...</p>
             <p>all good things come for those who wait</p>
          </div>
          
        <div className="sk-cube-grid" id="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>


        <div >
            <form  >
                <textarea  id = 'review-text' name="input" cols="80" rows="10" onInput = {props.main}
                placeholder="Type a positive or negative comment">
                </textarea>
            </form>
        </div><br/>

      </div>

);

export default Comp;
