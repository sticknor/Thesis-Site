class Splash extends Page {
  renderPage() {
    console.log('render HOME')

    var homeComponents = this.data["rows"][0];
    for (var compontent in homeComponents) {
      switch (compontent) {
        case "image":
          var image = $("<img>");
          image.attr("src", homeComponents[compontent]);
          image.attr("id", "homeImage");
          $("#page").append(image);
          break;
        case "text":
          $("#page").append(homeComponents[compontent]);
          break;
        case "splash":
          break;
      }
    }
  }
}
