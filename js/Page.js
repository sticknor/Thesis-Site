class Page {
  
  constructor(data) {
    this.data = data

    this.subOptions = Object.assign({}, this.data.subOptions);
    this.subOptions[this.data.hash] = { "hash" : this.data.hash, rows: this.data.rows, title: this.data.title, index: 0, isThumbnailView: false };
    for (var subOption in this.subOptions) {
      this.subOptions[subOption].index = 0;
    }
  }

  currentRows() {
    return this.subOptions[getCurrentHash()];
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