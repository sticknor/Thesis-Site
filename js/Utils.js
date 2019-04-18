function getCurrentHash() {
  return window.location.hash.substring(1)
}

function getCurrentPage() {
  return getCurrentHash().split("-")[0]
}

function makeDetailsLine(details) {
  var detailsLine = "";
  for (var i=0; i<details.length; i++) {
    if (details[i] !== undefined && details[i] !== "<b>undefined</b>" && details[i] !== "<i>undefined</i>") {
      detailsLine+=details[i]+" &#8226; "
    }
  }
	return detailsLine.substring(0, detailsLine.length-9);
}

