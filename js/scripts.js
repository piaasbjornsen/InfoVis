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
        var tagTop = $(tag).position().top;
        var tagBottom = tagTop + $(tag).outerHeight();
  
        if (tagTop >= pageTop && tagBottom <= pageBottom) {
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
  
  
  function isElementInViewport(el) {
    // Check if the element is null or undefined
    if (!el) {
      return false;
    }
  
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
 
  
// Highlight
document.addEventListener("DOMContentLoaded", function () {
    const highlightEffect = document.querySelector('.highlight-effect');

    highlightEffect.addEventListener('mouseover', function () {
        this.querySelector('.text-to-be').classList.add('highlighted');

    });

    highlightEffect.addEventListener('mouseout', function () {
      this.classList.remove('highlighted');
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const highlightEffect = document.querySelector('.highlight-effect');

    highlightEffect.addEventListener('mouseover', function () {
    });

    highlightEffect.addEventListener('mouseout', function () {
      this.querySelector('.highlighted').classList.remove('highlighted');
    });
  });



    $(function() {
        $('a[href*=#]').on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
        });
      });



// Used in:
// typewriter
document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Your D3.js code for the typewriter animation
        var text = d3.select(".anim-typewriter");

        text.transition()
          .duration(4000) // Adjust the duration based on your preference
          .tween("text", function () {
            var content = "First we need to understand what we mean by terrorism";
            var i = d3.interpolateString("", content);

            return function (t) {
              text.text(i(t));
            };
          });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  var typewriterElement = document.querySelector(".anim-typewriter");
  observer.observe(typewriterElement);
});
