function locomotiveScript() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveScript();

function cursorEffect() {
  var page1Content = document.querySelector("#page1");
  var cursor = document.querySelector("#cursor");

  // page1Content.addEventListener("mousemove", function (move) {
  //   cursor.style.left = move.x + "px";
  //   cursor.style.top = move.y + "px";
  // });
  page1Content.addEventListener("mousemove", function (move) {
    gsap.to(cursor, {
      x: move.x,
      y: move.y,
    });
  });
  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();

function splitTexteffect() {
  // gsap.registerPlugin(SplitText);
  // console.clear();

  document.fonts.ready.then(() => {
    gsap.set(".split", { opacity: 1 });

    let split;

    SplitText.create(".split", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.lines, {
          duration: 0.6,
          yPercent: 120,
          opacity: 0,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            // markers: true
          },
        });
        return split;
      },
    });
  });
}
splitTexteffect();

function splitTexteffectPro() {
  // gsap.registerPlugin(SplitText);
  // console.clear();

  document.fonts.ready.then(() => {
    gsap.set("#page4 .split", { opacity: 1 });

    let split;

    SplitText.create("#page4 .split", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.lines, {
          duration: 0.6,
          yPercent: 120,
          opacity: 0,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 50%",
            end: "top 20%",
            // toggleActions: "play none none reverse",
            // markers: true
          },
        });
        // return split;
      },
    });
  });
}
splitTexteffectPro();

function followPath() {
  gsap.fromTo(
    ".draw-path",
    { strokeDashoffset: 2000 },
    {
      strokeDashoffset: 0,
      duration: 5,
      delay: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#page6",
        scroller: "#main",
        start: "top 80%",
        once: true,
        // markers: true
      },
    },
  );

  const path = document.querySelector(".draw-path");
  const length = path.getTotalLength();

  // prepare path
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  // scroll-controlled draw
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#page6",
      scroller: "#main",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
  });
}
followPath();

function bannerText() {
  var h1 = document.querySelector("#banner-text");
  var h1Text = h1.textContent;
  var textSplit = h1Text.split("");
  var clutter = "";

  textSplit.forEach((elem) => {
    clutter += `<span>${elem}</span>`;
  });
  h1.innerHTML = clutter;

  gsap.from("#banner-text span", {
    y: 120,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "expo.out",
  });
}
// bannerText();

function underlineButton() {
  const box = document.querySelector(".text-hover-box");
  const first = box.querySelector(".first");
  const second = box.querySelector(".second");
  const underline = box.querySelector(".underline");

  // measure widths once fonts are loaded
  window.addEventListener("load", () => {
    underline.style.width = first.offsetWidth + "px";
  });

  box.addEventListener("mouseenter", () => {
    underline.style.width = second.offsetWidth + "px";
  });

  box.addEventListener("mouseleave", () => {
    underline.style.width = first.offsetWidth + "px";
  });
}
// underlineButton();

gsap.to("#page5 .counter h5", {
  y: "-300%",
  duration: 1,
  ease: "power3.out",
  stagger: 0.03,
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 30%",
    once: true,
  },
});

function mediaexp() {
  let mm = gsap.matchmedia();
  mm.add({
    "(min-width: 769px)": function () {
      gsap.to(".portfolio-top-head h2", {
        x: 280,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#page6",
          scroller: "#main",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    },
    "(max-width: 769px)": function () {
      gsap.to(".portfolio-top-head h2", {
        x: 120,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#page6",
          scroller: "#main",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    },
  });
}
gsap.to(".portfolio-top-head h2", {
        x: 280,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#page6",
          scroller: "#main",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

function swipereffect() {
  // var swiper = new Swiper(".mySwiper", {
  //   slidesPerView: "auto",
  //   spaceBetween: 10,
  //   loop: true,
  //   autoplay: {
  //     delay: 2500,
  //     disableOnInteraction: false,
  //   },
  // });
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    loop: true,
    freeMode: true,
    freeModeMomentum: false,
    speed: 6000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    // allowTouchMove: false,
  });
}
swipereffect();

function loaderBannerAnimation() {
  var h1 = document.querySelector("#banner-text");
  var h1Text = h1.textContent;
  var textSplit = h1Text.split("");
  var clutter = "";

  textSplit.forEach((elem) => {
    clutter += `<span>${elem}</span>`;
  });
  h1.innerHTML = clutter;

  var tl = gsap.timeline();
  tl.from("#loader h3", {
    opacity: 0,
    x: 40,
    delay: 0.5,
    duration: 1,
    stagger: 0.1,
  });
  tl.to("#loader h3", {
    x: -20,
    opacity: 0,
    stagger: 0.1,
  });
  tl.to("#loader", {
    opacity: 0,
  });
  tl.from("#banner-text span", {
    y: 120,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: -0.5,
    ease: "expo.out",
  });
  tl.to("#loader", {
    display: "none",
  });
}

var h1 = document.querySelector("#banner-text");
var h1Text = h1.textContent;
var textSplit = h1Text.split("");
var clutter = "";

textSplit.forEach((elem) => {
  clutter += `<span>${elem}</span>`;
});
h1.innerHTML = clutter;

var tl = gsap.timeline();
tl.from("#loader h3", {
  opacity: 0,
  x: 40,
  delay: 0.5,
  duration: 1,
  stagger: 0.1,
});
tl.to("#loader h3", {
  x: -20,
  opacity: 0,
  stagger: 0.1,
});
tl.to(".rightside", {
  x: "100%",
  duration: 1,
});
tl.to(".leftside", {
  x: "-100%",
  duration: 1,
  delay: -1,
});
tl.to("#loader", {
  opacity: 0,
});
tl.from("#banner-text span", {
  y: 120,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  delay: -0.5,
  ease: "expo.out",
});
tl.to("#loader", {
  display: "none",
});

function videowrapperAnimation() {
  gsap.from(".videowrapper", {
    scale: 0.5,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
  });
}
// videowrapperAnimation();

function stickyNav() {
  const nav = document.querySelector("nav");

  ScrollTrigger.create({
    trigger: "body",
    scroller: "#main",
    start: "300 top",
    onEnter: () => nav.classList.add("active"),
    onLeaveBack: () => nav.classList.remove("active"),
  });
}
stickyNav();

function ToggleMenu() {
  var menu = document.querySelector(".menu");
  var body = document.body;
  var ntl = gsap.timeline();
  menu.addEventListener("click", function () {
    body.classList.toggle("toggle-menu");
    gsap.from(".toggle-menu .toggle ul a", {
      y: 120,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power4.out",
    });
  });
}
ToggleMenu();

var fh1 = document.querySelector("#footer-text");
var fh1Text = fh1.textContent;
var ftextSplit = fh1Text.split("");
var clutter = "";

ftextSplit.forEach((elem) => {
  clutter += `<span>${elem}</span>`;
});
fh1.innerHTML = clutter;

gsap.from("#footer-text span", {
  y: -120,
  opacity: 0,
  duration: 0.8,
  delay: 1,
  stagger: 0.1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".footer-wrapper",
    scroller: "#main",
    start: "top 70%",
    end: "top 20%",
    toggleActions: "play none none reverse",
  },
});

var footerBox = document.querySelector(".footer-wrapper");
var footerCursor = document.querySelector(".footer-circle");

footerBox.addEventListener("mousemove", function (flame) {
  gsap.to(footerCursor, {
    x: flame.x - 50,
    y: flame.y - 50,
    ease: "power3.out",
  });
});
footerBox.addEventListener("mouseenter", function () {
  gsap.to(footerCursor, {
    opacity: 0.7,
    scale: 1,
  });
});
footerBox.addEventListener("mouseleave", function () {
  gsap.to(footerCursor, {
    opacity: 0,
    scale: 0,
  });
});

underlineButton();
