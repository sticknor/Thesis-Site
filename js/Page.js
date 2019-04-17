const pageTemplates = {
  SPLASH: 'Splash',
  CAROUSEL: 'Carousel',
  SCROLL: 'Scroll',
  GRID: 'Grid',
}

class Page {
  data;

  constructor(data) {
    this.data = data
  }

  setupPage() {
    // Clear the page
    $("#page").empty();
    $("#page").unbind();
    // Remove various other divs added by the page templates
    $("#carouselControlsContainer").remove();
    $("#splashDetailsContainer").remove();
  }
}