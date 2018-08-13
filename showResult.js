import screem from './screem.jpg';

  const showResult =  (score) => {

      const elem = document.getElementById("Div1");    
        if (elem !== null){
            elem.parentNode.removeChild(elem);
          }

      const div = document.createElement('div');
      div.setAttribute("id", "Div1");
      document.body.appendChild(div);
      div.style.marginBottom = '10px';

      const h1 = document.getElementById("h1"); 

      const infoText = document.createElement('span');
      infoText.innerText = (`Your positivity is at  ${(score*100).toFixed(0)}%`);
      div.appendChild(infoText);


      if (  (score*100) < 2) {
      infoText.style.color = 'darkred';
      h1.style.color = 'red';
      const IMAGE_SIZE = 180;
      const container = document.getElementById('Div1');
      const a0 = document.createElement("br");
      a0.setAttribute("id", "br");
      const a1 = container.appendChild(a0);

      const a2 = document.createElement('img');
      a2.setAttribute("id", "imgx");
      a2.setAttribute("alt", "1");
      a2.setAttribute("className", "y");
      a2.src = screem;
      a2.width = IMAGE_SIZE;
      a2.height = IMAGE_SIZE;
      const a3 = container.appendChild(a2);

      } else if (score*100 < 40) {
        infoText.style.color = 'darkred';
        h1.style.color = 'red';
      } else if (60>= score*100) {
        infoText.style.color  = 'black';
        h1.style.color = 'white';
      } else if ( score*100 > 60) {
        infoText.style.color = 'darkgreen';
        h1.style.color = 'lightgreen';
      }

  };

  export default showResult