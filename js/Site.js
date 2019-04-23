class Site {

  constructor(sheetID) {
    this.height = $(window).height();
    this.width = $(window).width();

    this.pages = {};
    this.sheetID = sheetID;
    this.menu = new Menu();
    this.importSheets();
    window.onpopstate = this.render.bind(this)
    $(window).resize(this.windowResized.bind(this));
  }

  windowResized() {
    console.log("windowResized");
    // only re render if width of window was changed
    if (this.width !== $(window).width()) {
      this.render();
      console.log("Rendering!")
    }
  }

  render() {
    this.menu.render();
    this.pages[getCurrentPage()].render()
    console.log("Rendering2!")
  }

  setSiteDetails(details) {
    this.title = details.title;
    document.title = this.title;
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
    }
    this.pages[page.data.hash] = page;
    this.menu.addOption(page.data.hash, page.data.title, page.data.index, page.data.subOptions);
    return page;
  }

  // READING FROM GOOGLE SHEETS AND PARSING INTO SITE OBJECT
  importSheets(sheetNum=1) {
    var url = 'https://spreadsheets.google.com/feeds/list/' + this.sheetID + '/' + sheetNum + '/public/basic?alt=json';

    $.ajax({
      url: url,
      dataType: "json",
      site: $(this),
      success: function(data) {
        site.importSheets(sheetNum+1);

        var sheetTitle = data.feed.title.$t;

        var title = sheetTitle.split("-")[0];
        var template = sheetTitle.split("-")[1] || "NUFIN";

        if (title === "ARCHIVE") return;

        var subOptions = {};
        var rows = [];
        data.feed.entry !== undefined && data.feed.entry.map((entry, index) => {
          var rawData = entry.content.$t;
        
          var rowData = {};

          rawData.replace(/(.+?)(?:: )(.+?)(?:, |$)/g, function(match, key, value) {
            rowData[key] = value;
            if (key === "group") { 
              var hash = title.split(" ").join("").toLowerCase()+"-"+value.split(" ").join("").toLowerCase();
              if (!subOptions.hasOwnProperty(hash)) {
                subOptions[hash] = {menuOrder: index, "title" : value, hash, rows: []};
              }
              subOptions[hash].rows.push(rowData);
            }
          });

          rows.push(rowData);
        });

        if (title === "DETAILS") {
          site.setSiteDetails(rows[0])
        } else {
          var hash = sheetNum === 1? '': title.split(' ').join('').toLowerCase();
          var page = site.addPage({ title, index: sheetNum, template, hash, subOptions, rows });
          if (hash === getCurrentPage()) {
            page.render()
          }
        }
      },
      error: function() {
        console.log('No more sheets found. Last sheet was ' + (sheetNum - 1))
      }
    });
  }
}
