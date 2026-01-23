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

function followPath() {
  // gsap.fromTo(".draw-path",
  //   { strokeDashoffset: 4000 },
  //   {
  //     strokeDashoffset: 0,
  //     duration: 5,
  //     ease: "power2.out",
  //     scrollTrigger: {
  //       trigger: "#page2",
  //       scroller: "#main", // remove if not using locomotive
  //       start: "top 50%",
  //       once: true,
  //       // markers: true
  //     }
  //   }
  // );

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
      trigger: "#page2",
      scroller: "#main",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
  });
}

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
bannerText();

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