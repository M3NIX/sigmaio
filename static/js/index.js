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

function copy() {

  let resultCode = document.getElementById('result-code');
  navigator.clipboard.writeText(resultCode.value);

  halfmoon.initStickyAlert({
    content: "It is in your clipboard",
    alertType: "alert-success",
    title: "Copied query",
    timeShown: 2000
  })
}

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

const cli = () => {
  let cliCode = document.getElementById('cli-code');
  let pipeline = document.getElementById('pipeline-select').value
  let target = document.getElementById('target-select').value
  let format = document.getElementById('format-select').value

  if (!pipeline){
    console.log(pipeline)
    cliCode.innerHTML = "sigma convert -t " + target + " -f " + format + " rule.yml"
  }
  else {
    cliCode.innerHTML = "sigma convert -p " + pipeline + " -t " + target + " -f " + format + " rule.yml"
  }
  Prism.highlightElement(cliCode); // rerun code highlighting
}

const convert = () => {

  let resultCode = document.getElementById('result-code');

  // start loading animation
  let count = 0
  loadingAnimation = setInterval(function () {
    dots = count % 4
    resultCodebox.innerHTML = "Converting" + ".".repeat(dots)
    count++
  }, 500);

  // get form values
  let sigma = document.getElementById('input-textarea').value
  let pipeline = document.getElementById('pipeline-select').value
  let target = document.getElementById('target-select').value
  let format = document.getElementById('format-select').value

  // create json object
  const params = {
    rule: btoa(sigma),
    pipeline: pipeline,
    target: target,
    format: format
  };


  // send post request
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(e) {
    if(xhr.readyState === 4){
      if(xhr.status === 200 ){
        clearInterval(loadingAnimation); // stop loading Animation
        // write converted querie to output
        resultCode.innerHTML = xhr.response
        resultCode.value = xhr.response
        Prism.highlightElement(resultCode); // rerun code highlighting
      }
      else if(xhr.status === 500){
        clearInterval(loadingAnimation); // stop loading Animation
        resultCode.innerHTML = "Error: Something went wrong"
      }
    }
  }
  xhr.open("post", window.location.origin + "/sigma", true)
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(params));
}
