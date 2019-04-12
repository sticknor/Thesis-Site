// Menu View and Functionality
function loadMenu() {
  $("#menu").empty();
  
  for (category in site) {

    if (category === "home") { 
      var homeComponents = site[category]["rows"];
      for (var i = 0; i < homeComponents.length; i++) {
        if (homeComponents[i]["label"] === "name") {
          var name = $("<a>");
          name.text(homeComponents[i]["display"]);
          name.attr("href", "/");
          name.addClass("name");
          $("#menu").append(name);
        }
      }
    } else {
      var hash = site[category]["hash"];
      var menuItem = $("<a>");
      menuItem.html(site[category]["label"]);
      menuItem.addClass("menuItem");
      menuItem.attr("id", "menu_"+hash);
      menuItem.attr("href", "#"+hash);
    

      for (subcategory in site[category]["subcategories"]) {
        var hash = (site[category]["subcategories"][subcategory]["hash"])
        var subMenuItem = $("<a>")
        subMenuItem.text(site[category]["subcategories"][subcategory]["label"]);
        subMenuItem.addClass("menuItem subMenuItem");
        subMenuItem.attr("id", "menu_"+hash);
        subMenuItem.attr("href", "#"+hash)
        menuItem.append(subMenuItem);
      }

      $("#menu").append(menuItem);
    }
  }
}

function highlightMenu(page) {
  $(".menuItem").each(function() { $(this).removeClass("selected"); })
  $("#menu_"+page).addClass("selected");
}