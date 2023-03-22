'use strict';

{
  const open = document.getElementById('open');
  const overlay =document.querySelector('.overlay');
  const close= document.getElementById('close');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const carousel = document.getElementById('carousel');
  const nav = document.getElementById('nav');
  const greeting = document.getElementById('content');
  const slides =  carousel.children;
  const dots = [];
  // const target = document.querySelector('.content');
  let currentIndex = 0;

  
  
  function updateButton(){
    prev.classList.remove('hidden');
    next.classList.remove('hidden');
  
  if(currentIndex === 0){
    prev.classList.add('hidden');
   }
  
   if(currentIndex === slides.length - 1){
    next.classList.add('hidden');
   }
  }
  
 function moveSlide(){
  const slideWidth = slides[0].getBoundingClientRect().width;
  carousel.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`
 }
 
 function setupDots(){
   for(let i = 0; i < slides.length; i++){
     const button = document.createElement('button');
     button.addEventListener('click',()=>{
       currentIndex = i;
       updateDots();
       moveSlide();
       updateButton();
     });
     dots.push(button);
     nav.appendChild(button);
   }
   dots[0].classList.add('current');
 }
 
 function updateDots(){
   dots.forEach(function (dot){
     dot.classList.remove('current');
   });
   dots[currentIndex].classList.add('current');
 }
 
 updateButton();
 setupDots();
  
 next.addEventListener('click',()=>{
   currentIndex++;
   moveSlide();
  updateButton();
  updateDots();

 });
 
 prev.addEventListener('click',()=>{
   currentIndex--;
   moveSlide();
   updateButton();
   updateDots();
 });
  
  open.addEventListener('click',() => {
  overlay.classList.add('show');
  open.classList.add('hide');
  close.classList.add('hide');
});

close.addEventListener('click', function(){
  overlay.classList.remove('show');
  open.classList.remove('hide');
  close.classList.remove('hide');
  });
  
// Intersection Observer API


  function callback(entries, obs) {
    if (!entries[0].isIntersecting) {
      return;
    }

    entries[0].target.classList.add('appear');
    obs.unobserve(entries[0].target);
  }

  const option = {
    threshold: 0.2,
  };

const observer = new IntersectionObserver(callback,option);

observer.observe(greeting);
}


// slider


let count = 0;

function slideImage() {
  count++;
  if (count >= 5) count = 1;
  for(let i = 1; i < 5; i++){
     if(count === i) {
       document.querySelector(`body > div > ul > li:nth-child(${i}) > img`).style.display = "block";
       document.querySelector(`body > div > ul > li:nth-child(${i}) > img`).style.width = "100%";
       document.querySelector(`body > div > ul > li:nth-child(${i}) > img`).style.height = "100%";
       
     } else {
       document.querySelector(`body > div > ul > li:nth-child(${i}) > img`).style.display = "none";
       document.querySelector(`body > div > ul > li:nth-child(${i}) > img`).style.width = "120%";
       document.querySelector(`body > div > ul > li:nth-child(${i}) > img`).style.height = "120%";       
     }
  } 
  //秒数の指定
  setTimeout("slideImage()", 16000);
}
 
window.addEventListener('load', (event) => {
  // load時初回呼び出し
  slideImage();
   
});
   









