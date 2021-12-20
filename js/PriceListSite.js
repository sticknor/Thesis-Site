class PriceListSite {

  constructor() {
    this.page = undefined;
    // this.menu = new Menu();
    this.airtable = new Airtable(["Works"], this.onAirTableReady.bind(this));
    window.onpopstate = this.render.bind(this)
    $(window).resize(this.windowResized.bind(this));
  }

  windowResized() {
    // only re render if width of window was changed
    // if (this.width !== $(window).width()) {
    //   this.render();
    // }
  }

  render() {
    this.page.render();
  }

  onAirTableReady(data) {
    const priceList = [];
    const works = data["Works"];
    for(var i=0; i< works.length; i++) {
      const work = works[i]
      if (work.get("Show In Price List")) {
        priceList.push(work);
      }
    }
    // // Go through each work
    // for (var index in works) {
    //   var work = works[index];
    //   console.log(work);

    //   var category = work.get("Category") ? work.get("Category")[0]: undefined;
    //   var group = work.get("Group") ? work.get("Group")[0] : undefined;

    //   // If they didn't specify a category => ignore work
    //   if (category === undefined) continue;

    //   // If show on website is unchecked => ignore work
    //   if (work.get("Show on Website") === undefined) continue;

    //   // Build hash and title
    //   var hash = group === undefined ? category.split(' ').join('').toLowerCase() : (category+"-"+group).split(' ').join('').toLowerCase();
    
    //   // Now, add the work to the correct page
    //   // If the category does not yet exist => Create it + add work
    //   if (pages[hash] === undefined) {

    //     // Create the page
    //     pages[hash] = {
    //       template: 'Scroll',
    //       hash: hash,
    //       rows: [work], // Add the work to the page
    //       category,
    //       group,
    //       order: Object.keys(pages).length,
    //     };

    //   } else {
    //       // Add the work to the page
    //       pages[hash].rows.push(work);
    //   }
    this.page = new PriceList(priceList);
    this.page.render();
  }
}
