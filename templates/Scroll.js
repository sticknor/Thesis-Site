function loadScroll(page, pageTitle) {

  updateMenu(pageTitle);
  $("#page").empty();

  $("#page").html("Scroll for "+pageTitle);
}

class Scroll extends Page {
  render() {
  	this.setupPage()
    console.log(this.data);
    for (var rowIndex in this.data.rows) {
    	var row = this.data.rows[rowIndex];

    	if (row["imageurl"] !== undefined) {
	    	var image = $("<img>");
		    image.attr("src", row["imageurl"]);
		    image.addClass("scrollImage");
		    $("#page").append(image);
    	}

	    if (row["title"] !== undefined) {
	      var title = $("<div>");
	      title.html(row["title"]);
	      title.addClass("imageTitle");
	      $("#page").append(title);
	    }

	    var detailsString = "";
	    if (row["medium"] !== undefined) {
	      detailsString+=row["medium"]+" &#8226; "
	    }
	    if (row["dimensions"] !== undefined) {
	      detailsString+=row["dimensions"]+" &#8226; "
	    }
	    if (row["year"] !== undefined) {
	      detailsString+=row["year"]+" &#8226; "
	    }
	    if (detailsString !== "") {
	      var details = $("<div>");
	      details.html(detailsString.substring(0, detailsString.length-9));
	      details.addClass("scrollDetails");
	      $("#page").append(details);
	    }


    }
    $("#page").append("PLAE")
  }
}
