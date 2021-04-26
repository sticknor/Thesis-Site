

class Airtable {

  constructor(tabs, onTableReady=undefined) {
    this.tabs = tabs;
    this.tabsFetched = 0;
    this.onTableReady = onTableReady;

    this.data = {};

    this.apiKey = AIRTABLE_API;
    this.baseId = AIRTABLE_BASE_ID;
    this.Airtable = require('airtable');
    this.base = new this.Airtable({ apiKey: this.apiKey }).base(this.baseId);

    for(var i=0; i < this.tabs.length; i++){
      const tab = tabs[i]
      this.fetchTable(tab, (result) => { 
        this.data[tab] = result;
        this.tabReady()
      });
    }
  }

  fetchTable(tableName, callback) {
    var result = [];
    this.base(tableName).select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) { result.push(record); });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
        callback(result)
    });
  }

  tabReady() {
    this.tabsFetched++;
    if (this.tabsFetched === this.tabs.length) {
      this.onTableReady(this.data);
    }
  }
}
