import anime from "animejs";
const easeIn = "cubicBezier(1,0,.6,-0.1)";
const easeOut = "cubicBezier(0.4,1.1,0,1)";
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
  el.style.position = "absolute";
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
