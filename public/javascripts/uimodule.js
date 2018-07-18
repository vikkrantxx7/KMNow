var loginContainer = document.body.firstElementChild.lastChild;

function displayBlock(){
    loginContainer.style.display = 'block';
    setTimeout(function(){loginContainer.style.opacity = 1;},100);
}