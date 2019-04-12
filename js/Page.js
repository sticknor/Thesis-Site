function loadPage(page) {
  if (page === "") {
    
    console.log("HOME");
    loadHome();

  } else {
    page = page.substring(1);
    var hashComponents = page.split("-");
    if (site[hashComponents[0]] !== undefined) {
      var category = site[hashComponents[0]];
      if (category["subcategories"][hashComponents.join("-")] !== undefined) {
        console.log("SUBMENU");
      } else {
        console.log("MENU");
      }
      highlightMenu(page);
    } else {
      console.log("NOT A PAGE");
    }
  } 
}