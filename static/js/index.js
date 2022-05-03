/*
 * JS for Prism Live’s page, not part of the actual editor
 */

(async function($, $$) {

$$("textarea.language-html.fill").forEach(t => t.value = document.head.outerHTML);

var css = await fetch("static/css/prism-live.css");
css = await css.text();

$$("textarea.language-css.fill").forEach(t => {
	t.value = css;
	t.dispatchEvent(new InputEvent("input"));
});

var js = await fetch("static/js/prism-live.js");
js = await js.text();

$$("textarea.language-js.fill").forEach(t => {
	t.value = js;
	t.dispatchEvent(new InputEvent("input"));
});


})(Bliss, Bliss.$);

const showFormats = () => {
	let backendSelect = document.getElementById('target-select');
	let formatSelect = document.getElementById('format-select');
  let backend = backendSelect.value

  let formatOptions = [...formatSelect.children]
  isFirstSelected = false
  formatOptions.forEach(option => {
    if(option.getAttribute("backend") === backend ){
      option.hidden = false
      if(!isFirstSelected){
        option.selected = true
        isFirstSelected = true
      }
    }
    else {
      option.hidden = true
    }
  });

}

const convert = () => {
	let resultCodebox = document.getElementById('result-textarea').previousElementSibling.firstChild;
  let count = 0
  loadingAnimation = setInterval(function () {
    dots = count % 4
    resultCodebox.innerHTML = "Converting" + ".".repeat(dots)
    count++
  }, 500);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState === 4){
      if(xhr.status === 200 ){
        clearInterval(loadingAnimation);
        resultCodebox.innerHTML = xhr.response
        Prism.highlightElement(resultCodebox);
      }
    }
  }
  xhr.open("post", "http://localhost:8000/sigma", true)
  xhr.send();
}
