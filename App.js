import React, { Component } from 'react';
import './App.css';
import Comp from './component1';
import Prediction from './prediction';
import Loader from './loader';
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

      Loader(modelLoad);

  }

 
  textInput =  () => {

      const reviewText = document.getElementById('review-text');
      const text =  reviewText.value;
      console.log("TEXT", text);

      const prediction = new Prediction(text);
      prediction.predictThat(this.model , this.metadata);

  };



  render() {
      return (
             <Comp

              textInput = {this.textInput}               
              
                 />    

    );
  }
}

export default App;
