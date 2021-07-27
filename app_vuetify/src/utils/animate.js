import anime from "animejs";
export function aboutIn() {
  let width = window.innerWidth;
  let elements = document.querySelector("#aboutBase");
  anime({
    direction: "reverse",
    targets: elements,
    translateX: width,
    duration: 1000,
    endDelay: 500,
    opacity: ["100%", "0%"],
    easing: "cubicBezier(1.000, -0.020, 1.000, 0.360)",
    // easing: "cubicBezier(0.250, 0.100, 0.250, 1.000)",
  });
}
export function aboutOut() {
  let width = window.innerWidth;
  let elements = document.querySelector("#aboutBase");
  anime({
    targets: elements,
    translateX: width,
    duration: 1000,
    opacity: ["100%", "0%"],
    easing: "cubicBezier(0.250, 0.100, 0.250, 1.000)",
  });
}

export function newIn(from) {
  let width;
  if (from === "left") {
    width = -window.innerWidth;
  } else if (from === "right") {
    width = window.innerWidth;
  }
  let elements = document.querySelector("#newBase");
  anime({
    direction: "reverse",
    targets: elements,
    translateX: width,
    duration: 1000,
    endDelay: 500,
    opacity: ["100%", "0%"],
    easing: "cubicBezier(1.000, -0.020, 1.000, 0.360)",
    // easing: "cubicBezier(0.250, 0.100, 0.250, 1.000)",
  });
}

export function newOut(to) {
  let width;
  if (to === "left") {
    width = -window.innerWidth;
  } else if (to === "right") {
    width = window.innerWidth;
  }
  let elements = document.querySelector("#newBase");
  anime({
    targets: elements,
    translateX: width,
    duration: 1000,
    opacity: ["100%", "0%"],
    // easing: "cubicBezier(1.000, -0.020, 1.000, 0.360)",
    easing: "cubicBezier(0.250, 0.100, 0.250, 1.000)",
  });
}
