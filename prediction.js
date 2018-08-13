import { Component } from 'react';
import showResult from './showResult';
import * as tf from '@tensorflow/tfjs';


class Prediction extends Component {


  constructor(txt) {
    super();
    this.txt = txt;
  }
 
  predictThat(m, mt) {

 		const trimmed = this.txt.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
        const inputBuffer = tf.buffer([1, (mt).max_len], "float32");
        trimmed.forEach((word, i) => inputBuffer.set(mt.word_index[word] + mt.index_from, 0, i));
        const input = inputBuffer.toTensor();
        const predictOut = m.predict(input);
        const score = predictOut.dataSync()[0];
        predictOut.dispose();

        console.log('Positivity: ' + (score*100).toFixed(0) +'%');
        
        showResult(score);


   }

}

export default Prediction;