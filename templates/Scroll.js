function loadScroll(page, pageTitle) {

  updateMenu(pageTitle);
  $("#page").empty();

  $("#page").html("Scroll for "+pageTitle);
}

class Scroll extends Page {
  render() {
  	this.setupPage()
    console.log(this.data)
  }
}
