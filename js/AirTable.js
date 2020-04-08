

class Airtable {

  constructor(onTableReady=undefined) {

    this.tabsFetched = 0;
    this.onTableReady = onTableReady;

    this.Works = [];
    this.CV = [];
    this.About = {};

    this.apiKey = AIRTABLE_API;
    this.baseId = AIRTABLE_BASE_ID;
    this.Airtable = require('airtable');
    this.base = new this.Airtable({ apiKey: this.apiKey }).base(this.baseId);

    this.fetchTable("Works", (result) => { 
      this.Works = result;
      this.tabsFetched++;
      if (this.tabsFetched === 3) { this.allTabsReady() }
    });
    
    this.fetchTable("CV", (result) => { 
      this.CV = result;
      this.tabsFetched++;
      if (this.tabsFetched === 3) { this.allTabsReady() }
    });

    this.fetchTable("About", (result) => { 
      this.About = result;
      this.tabsFetched++;
      if (this.tabsFetched === 3) { this.allTabsReady() }
    });
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

  allTabsReady() {
    console.log(this.Works)
    console.log(this.CV);
    console.log(this.About)
    this.onTableReady(this.Works, this.CV, this.About);
  }
}
