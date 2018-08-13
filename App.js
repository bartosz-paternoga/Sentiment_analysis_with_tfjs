import React, { Component } from 'react';
import './App.css';
import Comp from './component1';
import showResult from './component2';
import * as tf from '@tensorflow/tfjs';


class App extends Component {


  componentWillMount() {
   this.loadingModel();
   console.log("componentWillMount", );
  }


  loadingModel = async () => {

      const HOSTED_URLS = {
      model:
          'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
      metadata:
          'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
      };

      const model = await tf.loadModel(HOSTED_URLS.model);
      const metadataJson = await fetch(HOSTED_URLS.metadata);
      const metadata = await metadataJson.json();

      console.log("MODEL LOADED");
      console.log("metadata:", metadata);

      this.model = model;
      this.metadataJson= metadataJson;
      this.metadata = metadata;
     
      const modelLoad = "LOADED";

      if (modelLoad !=="") {
          const elem1 = document.getElementById('loading-message');
          elem1.style.display = 'none';
          const elem2 = document.getElementById('sk-cube-grid');
          elem2.style.display = 'none';
          const elem3 = document.getElementById('review-text');
          elem3.style.display = 'inline';
                }

  }

 
  textInput =  () => {

      const reviewText = document.getElementById('review-text');
      const text =  reviewText.value;
      console.log("TEXT", text);

      this.predicting(text);
      
      console.log("this.score", this.score)

      showResult(this.score);
 
  };


  predicting = (text) => {

        const trimmed = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
        const inputBuffer = tf.buffer([1, (this.metadata).max_len], "float32");
        trimmed.forEach((word, i) => inputBuffer.set(this.metadata.word_index[word] + this.metadata.index_from, 0, i));
        const input = inputBuffer.toTensor();
        const predictOut = this.model.predict(input);
        const score = predictOut.dataSync()[0];
        predictOut.dispose();

        console.log('Positivity: ' + (score*100).toFixed(0) +'%');
        this.score = score;
  }



  render() {
      return (
             <Comp

              textInput = {this.textInput}               
              
                 />    

    );
  }
}

export default App;
