export function setCSSBlur(selector) {
  document.querySelector(selector).style.backdropFilter = "blur(5px)";
  document.querySelector(selector).style.webkitBackdropFilter = "blur(5px)";
}

export function unsetCSSBlur(selector) {
  document.querySelector(selector).style.backdropFilter = "";
  document.querySelector(selector).style.webkitBackdropFilter = "";
}
