class About extends Page {
  renderParagraph(rowData) {
    var paragraph = $("<div>");
    paragraph.addClass("aboutParagraph");
    paragraph.html(rowData.text);
    $("#about"+rowData.heading).append(paragraph);
  }

  renderMultilineA(rowData) {
    var multilineA = $("<div>");
    multilineA.addClass("aboutmultilineA");

    var lineAText = makeDetailsLine([rowData.site, rowData.place, rowData.year])
    if (lineAText !== "") {
      var lineA = $("<div>");
      lineA.html(lineAText);
      multilineA.append(lineA);
    }

    var lineBText = makeDetailsLine([rowData.role, rowData.name]);
    if (lineBText !== "") {
      var lineB = $("<div>");
      lineB.html(lineBText);
      multilineA.append(lineB);
    }

    var lineCText = makeDetailsLine([rowData.text]);
    if (lineCText !== "") {
      var lineC = $("<div>");
      lineC.html(lineCText);
      multilineA.append(lineC);
    }
    
    $("#about"+rowData.heading).append(multilineA);
  }

  renderMultilineB(rowData) {
    var multilineB = $("<div>");
    multilineB.addClass("aboutmultilineB");

    var lineAText = makeDetailsLine(["<b>"+rowData.role+"</b>"]);
    if (lineAText !== "") {
      var lineA = $("<div>");
      lineA.html(lineAText);
      multilineB.append(lineA);
    }

    var lineBText = makeDetailsLine([rowData.site, rowData.place, rowData.year]);
    if (lineBText !== "") {
      var lineB = $("<div>");
      lineB.html(lineBText);
      multilineB.append(lineB);
    }

    var lineCText = makeDetailsLine([rowData.text]);
    if (lineCText !== "") {
      var lineC = $("<div>");
      lineC.html(lineCText);
      multilineB.append(lineC);
    }

    // Add bullets
    if (rowData.bullet) {
      multilineB.append("<div>"+"&#8226; "+rowData.bullet+"<div>");
      var bulletCount = 1;
      var bullets = true;
      while (bullets) {
        bulletCount++;
        if (rowData["bullet_"+bulletCount]) {
          multilineB.append($("<div>"+"&#8226; "+rowData["bullet_"+bulletCount]+"<div>"));
        } else {
          bullets = false;
        }
      }
    }
    
    $("#about"+rowData.heading).append(multilineB);
  }

  renderSortedList(rowData) {
    var sortedContainer;
    if ($("#about"+rowData.heading+rowData.year).length) {
      sortedContainer = $("#about"+rowData.heading+rowData.year);
    } else {
      sortedContainer = $("<div>");
      sortedContainer.attr("id", "about"+rowData.heading+rowData.year);
      var sortedContainerHeading = $("<div>");
      sortedContainerHeading.html(rowData.year);
      sortedContainerHeading.addClass("sortedContainerHeading");
      sortedContainer.append(sortedContainerHeading);
      sortedContainer.addClass("sortedContainer");
      $("#about"+rowData.heading).append(sortedContainer);
    } 

    var sortedLineText = makeDetailsLine([rowData.role, "<i>"+rowData.name+"</i>", rowData.site, rowData.place, rowData.text]);
    if (sortedLineText !== "") {
      var sortedLine = $("<div>");
      sortedLine.html(sortedLineText);
      $("#about"+rowData.heading+rowData.year).append(sortedLine);
    }
  }

  render() {
  	this.setupPage()

    var rows = this.subOptions[getCurrentHash()].rows;
  	for (var row in rows) {
  		var rowData = rows[row];
  		// Add header
  		var container;
  		if ($("#about"+rowData.heading).length) {
  			container = $("#about"+rowData.heading)
  		} else {
  			container = $("<div>");
  			container.attr("id", "about"+rowData.heading);
        container.addClass("aboutContainer")
  			var containerHeading = $("<div>");
  			containerHeading.html(rowData.heading);
        if (rowData.heading) {
          containerHeading.addClass("aboutContainerHeading");
        }
  			container.append(containerHeading);
  			$("#page").append(container);
  		} 

  		switch (rowData.template) {
        case "paragraph":
          this.renderParagraph(rowData);
          break;
        case "multilineA":
          this.renderMultilineA(rowData);
          break;
        case "multilineB":
          this.renderMultilineB(rowData);
          break;
        case "sortedList":
          this.renderSortedList(rowData);
          break;
  		}
  	}
  }
}
