class Page {
  
  constructor(data) {
    this.data = data
  }

  setupPage() {
    // Clear the page
    $("#page").empty();
    $("#page").unbind();
    window.scrollTo({x: 0, y: 0});
    // Remove various other divs added by the page templates
    $("#carouselControlsContainer").remove();
    $("#splashContainer").remove();
    window.clearInterval(localStorage.getItem('splashInterval'));
  }
}