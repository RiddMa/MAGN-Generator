import anime from "animejs";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const easeIn = "cubicBezier(1,0,.6,-0.1)";
const easeOut = "cubicBezier(0.4,1.1,0,1)";

const easeCurve = CustomEase.create("custom", "0.35,1.15,0.1,1");

export function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function gsapRouteEnterFrom(direction, el, done) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const duration = 1;
  switch (direction) {
    case "right": {
      gsap.from(el, {
        duration: duration,
        ease: easeCurve,
        x: width,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
    case "left": {
      gsap.from(el, {
        duration: duration,
        ease: easeCurve,
        x: -width,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
    case "up": {
      gsap.from(el, {
        duration: duration,
        ease: easeCurve,
        y: -height,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
    case "down": {
      gsap.from(el, {
        duration: duration,
        ease: easeCurve,
        y: height,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
  }
}

export function gsapRouteLeaveWhen(direction, el, done) {
  el.style.position = "absolute";
  const width = window.innerWidth;
  const height = window.innerHeight;
  const duration = 1;
  switch (direction) {
    // 与enter配合，方向颠倒
    case "right": {
      gsap.to(el, {
        duration: duration,
        ease: easeCurve,
        x: -width,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
    case "left": {
      gsap.to(el, {
        duration: duration,
        ease: easeCurve,
        x: width,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
    case "up": {
      gsap.to(el, {
        duration: duration,
        ease: easeCurve,
        y: height,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
    case "down": {
      gsap.to(el, {
        duration: duration,
        ease: easeCurve,
        y: -height,
        autoAlpha: 0,
        clearProps: "all",
        onComplete: done,
      });
      break;
    }
  }
}

export function gsapListItemEnter(el, done, delay) {
  gsap.from(el, {
    duration: 1,
    delay: delay,
    ease: easeCurve,
    height: 0,
    y: 500,
    autoAlpha: 0,
    clearProps: "all",
    onComplete: done,
  });
}

export function gsapListItemLeave(el, done) {
  // el.style.position = "absolute";
  gsap.to(el, {
    duration: 1,
    ease: easeCurve,
    scale: 0,
    height: 0,
    autoAlpha: 0,
    clearProps: "all",
    onComplete: done,
  });
}

export function gsapExpandIn(el, done) {
  gsap.from(el, {
    duration: 0.5,
    ease: easeCurve,
    autoAlpha: 0,
    height: 0,
    clearProps: "all",
    onComplete: done,
  });
}

export function gsapExpandOut(el, done) {
  gsap.to(el, {
    duration: 0.5,
    ease: easeCurve,
    autoAlpha: 0,
    height: 0,
    clearProps: "all",
    onComplete: done,
  });
}

export function gsapFadeIn(el, done) {
  gsap.from(el, {
    duration: 0.5,
    ease: easeCurve,
    autoAlpha: 0,
    clearProps: "all",
    onComplete: done,
  });
}

export function gsapFadeOut(el, done) {
  el.style.position = "absolute";
  gsap.to(el, {
    duration: 0.5,
    ease: easeCurve,
    autoAlpha: 0,
    clearProps: "all",
    onComplete: done,
  });
}

export function routeEnter(direction, el, done) {
  el.style.position = "absolute";
  const width = window.innerWidth;
  const height = window.innerHeight;
  const easeCurve = "cubicBezier(1,0,.6,-0.1)";
  const duration = 1000;
  switch (direction) {
    case "right": {
      anime({
        direction: "reverse",
        targets: el,
        translateX: width,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
    case "left": {
      anime({
        direction: "reverse",
        targets: el,
        translateX: -width,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
    case "up": {
      anime({
        direction: "reverse",
        targets: el,
        translateY: height,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
    case "down": {
      anime({
        direction: "reverse",
        targets: el,
        translateY: -height,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
  }
  el.style.position = "relative";
}

export function routeLeave(direction, el, done) {
  // el.style.position = "absolute";
  const width = window.innerWidth;
  const height = window.innerHeight;
  const easeCurve = "cubicBezier(0.4,1.1,0,1)";
  const duration = 1000;
  switch (direction) {
    case "right": {
      anime({
        targets: el,
        translateX: -width,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
    case "left": {
      anime({
        targets: el,
        translateX: width,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
    case "up": {
      anime({
        targets: el,
        translateY: -height,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
    case "down": {
      anime({
        targets: el,
        translateY: height,
        duration: duration,
        opacity: ["100%", "0%"],
        easing: easeCurve,
        complete: done,
      });
      break;
    }
  }
}

export function tabItemEnter(el, done, delay) {
  anime({
    direction: "reverse",
    targets: el,
    duration: 1000,
    opacity: ["100%", "0%"],
    translateY: 500,
    easing: easeIn,
    complete: done,
    endDelay: delay,
  });
}

export function tabItemLeave(el, done) {
  el.style.position = "absolute";
  anime({
    targets: el,
    duration: 1000,
    opacity: ["100%", "0%"],
    scale: 0,
    // translateY: -window.innerHeight,
    easing: easeOut,
    complete: done,
  });
}

export function fadeIn(el, done) {
  anime({
    targets: el,
    duration: 500,
    opacity: ["0%", "100%"],
    easing: easeIn,
    complete: done,
  });
}

export function fadeOut(el, done) {
  el.style.position = "absolute";
  anime({
    targets: el,
    duration: 500,
    opacity: ["100%", "0%"],
    easing: easeOut,
    complete: done,
  });
}
