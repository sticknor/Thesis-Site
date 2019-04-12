
// READING FROM GOOGLE SHEETS AND PARSING INTO SITE OBJECT
function importSheets(sheetID = "1rvivc9pnHCLM84f4JuXdvfaah-XlbHpvQ_ORprPTJLg", sheetNum = 1) {
	var url = 'https://spreadsheets.google.com/feeds/list/'+sheetID+'/'+sheetNum+'/public/basic?alt=json';

	$.ajax({
	  url: url,
	  dataType: "json",
	  success: function(data) {
	    importSheets(sheetID, sheetNum+1);

	    var category = data.feed.title.$t;
	    console.log(category)
	    if (category === "ARCHIVE") return;

	    var subcategories = {};
	    var rows = [];

	    data.feed.entry !== undefined && data.feed.entry.map((entry) => {
	      var rawData = entry.content.$t;
	      var rowData = {};

	      rawData.replace(/(.+?)(?:: )(.+?)(?:, |$)/g, function(match, key, value) {
	        rowData[key] = value;
	        if (key === "group" && subcategories.value === undefined) { 
	          var hash = category.split(" ").join("").toLowerCase()+"-"+value.split(" ").join("").toLowerCase();
	          subcategories[hash] = { "label" : value };
	          subcategories[hash]["hash"] = hash;
	        }
	      });

	      rows.push(rowData);
	    });

	    var hash = category.split(" ").join("").toLowerCase();
	    site[hash] = { "label" : category };
	    site[hash]["hash"] = hash;
	    site[hash]["subcategories"] = subcategories;
	    site[hash]["rows"] = rows;

	    loadMenu();
	  },
	  error: function(error) {
	  	// console.log("Error importing sheet: ")
	  	loadPage(window.location.hash);
	    console.log(error);
	  }
	});
}
