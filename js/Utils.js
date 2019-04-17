function getCurrentHash() {
  return window.location.hash.substring(1)
}

function getCurrentPage() {
  return getCurrentHash().split("-")[0]
}

function makeDetailsString(details) {
	console.log(details)
	var detailsString = "";

    if (details["medium"] !== undefined) {
      detailsString+=details["medium"]+" &#8226; "
    }

    if (details["dimensions"] !== undefined) {
      detailsString+=details["dimensions"]+" &#8226; "
    }

    if (details["year"] !== undefined) {
      detailsString+=details["year"]+" &#8226; "
    }

	return detailsString.substring(0, detailsString.length-9);
}

