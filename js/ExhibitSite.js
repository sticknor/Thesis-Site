class ExhibitSite {

  constructor(exhibitName) {
    this.page = undefined;
    this.exhibitName = exhibitName
    this.airtable = new Airtable(["Exhibits"], this.onAirTableReady.bind(this));

    window.onpopstate = this.render.bind(this)
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
        this.page.render();
        break;
      }
    }
  }
}
