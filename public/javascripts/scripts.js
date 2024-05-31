

function Mostrar (){
    var container = document.getElementsByClassName("container_mensaje")[0];  
    
     
    if (container.style.visibility =="hidden"){
        
        
        container.style.visibility = "visible";
        container.scrollIntoView(true);

        


    }else{
        container.style.visibility ="hidden";
        container.scrollIntoView(false);
        window.scrollTo(0, 3395);
            }
}




//   function cerrar_formulario() {
   
 
//     window.close();
    
    
// }

// // const openModal = document.querySelector('.hero__cta');
// const modal = document.querySelector('.modal');
// const closeModal = document.querySelector('.modal__close');

// openModal.addEventListener('click', (e)=>{
//     e.preventDefault();
//     modal.classList.add('modal--show');
// });

// closeModal.addEventListener('click', (e)=>{
//     e.preventDefault();
//     modal.classList.remove('modal--show');
// });


 




