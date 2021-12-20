function getCurrentHash() {
  return window.location.hash.substring(1)
}

function getCurrentPage() {
  return getCurrentHash().split("-")[0]
}

function makeDetailsLine(details) {
  var spacer = " &#183; ";
  var detailsLine = "";
  for (var i=0; i<details.length; i++) {
    if (details[i] !== undefined && details[i] !== "<b>undefined</b>" && details[i] !== "<i>undefined</i>") {
      detailsLine+=details[i]+spacer
    }
  }
	return detailsLine.substring(0, detailsLine.length-spacer.length);
}

function firstOr(array, fallback) {
  if (array === undefined || array.length < 1) { return fallback; }
  else { return array[0]; }
}