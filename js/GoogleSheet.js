class GoogleSheet {

  constructor(sheetID, onTabReady=undefined) {
    this.allTabs = [];
    this.allTabsReady = false;
    this.sheetID = sheetID;
    this.onTabReady = onTabReady;
    this.fetchTabs();
  }

  allTabsReady() {
    return this.allTabsReady;
  }

  allTabs() {
    return this.allTabs;
  }

  fetchTabs(tabNum=1) {
    var url = 'https://spreadsheets.google.com/feeds/list/' + this.sheetID + '/' + tabNum + '/public/basic?alt=json';
    var sheet = this;
    $.ajax({
      url: url,
      dataType: "json",
      success: function(data) {
        sheet.fetchTabs(tabNum + 1);

        var tab = {};
        tab['tabNum'] = tabNum

        var tabTitle = data.feed.title.$t;
        tab['title'] = tabTitle.split('-')[0];
        tab['template'] = tabTitle.split('-')[1] || 'NoTemplateFound';

        tab['rows'] = [];
        data.feed.entry !== undefined && data.feed.entry.map((entry, index) => {
          var rawData = entry.content.$t;
          var rowData = {};
          rawData.replace(/(.+?)(?:: )(.+?)(?:, |$)/g, function(match, key, value) {
            rowData[key] = value;
          });
          tab['rows'].push(rowData);
        });

        sheet.allTabs[tabNum] = tab;
        if (sheet.onTabReady !== undefined) {
          sheet.onTabReady(tab);
        }
      },
      error: function() {
        console.log('No more sheets found. Last sheet was ' + (tabNum - 1));
        sheet.allTabsReady = true;
      }
    });
  }
}