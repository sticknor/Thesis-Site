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
          document.title = homeComponents[i]["display"];
          name.addClass("menuItem");
          name.attr("id", "name");
          name.on("click", function(event) {
            event.stopPropagation();
            window.location.hash = "#"; 
          });
          $("#menu").append(name);
        }
      }
    } else {
      var hash = site[category]["hash"];
      var menuItem = $("<a>");
      menuItem.html(site[category]["label"]);
      menuItem.addClass("menuItem");
      menuItem.addClass("collapsed");
      menuItem.attr("id", "menu_"+hash);
      menuItem.on("click", { hash, category, menuItem }, function(event) {
        event.stopPropagation();
        var { category, hash, menuItem } = event.data;
        // If the menu item has sub menu options, toggle their visibility 
        var submenu = Object.keys(site[category]["subcategories"]);
        if (submenu.length > 0) { menuItem.toggleClass("collapsed"); } 
        // Otherwise, nav to the page
        else { window.location.hash = event.data.hash; } 
      });
      
      for (subcategory in site[category]["subcategories"]) {
        var hash = (site[category]["subcategories"][subcategory]["hash"])
        var subMenuItem = $("<a>")
        subMenuItem.text(site[category]["subcategories"][subcategory]["label"]);
        subMenuItem.addClass("menuItem subMenuItem");
        subMenuItem.attr("id", "menu_"+hash);
        subMenuItem.attr("href", "#"+hash);
        subMenuItem.on("click", { hash }, function(event) {
          event.stopPropagation();
        });
        menuItem.append(subMenuItem);
      }

      $("#menu").append(menuItem);
    }
  }
}

function highlightMenu(page) {
  $(".menuItem").each(function() { $(this).removeClass("selected"); });
  $("#menu_"+page).addClass("selected");
}

function clearMenu() {
  $(".menuItem").each(function() { 
    $(this).removeClass("selected");
  });
}