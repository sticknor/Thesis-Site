class Scroll extends Page {

  constructor(data) {
    super(data);

    this.subOptions = Object.assign({}, this.data.subOptions);
    this.subOptions[this.data.hash] = { "hash" : this.data.hash, rows: this.data.rows, title: this.data.title, index: 0, isThumbnailView: false };
    for (var subOption in this.subOptions) {
      this.subOptions[subOption].index = 0;
    }
  }

  renderIntro(rowData) {
    var intro = $("<div>");
  	intro.addClass("scrollintro");

  	if (rowData.imageurl) {
  		var image = $("<img>");
  		image.addClass("scrollIntroImage");
  		image.attr("src", rowData.imageurl);
  		intro.append(image);
  	}

  	if (rowData.caption) {
  		var caption = $("<div>");
  		caption.addClass("scrollIntroCaption");
  		caption.html(rowData.caption);
  		intro.append(caption);
  	}

  	if (rowData.heading || rowData.subheading) {
  			var heading = $("<div>");
  			heading.html(makeDetailsLine(["<b>"+rowData.heading+"</b>", rowData.subheading]));
  			heading.addClass("scrollIntroHeading")
  	    intro.append(heading);
  	}

  	if (rowData.text) {
  		var text = $("<div>");
  		text.addClass("scrollIntroText");
  		text.html(rowData.text);
  		intro.append(text);
  	}

  	$("#page").append(intro);
  }


  renderBlock(rowData) {
  	var block = $("<div>");
  	block.addClass("scrollBlock");

  	if (rowData.heading || rowData.subheading) {
  			var heading = $("<div>");
  			heading.html(makeDetailsLine(["<b>"+rowData.heading+"</b>", rowData.subheading]));
  			heading.addClass("scrollBlockHeading")
  	    block.append(heading);
  	}

  	if (rowData.text) {
  		var text = $("<div>");
  		text.addClass("scrollBlockText");
  		text.html(rowData.text);
  		block.append(text);
  	}

  	if (rowData.imageurl) {
  		var image = $("<img>");
  		image.addClass("scrollBlockImage");
  		image.attr("src", rowData.imageurl);
  		block.append(image);
  	} else if (rowData.videourl) {
  		var videoWrapper = $("<div>");
  		videoWrapper.addClass("scrollBlockVideo");
  		var video = $("<iframe frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
  		video.attr("src", rowData.videourl);
  		videoWrapper.append(video);
  		block.append(videoWrapper);
  	}

  	if (rowData.caption) {
  		var caption = $("<div>");
  		caption.addClass("scrollBlockCaption");
  		caption.html(rowData.caption);
  		block.append(caption);
  	}

  	$("#page").append(block);
  }


  renderSortedList(rowData) {
    var sortedContainer;
    if ($("#scroll"+rowData.heading).length) {
      sortedContainer = $("#scroll"+rowData.heading);
    } else {
      sortedContainer = $("<div>");
      sortedContainer.attr("id", "scroll"+rowData.heading);
      var sortedContainerHeading = $("<div>");
      sortedContainerHeading.html(rowData.heading);
      sortedContainerHeading.addClass("sortedContainerHeading");
      sortedContainer.append(sortedContainerHeading);
      sortedContainer.addClass("sortedContainer");
      $("#page").append(sortedContainer);
    } 

    var sortedLineText = makeDetailsLine([rowData.role, "<i>"+rowData.name+"</i>", rowData.site, rowData.place, rowData.text]);
    if (sortedLineText !== "") {
    	var sortedLine;
    	if (rowData.texturl) {
    		var sortedLine = $("<a>");
    		sortedLine.attr("href", rowData.texturl);
    		sortedLine.attr("target", "_blank");
    		sortedLine.addClass("clickable line")
	      sortedLine.html(sortedLineText);
	      sortedContainer.append(sortedLine);
    	} else {
	      var sortedLine = $("<div>");
	      sortedLine.html(sortedLineText);
	      sortedContainer.append(sortedLine);
	    }
    }
  }

  render() {
  	this.setupPage();

  	var rows = this.subOptions[getCurrentHash()].rows;
  	for (var row in rows) {
  		var rowData = rows[row];

  		switch (rowData.template) {
        case "intro":
          this.renderIntro(rowData);
          break;
        case "block":
          this.renderBlock(rowData);
          break;
        case "sortedList":
          this.renderSortedList(rowData);
          break;
  		}
  	}


    $("#page").scrollTop(0);
  }
}
