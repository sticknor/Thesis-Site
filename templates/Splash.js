class Splash extends Page {
  render() {
    this.setupPage()

    var imageData = this.data.rows[0];

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
    $("#menuContainer").append(imageDetails);
  }
}
