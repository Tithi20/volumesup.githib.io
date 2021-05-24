
// window.addEventListener('load',()=>{
//     console.log("abcd");
//     let loader=document.querySelector(".main_div");
//     console.log(loader);
//  setTimeout(()=>{ 
//     if(loader) 
//     loader.style.zIndex="-1";
//     loader.style.display="none";    },2000)  
// })
const handleLoader=()=>{
    let loader=document.getElementById('loaderId');
    console.log(loader);
 setTimeout(()=>{ 
    if(loader) 
    loader.style.zIndex="-1";
    loader.style.display="none";  },1000)  
}
