
class Carousel extends Page {

  constructor(data) {
    super(data);
    this.isThumbnailView = false;
    this.index = 0;
  }

  renderMobileView() {
    var grid = $("<div>");
    grid.attr("id", "grid");
    $("#page").append(grid);

    var rows = this.data.rows;
    for (var i in rows) {
      var work = rows[i];
      var gridItem = $("<div>");
      gridItem.addClass("gridItem");

      // var thumbnailImage = $("<img class='thumbnailImage'>");
      // thumbnailImage.attr("src", work.get("Image")[0].thumbnails.small.url);
      // gridItem.append(thumbnailImage);

      var image = $("<img class='gridImage'>");
      image.attr("src", work.get("Image")[0].thumbnails.large.url);
      gridItem.append(image);
      
      var imageDetails = $("<div>");
      if (work.get("Title") !== undefined) {
        var title = $("<div>");
        title.html(work.get("Title"));
        title.addClass("imageTitle");
        imageDetails.append(title);
      }
      var detailsString = makeDetailsLine([work.get("Medium"), work.get("Dimensions"), work.get("Year")]);
      if (detailsString !== "") {
        var details = $("<div>");
        details.html(detailsString);
        details.addClass("imageDetails");
        imageDetails.append(details);
      }

      if (work.get("Description") !== undefined) {
        var description = $("<div>");
        description.html(work.get("Description"));
        description.addClass("imageDescription");
        imageDetails.append(description);
      }

      $(gridItem).append(imageDetails);

      $("#grid").append(gridItem);
    }
  }

  renderThumbnailView() {
    var thumbnailGrid = $("<div>");
    thumbnailGrid.addClass("thumbnailGrid");

    var rows = this.data.rows;
    for (var i in rows) {
      var work = rows[i];

      var thumbnailClick = function (event) { 
        this.setIndex(event.data.i); 
      }

      var thumbnail = $("<img>");
      thumbnail.attr("src", work.get("Image")[0].thumbnails.large.url);
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

    var work = this.data.rows[this.index];

    // var thumbnailImage = $("<img class='thumbnailImage'>");
    // thumbnailImage.attr("src", work.get("Image")[0].thumbnails.small.url);
    // $("#page").append(thumbnailImage);

    var image = $("<img class='fullImage'>");
    image.attr("src", work.get("Image")[0].thumbnails.large.url); // TODO: Change the thing to load full over thumbnail
    image.on("click", this.nextIndex.bind(this));
    $("#page").append(image);

    var imageDetails = $("<div>");
    imageDetails.addClass("imageDetailsContainer");

    if (work.get("Title") !== undefined) {
      var title = $("<div>");
      title.html(work.get("Title"));
      title.addClass("imageTitle");
      imageDetails.append(title);
    }

    var detailsString = makeDetailsLine([work.get("Medium"), work.get("Dimensions"), work.get("Year")]);
    if (detailsString !== "") {
      var details = $("<div>");
      details.html(detailsString);
      details.addClass("imageDetails");
      imageDetails.append(details);
    }

    if (work.get("Description") !== undefined) {
      var description = $("<div>");
      description.html(work.get("Description"));
      description.addClass("imageDescription");
      imageDetails.append(description);
    }

    var carouselIndexDisplay = $("<div>");
      carouselIndexDisplay.attr("id", "carouselIndexDisplay");
      carouselIndexDisplay.html((parseInt(this.index)+1)+" of "+parseInt(this.data.rows.length));
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

    var rows = this.data.rows;
    if (rows.length > 1) {
      carouselControlsContainer.append(carouselControls);
      carouselControlsContainer.append(carouselControlsShowThumbnails);
    }

    $("#menuContainer").append(carouselControlsContainer);
  }

  showThumbnails() {
    this.isThumbnailView = true;
    this.render();
  }

  prevIndex() {
    if (this.index === 0) {
      this.setIndex(this.data.rows.length - 1)
    } else {
      this.setIndex(this.index - 1);
    }
  }

  nextIndex() {
    this.setIndex((this.index + 1) % this.data.rows.length);
  }

  setIndex(index) {
    this.index = parseInt(index);
    this.isThumbnailView = false;
    this.render()
  }

  checkKey(e) {
    if (e.keyCode === 37) { this.prevIndex() }
    else if (e.keyCode === 39) { this.nextIndex() }
  }

  render() {
    this.setupPage();

    // unsubscribe all handlers
    $(document).off("keydown");
    $(document).on("keydown", this.checkKey.bind(this));

    if (window.innerWidth <= 850) {
      this.renderMobileView();
    } else if (this.isThumbnailView) {
      this.renderThumbnailView();
    } else {
      this.renderCarouselView();
    }
  }
}