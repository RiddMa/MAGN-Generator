import anime from "animejs";
export function enter(direction, el, done) {
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

export function leave(direction, el, done) {
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
  // el.style.position = "relative";
}
