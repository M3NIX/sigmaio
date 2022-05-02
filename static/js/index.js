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

const sleep = (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration));
}

const convert = async () => {
	let resultCodebox = document.getElementById('result-codebox');
  for(count = 0; count < 13; count++) {
    dots = count % 3 + 1
    resultCodebox.innerHTML = "Converting" + ".".repeat(dots)
    await sleep(500)
  }
  Prism.highlightAll();
}
