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
  let backend = $('#target-select').dropdown('get value');

  let options = $('#format-select').find("option[backend$=" + backend + "]")

	values = []
	options = [...options]
	options.forEach(option => {
		values.push({"value": option.value, "name": option.innerHTML})
	});
  $('#format-select').dropdown('change values', values);
  $('#format-select').dropdown('set selected', values[0].value);

}

const cli = () => {
	
  let cliCode = document.getElementById('cli-code');
  let pipeline = $('#pipeline-select').dropdown('get value');
  let target = $('#target-select').dropdown('get value');
  let format = $('#format-select').dropdown('get value');

	cliCommand = "sigma convert"
	pipeline.forEach(e => {
		cliCommand = cliCommand + " -p " + e
	});

	cliCommand = cliCommand + " -t " + target + " -f " + format + " rule.yml";
  cliCode.innerHTML = cliCommand;
  Prism.highlightElement(cliCode); // rerun code highlighting
}

const convert = () => {
  let resultCode = document.getElementById('result-code');

  // get form values
  let sigma = jar.toString()
  let pipeline = $('#pipeline-select').dropdown('get value');
  let target = $('#target-select').dropdown('get value');
  let format = $('#format-select').dropdown('get value');

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
        // write converted querie to output
        resultCode.innerHTML = xhr.response
        resultCode.value = xhr.response
        Prism.highlightElement(resultCode); // rerun code highlighting
      }
      else if(xhr.status === 500){
        resultCode.innerHTML = "Error: Something went wrong"
      }
    }
  }
  xhr.open("post", window.location.origin + "/sigma", true)
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(params));
}
