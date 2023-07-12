const imgslide=document.querySelector(".img-slide");
const images=document.querySelectorAll(".img-slide img");
document.querySelector(".img-slide").style.width=images[0].clientWidth;


let counter=1;
const leftbtn=document.querySelector(".leftbtn");
const rightbtn=document.querySelector(".rightbtn");

let size=images[0].clientWidth;

imgslide.style.transform='translateX('+ (-size * counter)+'px)';

rightbtn.addEventListener("click",()=>{
    if(counter>=images.length-1) return;
    imgslide.style.transition='transform 0.3s ease-in-out';
    counter++;
    imgslide.style.transform='translateX('+(-size * counter)+'px)';
});

leftbtn.addEventListener("click",()=>{
    if(counter<=0) return;
    imgslide.style.transform='transform 0.3s ease-in-out';
    counter--;
    imgslide.style.transform='translateX('+(-size*counter)+'px)';
});

imgslide.addEventListener("transitionend",()=>{
    if(images[counter].className =='lastimg') {
        imgslide.style.transition='none';
        counter=images.length-2;
        imgslide.style.transform='translateX('+ (-size*counter)+'px)';
    }

    if(images[counter].className=='firstimg'){
        imgslide.style.transition='none';
        counter=images.length-counter;
        imgslide.style.transform='translateX('+ (-size*counter)+'px)';
    }
});
