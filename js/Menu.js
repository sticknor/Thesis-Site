class MenuSubOption {
  title;
  hash;
  shown = false;
  selected = false;

  constructor(data) {
    this.title = data.title
    this.hash = data.hash
  }

  onClick() {
    window.location.hash = this.hash;
  }

  render() {
    var subOption = $("<div>");
    subOption.html(this.title);
    subOption.addClass("menuOption subOption");
    subOption.attr("data-hash", this.hash);
    subOption.on("click", this.onClick.bind(this));
    if (getCurrentHash() === this.hash) {
      subOption.addClass("menuSelection");
    }
    $("#menu").append(subOption);
  }
}

class MenuOption {
  title;
  hash;
  subOptions = [];
  expanded = false;

  constructor(pageHash, pageTitle, subOptions) {
    this.title = pageTitle;
    this.hash = pageHash;
    if (getCurrentPage() === this.hash) {
      this.expanded = true;
    }

    for (var subOption in subOptions) {
      this.subOptions.push(new MenuSubOption(subOptions[subOption]));
    }
    this.subOptions.sort(function(a, b){ a.menuOrder - b.menuOrder });

  }

  toggle() {
    this.expanded = !this.expanded
  }

  onClick() {
    if (this.subOptions.length === 0) {
      window.location.hash = this.hash;
    }
    else { 
      this.toggle()
    }
  }

  render() {
    var menuOption = $("<div>");
    menuOption.html(this.title);
    menuOption.addClass("menuOption");
    menuOption.attr("data-hash", this.hash);
    menuOption.on("click", this.onClick.bind(this));
    if (getCurrentHash() === this.hash) {
      menuOption.addClass("menuSelection");
    }
    $("#menu").append(menuOption);

    if (this.expanded) {
      for (var subOption in this.subOptions) {
        this.subOptions[subOption].render()
      }
    }
  }
}

class Menu {
  options = {};

  addOption(pageHash, pageTitle, index, subOptions) {
    this.options[index] = new MenuOption(pageHash, pageTitle, subOptions);
    this.render();
  }

  onClick(event) {
    this.render()
  }

  render() {
    $("#menu").empty();
    $("#menu").unbind();
    $("#menu").on("click", this.onClick.bind(this));

    for (var index in this.options) {
      this.options[index].render()
    }
  }
}

// // Menu View and Functionality
// function loadMenu() {
//   $("#menu").empty();

//   for (category in siteData) {

//     if (category === "home") { 
//       var homeComponents = siteData[category]["rows"];
//       for (var i = 0; i < homeComponents.length; i++) {
//         if (homeComponents[i]["label"] === "name") {
//           var name = $("<a>");
//           name.text(homeComponents[i]["display"]);
//           document.title = homeComponents[i]["display"];
//           name.addClass("menuItem");
//           name.attr("id", "name");
//           name.on("click", function(event) {
//             event.stopPropagation();
//             window.location.hash = "#"; 
//           });
//           $("#menu").append(name);
//         }
//       }
//     } else {
//       var hash = siteData[category]["hash"];
//       var menuItem = $("<a>");
//       menuItem.html(siteData[category]["label"]);
//       menuItem.addClass("menuItem");
//       menuItem.addClass("collapsed");
//       menuItem.attr("id", "menu_"+hash);
//       menuItem.on("click", { hash, category, menuItem }, function(event) {
//         event.stopPropagation();
//         var { category, hash, menuItem } = event.data;
//         // If the menu item has sub menu options, toggle their visibility 
//         var submenu = Object.keys(siteData[category]["subcategories"]);
//         if (submenu.length > 0) { menuItem.toggleClass("collapsed"); } 
//         // Otherwise, nav to the page
//         else { window.location.hash = event.data.hash; } 
//       });
      
//       $("#menu").append(menuItem);
//     }
//   }

//   var carouselControlsContainer = $("<div>");
//   carouselControlsContainer.attr("id", "carouselControlsContainer");
//   $("#menu").append(carouselControlsContainer);
// }


// function updateMenu(page) {
//   $("#carouselControlsContainer").empty();
//   $(".menuItem").each(function() { $(this).removeClass("selected"); });
//   $("#menu_"+page).addClass("selected");
// }