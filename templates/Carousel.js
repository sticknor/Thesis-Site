
class Carousel extends Page {
  index = 0;
  isThumbnailView = false;
  subOptions;

  constructor(data) {
    super(data);

    this.subOptions = Object.assign({}, this.data.subOptions);
    this.subOptions[this.data.hash] = { "hash" : this.data.hash, rows: this.data.rows, title: this.data.title };
  }

  renderThumbnailView() {
    var thumbnailGrid = $("<div>");
    thumbnailGrid.addClass("thumbnailGrid");

    for (var index in this.subOptions[getCurrentHash()].rows) {
      var imageData = this.subOptions[getCurrentHash()].rows[index];

      var thumbnailClick = function (event) { this.setIndex(event.data.index); }

      var thumbnail = $("<img>");
      thumbnail.attr("src", imageData.thumbnail || imageData.imageurl);
      thumbnail.addClass("thumbnail");
      thumbnail.on("click", {index}, thumbnailClick.bind(this));

     
      thumbnailGrid.append(thumbnail);
    }
      
    $("#page").append(thumbnailGrid);

  }

  renderCarouselView() {
    $("#carouselControlsContainer").empty();

    var carouselControlsContainer = $("<div>");
    carouselControlsContainer.attr("id", "carouselControlsContainer");

    var imageData = this.subOptions[getCurrentHash()].rows[this.index];

    var image = $("<img>");
    image.attr("src", imageData["imageurl"]);
    image.attr("id", "fullImage");
    image.css("cursor", "e-resize")
    image.on("click", this.nextIndex.bind(this));
    $("#page").append(image);


    var detailsString = "";

    var imageDetails = $("<div>");
    imageDetails.addClass("imageDetailsContainer");

    if (imageData["title"] !== undefined) {
      var title = $("<div>");
      title.html(imageData["title"]);
      title.addClass("imageTitle");
      imageDetails.append(title);
    }

    if (imageData["medium"] !== undefined) {
      detailsString+=imageData["medium"]+" &#8226; "
    }

    if (imageData["dimensions"] !== undefined) {
      detailsString+=imageData["dimensions"]+" &#8226; "
    }

    if (imageData["year"] !== undefined) {
      detailsString+=imageData["year"]+" &#8226; "
    }

    if (detailsString !== "") {
      var details = $("<div>");
      details.html(detailsString.substring(0, detailsString.length-9));
      details.addClass("imageDetails");
      imageDetails.append(details);
    }

    if (imageData["description"] !== undefined) {
      var description = $("<div>");
      description.html(imageData["description"]);
      description.addClass("imageDescription");
    }

    var carouselIndexDisplay = $("<div>");
    carouselIndexDisplay.attr("id", "carouselIndexDisplay");
    carouselIndexDisplay.html((parseInt(this.index)+1)+" of "+parseInt(this.subOptions[getCurrentHash()].rows.length));


    var carouselControls = $("<div>");
    carouselControls.attr("id", "carouselControls");

    var carouselControlsPrev = $("<div>");
    carouselControlsPrev.html("&#171;");
    carouselControlsPrev.addClass("clickable");
    carouselControlsPrev.on("click", this.prevIndex.bind(this));

    var carouselControlsNext = $("<div>");
    carouselControlsNext.html("&#187;");
    carouselControlsNext.addClass("clickable");
    carouselControlsNext.on("click", this.nextIndex.bind(this));

    var carouselControlsShowThumbnails = $("<div>");
    carouselControlsShowThumbnails.html("Show Thumbnails");
    carouselControlsShowThumbnails.addClass("clickable");
    carouselControlsShowThumbnails.on("click", this.showThumbnails.bind(this));

    carouselControls.append(carouselControlsPrev);
    carouselControls.append(carouselIndexDisplay);
    carouselControls.append(carouselControlsNext);

    $("#carouselControlsContainer").append(imageDetails);
    $("#carouselControlsContainer").append(carouselControls);
    $("#carouselControlsContainer").append(carouselControlsShowThumbnails);


  }

  showThumbnails() {
    this.isThumbnailView = true;
    this.render()
  }

  prevIndex() {
    if (this.index === 0) {
      this.setIndex(this.subOptions[getCurrentHash()].rows.length - 1)
    } else {
      this.setIndex(this.index - 1);
    }
  }

  nextIndex() {
    this.setIndex((this.index + 1) % this.subOptions[getCurrentHash()].rows.length);
  }

  setIndex(index) {
    this.index = index;
    this.isThumbnailView = false;
    this.render()
  }

  render() {
    this.setupPage()
    if (this.isThumbnailView) {
      this.renderThumbnailView();
    } else {
      this.renderCarouselView();
    }
  }
}