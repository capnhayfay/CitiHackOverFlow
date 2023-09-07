import React, { useState,useEffect } from "react";
import Simplert from 'react-simplert'

export const AddCard = () => {
  const [expanded, setExpanded] = useState(false);

  const expandCard = (card) => {
    setExpanded(!expanded);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeExpandedCard = () => {
    setExpanded(false);
  };
  /*
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    
  }, []);
  
   
  const handleCardClick = (card) => {
    const expandedImage = document.getElementById('expandedImage');
    const expandedCard = document.querySelector('.expanded-card');
    
    expandedImage.src = card.querySelector('img').src;
    expandedCard.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    setTimeout(function () {
      expandedCard.style.opacity = 1;
    }, 10); // Delay for smooth transition
  }


    const handleCardClick = (event) => {
    const clickedImageSrc = event.target.getAttribute('data-src');
    if (clickedImageSrc) {
      setExpandedImage(clickedImageSrc);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  const expandCard
 = () => {
    setExpandedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', handleCardClick);
  });

  return () => {
    document.querySelectorAll('.card').forEach((card) => {
      card.removeEventListener('click', handleCardClick);
    });
  };
  */

  const [stock, setStock] = useState('');
  const [weightage, setWeightage] = useState('');
  const [portfolioData, setPortfolioData] = useState([]);

  const clearInputs = () => {
    setStock('');
    setWeightage('');
  };

  const addEntry = () => {
    if (stock && weightage) {
      const newEntry = { stock, weightage };
      setPortfolioData([...portfolioData, newEntry]);
      clearInputs();
    }
  };
  
  return(
    <section className="cards" id="cards">
      <div className='card' onDoubleClick={()=>expandCard(this)}>
      <div><h1>Create Portfolio</h1>
    <div className="createPortfolio">
    <input
        type="text"
        name="u"
        placeholder="stock"
        required="required"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <input
        type="text"
        name="p"
        placeholder="weightage"
        required="required"
        value={weightage}
        onChange={(e) => setWeightage(e.target.value)}
      />
      <button onClick={addEntry} class="btn3">+</button>
    </div>
      <table className="table">
          <thead className="thead-dark">
          <tr>
              <th> Stocks </th>
              <th> Weightage </th>
            </tr>
          </thead>
          <tbody>
          {portfolioData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.stock}</td>
              <td>{entry.weightage}</td>
            </tr>
          ))}
          </tbody>
        </table>


      <a href="#"><div id="btn2">Clear</div></a>
      <a href="#"><div class="btn" draggable='false'>Submit</div></a>

  
</div>
      </div>

    </section>
  )
}/*
onDoubleclick={()=>expandCard()}
{report.map((row, i) => (
*/