var typed = new Typed(".Bhopal", {
    strings: ["the City of Lakes", "Bhopal", "IIT Bombay"],
    typeSpeed: 200,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

// -----------------------------------------------------------------------------------------------------

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
        };
    });
};

// -----------------------------------------------------------------------------------------------------

const button = document.querySelector('.about button');
const buttonWidth = button.clientWidth;
const buttonHeight = button.clientHeight;
const buttonStyles = button.getBoundingClientRect();

button.addEventListener('mouseenter', mouseEnter);
button.addEventListener('mouseleave', mouseLeave);

function mouseEnter(e) {
  // Figure out the co-ordinates of the cursor over the button
  // We will trigger the hover animation from that position
  const xPercent = ((e.clientX - buttonStyles.left) / buttonWidth) * 100;
  const yPercent = ((e.clientY - buttonStyles.top) / buttonHeight) * 100;
  
  // If the cursor is far from the center of the button the hover will be slower since we have more area to fill
  // To fix this we increase the animation speed the further you are from the center of the button
  let transitionMultiplier = xPercent < 50 ? ((xPercent - 50) * -1) / 50 : (xPercent - 50) / 50;
  const speed = 1.5;
  const speedBasedOnCursorPosition = speed - ((speed * 0.95 ) * transitionMultiplier);

  TweenMax.set('.mask', {
    opacity: 1,
    attr: {
      r: 0,
      cx: e.clientX - buttonStyles.left,
      cy: e.clientY - buttonStyles.top
    }
  });
  new TimelineMax().to('.mask', speedBasedOnCursorPosition, {
    ease: Power4.easeOut,
    attr: { r: buttonWidth * 0.35 }
  });
}

function mouseLeave() {
  const tl = new TimelineMax()
        .to('.mask', 0.2, {ease: Power1.easeOut, opacity: 0});
}

// -----------------------------------------------------------------------------------------------------