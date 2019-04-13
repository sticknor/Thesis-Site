// function loadPage(pageTitle) {
//   if (pageTitle === "") {
//     loadHome();
//   } else {
//     pageTitle = pageTitle.substring(1);
//     var hashComponents = pageTitle.split("-");
//     if (siteData[hashComponents[0]] !== undefined) {
//       var page = siteData[hashComponents[0]];
//       var pageTemplate = page["template"];
//       if (page["subcategories"][hashComponents.join("-")] !== undefined) {
//         console.log("SUBMENU");
//       } else {
//         console.log("MENU");
//       }
//     } else {
//       console.log("NOT A PAGE");
//     }
//   } 

//   switch (pageTemplate) {
//     case "Carousel":
//       loadCarousel(page, pageTitle);
//       break;
//     case "Scroll":
//       loadScroll(page, pageTitle);
//       break;
//   }
// }

const pageTemplates = {
  HOME: 'Home',
  CAROUSEL: 'Carousel',
  SCROLL: 'Scroll'
}

class Page {
  data;

  constructor(data) {
    this.data = data
  }

  render() {
    $("#page").empty();
    $("#page").unbind();
    this.renderPage()
  }
}