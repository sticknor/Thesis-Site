class ExhibitSite {

  constructor(exhibitName) {
    this.page = undefined;
    this.exhibitName = exhibitName
    this.airtable = new Airtable(["Exhibits"], this.onAirTableReady.bind(this));

    window.onpopstate = this.render.bind(this)
    $(window).resize(this.windowResized.bind(this));
  }

  windowResized() {
    // only re render if width of window was changed
    if (this.width !== $(window).width()) {
      this.render();
    }
  }

  render() {
    this.page.render();
  }

  onAirTableReady(data) {
    const exhibits = data["Exhibits"];
    for(var i=0; i< exhibits.length; i++) {
      const exhibit = exhibits[i]
      console.log(exhibit.get("Title"))
      console.log(this.exhibitName)
      if(exhibit.get("Title") == this.exhibitName){
        this.page = new Exhibit(exhibit);
        break;
      }
    }
  }
}
