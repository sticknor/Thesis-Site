
class Carousel extends Page {
  renderPage() {
    console.log(this.data)
  }
}


var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};


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

function loadCarouselContent(page, pageTitle) {
  console.log(sessionStorage.getItem(pageTitle+"-index"));
  console.log(sessionStorage.getItem(pageTitle+"-display"));
}

function loadCarouselControls() {
  var carouselContentDescription = $("<div>");
  carouselContentDescription.attr("id", "carouselContentDescription")

  var carouselControls = $("<div>");
  carouselControls.attr("id", carouselControls);

  var carouselControlsPrev = $("<div>");
  carouselControlsPrev.attr("id", carouselControlsPrev);
  carouselControlsPrev.html("Previous");
  carouselControlsPrev.on("click", { pageTitle }, function(event) { prev(event.data.pageTitle); });

  var carouselControlsNext = $("<div>");
  carouselControlsNext.attr("id", carouselControlsNext);
  carouselControlsNext.html("Next");
  carouselControlsNext.on("click", { pageTitle }, function(event) { next(event.data.pageTitle); });

  var carouselControlsShowThumbnails = $("<div>");
  carouselControlsShowThumbnails.attr("id", carouselControlsShowThumbnails);
  carouselControlsShowThumbnails.html("Show Thumbnails");

  carouselControls.append(carouselControlsPrev);
  carouselControls.append(carouselControlsNext);
  carouselControls.append(carouselControlsShowThumbnails);

  $("#carouselControlsContainer").append(carouselContentDescription);
  $("#carouselControlsContainer").append(carouselControls);
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

