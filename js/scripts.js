/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

// Scroll reveal (pictures intro)
$(document).on("scroll", function() {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".tag");
  
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      var tagBottom = $(tag).position().top + $(tag).outerHeight(); // Calculate the bottom of the element
  
      if (tagBottom > pageTop && tagBottom < pageBottom) {
        $(tag).addClass("visible");
      } else {
        $(tag).removeClass("visible");
      }
    }
  });
  
// Reload handler
  window.onload = function() {
    // Check if the page should scroll to the top
    const shouldScroll = new URLSearchParams(window.location.search).get('scrollToTop');
  
    if (shouldScroll) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  };
  
  
// Typewriter in view
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function handleScroll() {
    var element = document.querySelector('.line-1');
  
    if (isElementInViewport(element)) {
      element.classList.add('visible');
      window.removeEventListener('scroll', handleScroll);
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  handleScroll(); // Initial check on page load
  
  
  