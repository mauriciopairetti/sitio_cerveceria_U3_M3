

function Mostrar (){
    var container = document.getElementsByClassName("container_registro")[0];  
     
    if (container.style.visibility =="hidden"){
        
        
        container.style.visibility = "visible";
        container.scrollIntoView(true);
        


    }else{
        container.style.visibility ="hidden";
        container.scrollIntoView(false);
        window.scrollTo(0, 3395);
            }
}




