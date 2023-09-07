import React, { useState,useEffect } from "react";
import Simplert from 'react-simplert'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

export const Card = () => {
  const [expanded, setExpanded] = useState(false);

  const expandCard = (card) => {
    setExpanded(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeExpandedCard = () => {
    setExpanded(false);
  };

  const portfolio = {
    'Coal': '38',
    'Natural Gas': '23',
    'Hydro': '16',
    'Nuclear': '10',
    'Renewable': '6',
    'Other': '7',
  }

  return(
    <section className="cards" id="cards">
      <div className={`card ${expanded ? 'expanded' : ''}`} onDoubleClick={expandCard}>
      <div><h1>Portfolio</h1>
        
    <div class="box-container">
        <div class="box">
          <p class="text">cVar value</p>
        </div>
        
        <div class="box">
        <p class="text">cVar value</p>
        </div>
        

        <div class="box-extended">
          <p class="text">3 Headlines</p>
        </div>
      
        
        <Simplert
    showSimplert={expanded}
    type="success"
    title="Report Generated"
    message="Ready for Download"
    customCloseBtnText="Download"
  />

  
    </div>
  <a href="#"><div class="btn">Edit</div></a>

  <a href="#"><div id="btn2" onClick={()=> console.log(portfolio)}>Delete</div></a>
  </div>
  
</div>

    </section>

  )
}

/*onDoubleclick={()=>expandCard
()}*/