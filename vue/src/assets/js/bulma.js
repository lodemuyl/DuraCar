/* eslint-disable */
document.addEventListener('DOMContentLoaded', function () {    
      // Get all "navbar-burger" elements
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      var $routers = Array.prototype.slice.call(document.querySelectorAll('.routerlink'), 0);
         // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {    
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {   
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);    
            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');    
          });
        });
      };
      if($routers.length > 0){
        $routers.forEach(($el) => {
          $el.addEventListener('click', () => {
            document.getElementById('navbarMenu').classList.remove("is-active");
            document.getElementById('navbarBurger').classList.remove("is-active");
          })
        })
      }
      //modal voor mijnautos te verwijderen
    
      
    });