class Site {
  pages = {};
  menu;
  title;

  constructor(sheetID) {
    this.sheetID = sheetID;
    this.menu = new Menu();
    this.importSheets();
    window.onpopstate = this.render.bind(this)
  }

  render() {
    this.menu.render();
    this.pages[getCurrentPage()].render()
  }

  setSiteDetails(details) {
    this.title = details.title;
  }

  addPage(pageData) {
    var page;
    switch (pageData.template) {
      case pageTemplates.SPLASH:
        page = new Splash(pageData);
        break;
      case pageTemplates.CAROUSEL:
        page = new Carousel(pageData);
        break;
      case pageTemplates.SCROLL:
        page = new Scroll(pageData);
        break;
      default:
        console.log('Unexpected page template: ' + pageData.template)
    }
    this.pages[page.data.hash] = page;
    this.menu.addOption(page.data.hash, page.data.title, page.data.index, page.data.subcategories);
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

        var subcategories = [];
        var rows = [];

        data.feed.entry !== undefined && data.feed.entry.map((entry) => {
          var rawData = entry.content.$t;
        
          var rowData = {};

          rawData.replace(/(.+?)(?:: )(.+?)(?:, |$)/g, function(match, key, value) {
            rowData[key] = value;
            if (key === "group" && subcategories.value === undefined) { 
              var hash = title.split(" ").join("").toLowerCase()+"-"+value.split(" ").join("").toLowerCase();
              subcategories.push({ "title" : value, hash});
            }
          });

          rows.push(rowData);
        });

        if (title === "DETAILS") {
          site.setSiteDetails(rows[0])
        } else {
          var hash = sheetNum === 1? '': title.split(' ').join('').toLowerCase();
          var page = site.addPage({ title, index: sheetNum, template, hash, subcategories, rows });
          if (hash === getCurrentPage()) {
            page.render()
          }
        }
      },
      error: function(error) {
        console.log('Error importing sheet: ' + error)
      }
    });
  }
}
