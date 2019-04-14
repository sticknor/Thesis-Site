const pageTemplates = {
  SPLASH: 'Splash',
  CAROUSEL: 'Carousel',
  SCROLL: 'Scroll'
}

class Page {
  data;

  constructor(data) {
    this.data = data
  }

  setupPage() {
    $("#page").empty();
    $("#page").unbind();
    $("#carouselControlsContainer").empty();
  }
}