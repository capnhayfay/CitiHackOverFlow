import React, { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "../view/Dashboard"
import { Card } from "./Card"
import { AddCard } from "./AddCard"
export const Carousel = () => {
  useEffect(() => {const track = document.getElementById("image-track");
  if (track) {
    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }
    const handleOnMove = e => {
      if(track.dataset.mouseDownAt === "0") return;
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -50,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      
      track.dataset.percentage = nextPercentage;
      
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    }
    window.onmousedown = e => handleOnDown(e);
    window.ontouchstart = e => handleOnDown(e.touches[0]);
    window.onmouseup = e => handleOnUp(e);
    window.ontouchend = e => handleOnUp(e.touches[0]);
    window.onmousemove = e => handleOnMove(e);
    window.ontouchmove = e => handleOnMove(e.touches[0]);
  }}, []); 

  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    "https://images.livemint.com/img/2022/04/07/1600x900/citi_1649360393369_1649360406447.jpg",
    "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80",
    "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80",
    "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Individual Cards
  const [expanded, setExpanded] = useState(false);

  const expandCard = (card) => {
    setExpanded(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeExpandedCard = () => {
    setExpanded(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return(
    <section className="carousel" id="carousel">
      {selectedImage !== null && (
          <div className="modal-content">
            <img src={images[selectedImage]} alt={`Image ${selectedImage}`} className="modal-image" draggable='false'/>
        </div>
    )}
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <div><Card/></div>
        <div><Card/></div>
        <div><AddCard/></div>
      </div>

      

    
    </section>
  )
}