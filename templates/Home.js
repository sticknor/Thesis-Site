function loadHome() {

  $("#page").empty();
  clearMenu();

	var homeComponents = site["home"]["rows"];
    for (var i = 0; i < homeComponents.length; i++) {
    	console.log(homeComponents);
    	console.log(homeComponents[i]["label"]);
    	console.log(homeComponents[i]["display"]);
    	switch (homeComponents[i]["label"]) {
      	case "image":
          var image = $("<img>");
          image.attr("src", homeComponents[i]["display"]);
          image.attr("id", "homeImage");
          $("#page").append(image);
          break;
        case "splash":
          break;
        }
    }
}