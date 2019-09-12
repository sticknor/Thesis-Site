class Site {

  constructor(sheetID) {
    this.pages = {};
    this.sheetID = sheetID;
    this.menu = new Menu();
    // READING FROM GOOGLE SHEETS AND PARSING INTO SITE OBJECT
    this.googleSheet = new GoogleSheet(this.sheetID, this.onGoogleSheetTabReady.bind(this));
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
    this.width = $(window).width();
    this.menu.render();
    this.pages[getCurrentPage()].render()
  }

  setSiteDetails(rows) {
    this.details = {};

    for (var rowNum in rows) {
      var rowValues = Object.values(rows[rowNum]);
      this.details[rowValues[0]] = rowValues.splice(1, rowValues.length);
    }

    var hasOption = function(details, option_name) {
      return ((option_name in details) && (details[option_name].length > 0));
    }

    // Add site title.
    if (hasOption(this.details, 'title')) {
      if (hasOption(this.details, 'titleAnimation')) {
        this.titleAnimator = new TitleAnimator(this.details['title'], this.details['titleAnimation'][0]);
      } else {
        document.title = this.details['title'];
      }
    } else {
      console.log('No title found in site DETAILS!');
    }

    // Add favicon.
    if (hasOption(this.details, 'favicon')) {
      $('#favicon').attr('href', this.details['favicon'][0]);
    }

  }

  addPage(pageData) {
    var page;
    switch (pageData.template) {
      case "Splash":
        page = new Splash(pageData);
        break;
      case "Carousel":
        page = new Carousel(pageData);
        break;
      case "Scroll":
        page = new Scroll(pageData);
        break;
      case "Grid":
        page = new Grid(pageData);
        break;
      case "About":
        page = new About(pageData);
        break;
      default:
        console.log('Unexpected page template: ' + pageData.template)
        return;
    }
    this.pages[page.data.hash] = page;
    this.menu.addOption(page.data.hash, page.data.title, page.data.index, page.data.subOptions);
    return page;
  }

  onGoogleSheetTabReady(tab) {
    console.log(tab)
    switch(tab['title']){
      case "ARCHIVE":
        break;
      case "BROWSER":
        this.setSiteDetails(tab['rows']);
        break;
      default:
        var subOptions = {};
        for (var rowNum in tab['rows']) {
          var row = tab['rows'][rowNum]
          if ('group' in row) { 
            var subOptionHash = tab['title'].split(' ').join('').toLowerCase() + '-' + row['group'].split(' ').join('').toLowerCase();
            if (!subOptions.hasOwnProperty(subOptionHash)) {
              subOptions[subOptionHash] = {menuOrder: row['index'], title: row['group'], hash: subOptionHash, rows: []};
            }
            subOptions[subOptionHash].rows.push(row);
          }
        }
        var tabHash = tab['tabNum'] === 1? '': tab['title'].split(' ').join('').toLowerCase();
        var page = this.addPage({ title: tab['title'], index: tab['tabNum'], template: tab['template'], hash: tabHash, subOptions, rows: tab['rows'] });
        if (tabHash === getCurrentPage()) {
          page.render();
        }
    }
  }
}
