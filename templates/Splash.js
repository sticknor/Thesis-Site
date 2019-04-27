class Splash extends Page {

  render() {
    this.setupPage()

    var rows = this.subOptions[getCurrentHash()].rows;
    var imageData = rows[0];

    var image = $("<img>");
    image.attr("src", imageData["imageurl"]);
    image.attr("id", "fullImage");
    
    var imageDetails = $("<div>");
    imageDetails.addClass("imageDetailsContainer");
    imageDetails.attr("id", "splashDetailsContainer")

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

    $("#page").append(image);

    if (window.innerWidth > 850) {
      $("#menuContainer").append(imageDetails);
    } else {
      $("#page").append(imageDetails);
    }
  }
}
