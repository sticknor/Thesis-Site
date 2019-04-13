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

  render() {
    $("#page").empty();
    $("#page").unbind();
    this.renderPage()
  }
}