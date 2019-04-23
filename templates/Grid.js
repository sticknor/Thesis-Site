class Grid extends Page {
  render() {
    this.setupPage()

    var grid = $("<div>");
    grid.attr("id", "grid");
    $("#page").append(grid);

    for (var i in this.data.rows) {
      var work = this.data.rows[i];
      var gridItem = $("<div>");
      gridItem.addClass("gridItem");

      var image = $("<img>");
      image.attr("src", work["imageurl"]);
      image.attr("id", "gridImage");
      
      // Desktop version
      if (window.innerWidth > 850) { 
        image.load(function() {
          console.log("Image loaded")
          magicGrid.positionItems();
        });
      }

      gridItem.append(image);
      
      var imageDetails = $("<div>");
      if (work["title"] !== undefined && work["title"] !== "") {
        var title = $("<div>");
        title.html(work["title"]);
        title.addClass("imageTitle");
        imageDetails.append(title);
      }
      var detailsString = makeDetailsLine([work["medium"], work["dimensions"], work["year"]]);
      if (detailsString !== "") {
        var details = $("<div>");
        details.html(detailsString);
        details.addClass("imageDetails");
        imageDetails.append(details);
      }
      $(gridItem).append(imageDetails);

      $("#grid").append(gridItem);
    }

    // Desktop version
    if (window.innerWidth > 850) { 
      let magicGrid = new MagicGrid({
        container: "#grid", // Required. Can be a class, id, or an HTMLElement.
        static: true, // Required for static content.
        animate: false, // Optional.
        gutter: 30,
      });
      magicGrid.listen();
      magicGrid.positionItems();
    }

  }
}
