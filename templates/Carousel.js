
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

  }

  renderCarouselView() {
    $("#carouselControlsContainer").empty();

    var carouselControlsContainer = $("<div>");
    carouselControlsContainer.attr("id", "carouselControlsContainer");

    var carouselIndexDisplay = $("<div>");
    carouselIndexDisplay.attr("id", "carouselIndexDisplay");
    carouselIndexDisplay.html(" | ")

    console.log("("+(this.index+1)+" / "+this.subOptions[getCurrentHash()].rows.length+")");

    var carouselControls = $("<div>");
    carouselControls.attr("id", "carouselControls");

    var carouselControlsPrev = $("<div>");
    carouselControlsPrev.html("Previous");
    carouselControlsPrev.on("click", this.prevIndex.bind(this));

    var carouselControlsNext = $("<div>");
    carouselControlsNext.html("Next");
    carouselControlsNext.on("click", this.nextIndex.bind(this));

    var carouselControlsShowThumbnails = $("<div>");
    carouselControlsShowThumbnails.html("Show Thumbnails");
    carouselControlsShowThumbnails.on("click", this.showThumbnails.bind(this));

    carouselControls.append(carouselControlsPrev);
    carouselControls.append(carouselIndexDisplay);
    carouselControls.append(carouselControlsNext);

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

function loadCarousel(page, pageTitle) {
  updateMenu(pageTitle);
  $("#page").empty();

  $("#page").html("Carousel for "+pageTitle);

  if (sessionStorage.getItem(pageTitle) === null) {
    sessionStorage.setItem(pageTitle+"-index", 0);
    sessionStorage.setItem(pageTitle+"-display", "image"); // other option is "thumbnails"
  }
  
  loadCarouselControls();
  loadCarouselContent(page, pageTitle);
}

function loadCarouselControls() {
  
} 

// CONTROLS
function showImage(index) {
 
}

function showThumbnails() {
}

function next(pageTitle) {

  sessionStorage.setItem(pageTitle+"-index", sessionStorage.getItem(pageTitle+"-index") + 1);
}

function prev(pageTitle) {
  sessionStorage.setItem(pageTitle+"-index", sessionStorage.getItem(pageTitle+"-index") - 1);
}

