  const Loader =  (modelLoad) => {

      if (modelLoad !=="") {
          const elem1 = document.getElementById('loading-message');
          elem1.style.display = 'none';
          const elem2 = document.getElementById('sk-cube-grid');
          elem2.style.display = 'none';
          const elem3 = document.getElementById('review-text');
          elem3.style.display = 'inline';
       }

  	};

export default Loader