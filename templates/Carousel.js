
class Carousel extends Page {
  subOptions;

  constructor(data) {
    super(data);

    $(window).resize(function() {
      this.render();
    });

    this.subOptions = Object.assign({}, this.data.subOptions);
    this.subOptions[this.data.hash] = { "hash" : this.data.hash, rows: this.data.rows, title: this.data.title, index: 0, isThumbnailView: false };
    for (var subOption in this.subOptions) {
      this.subOptions[subOption].index = 0;
    }
  }


  renderGrid() {
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
      //image.attr("id", "gridImage");
      image.load(function() {
        console.log("Image loaded")
        magicGrid.positionItems();
      });
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

    let magicGrid = new MagicGrid({
      container: "#grid", // Required. Can be a class, id, or an HTMLElement.
      static: true, // Required for static content.
      animate: false, // Optional.
      gutter: 30,
    });
    magicGrid.listen();
    magicGrid.positionItems();

  }

  renderThumbnailView() {
    var thumbnailGrid = $("<div>");
    thumbnailGrid.addClass("thumbnailGrid");

    for (var i in this.subOptions[getCurrentHash()].rows) {
      var imageData = this.subOptions[getCurrentHash()].rows[i];

      var thumbnailClick = function (event) { 
        this.setIndex(event.data.i); 
      }

      var thumbnail = $("<img>");
      thumbnail.attr("src", imageData.thumbnail || imageData.imageurl);
      thumbnail.addClass("thumbnail");
      thumbnail.on("click", {i}, thumbnailClick.bind(this));

      thumbnailGrid.append(thumbnail);
    }
      
    $("#page").append(thumbnailGrid);
  }

  renderCarouselView() {
    $("#carouselControlsContainer").remove();

    var carouselControlsContainer = $("<div>");
    carouselControlsContainer.attr("id", "carouselControlsContainer");

    var imageData = this.subOptions[getCurrentHash()].rows[this.subOptions[getCurrentHash()].index];

    var image = $("<img>");
    image.attr("src", imageData["imageurl"]);
    image.attr("id", "fullImage");
    $("#page").append(image);

    var imageDetails = $("<div>");
    imageDetails.addClass("imageDetailsContainer");

    if (imageData["title"] !== undefined) {
      var title = $("<div>");
      title.html(imageData["title"]);
      title.addClass("imageTitle");
      imageDetails.append(title);
    }

    var detailsString = makeDetailsLine([imageData["medium"], imageData["dimensions"], imageData["year"]]);
    if (detailsString !== "") {
      var details = $("<div>");
      details.html(detailsString);
      details.addClass("imageDetails");
      imageDetails.append(details);
    }

    var carouselIndexDisplay = $("<div>");
    carouselIndexDisplay.attr("id", "carouselIndexDisplay");
    carouselIndexDisplay.html((parseInt(this.subOptions[getCurrentHash()].index)+1)+" of "+parseInt(this.subOptions[getCurrentHash()].rows.length));
    var carouselControls = $("<div>");
    carouselControls.attr("id", "carouselControls");
    var carouselControlsPrev = $("<div>");
    carouselControlsPrev.html("&#171;");
    carouselControlsPrev.addClass("clickable");
    carouselControlsPrev.attr("id", "carouselControlPrev")
    carouselControlsPrev.on("click", this.prevIndex.bind(this));
    var carouselControlsNext = $("<div>");
    carouselControlsNext.html("&#187;");
    carouselControlsNext.addClass("clickable");
    carouselControlsNext.attr("id", "carouselControlNext")
    carouselControlsNext.on("click", this.nextIndex.bind(this));
    var carouselControlsShowThumbnails = $("<div>");
    carouselControlsShowThumbnails.html("Show Thumbnails");
    carouselControlsShowThumbnails.attr("id", "carouselControlShowThumbnails")
    carouselControlsShowThumbnails.addClass("clickable");
    carouselControlsShowThumbnails.on("click", this.showThumbnails.bind(this));
    carouselControls.append(carouselControlsPrev);
    carouselControls.append(carouselIndexDisplay);
    carouselControls.append(carouselControlsNext);
    
    carouselControlsContainer.append(imageDetails);
    carouselControlsContainer.append(carouselControls);
    carouselControlsContainer.append(carouselControlsShowThumbnails);

    $("#menuContainer").append(carouselControlsContainer);
  }

  showThumbnails() {
    this.subOptions[getCurrentHash()].isThumbnailView = true;
    this.render()
  }

  prevIndex() {
    if (this.subOptions[getCurrentHash()].index === 0) {
      this.setIndex(this.subOptions[getCurrentHash()].rows.length - 1)
    } else {
      this.setIndex(this.subOptions[getCurrentHash()].index - 1);
    }
  }

  nextIndex() {
    this.setIndex((this.subOptions[getCurrentHash()].index + 1) % this.subOptions[getCurrentHash()].rows.length);
  }

  setIndex(index) {
    this.subOptions[getCurrentHash()].index = parseInt(index);
    this.subOptions[getCurrentHash()].isThumbnailView = false;
    this.render()
  }

  render() {
    this.setupPage();
    if (this.subOptions[getCurrentHash()].isThumbnailView) {
      this.renderThumbnailView();
    } else {
      this.renderCarouselView();
    }
  }
}