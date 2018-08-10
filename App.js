import React, { Component } from 'react';
import './App.css';
import Comp from './component1';
import * as tf from '@tensorflow/tfjs';

class App extends Component {

  state = {
      model:{},
      metadata:{},
      metadataJson:{},
    }


  main0 = async () => {

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
      this.setState({model});    
      this.metadataJson = metadataJson;
      this.setState({metadataJson});  
      this.metadata = metadata;
      this.setState({metadata});  

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


  main =  () => {

      const reviewText = document.getElementById('review-text');
      const text =  reviewText.value;
      console.log("TEXT", text);

      const trimmed = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
      const inputBuffer = tf.buffer([1, this.metadata.max_len], "float32");
      trimmed.forEach((word, i) => inputBuffer.set(this.metadata.word_index[word] + this.metadata.index_from, 0, i));
      const input = inputBuffer.toTensor();
      const predictOut = this.model.predict(input);
      const score = predictOut.dataSync()[0];
      predictOut.dispose();

      console.log('Positivity: ' + (score*100).toFixed(0) +'%');


      const elem = document.getElementById("Div1");    
        if (elem !== null){
            elem.parentNode.removeChild(elem);
          }

      const div = document.createElement('div');
      div.setAttribute("id", "Div1");
      document.body.appendChild(div);
      div.style.marginBottom = '10px';

      const infoText = document.createElement('span')
      infoText.innerText = (`Your positivity is at  ${(score*100).toFixed(0)}%`);
      div.appendChild(infoText);

       if (score*100 < 40) {
        infoText.style.color = 'red';
      } else if (60>score*100) {
       infoText.style.color  = 'black';
      } else if ( score*100 >= 60) {
        infoText.style.color = 'green';
      }

};

  render() {
      return (
             <Comp
                 main0 = {this.main0}
                 main = {this.main}               
                 />    

    );
  }
}

export default App;
