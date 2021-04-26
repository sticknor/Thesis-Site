class Exhbit extends Page {

    constructor(data) {
      super(data);

    //   // preload images
    //   this.images = new Array();
    //   for (var i=0; i < this.data.rows.length; i++) {
    //       var workType = this.data.rows[i].type.split("/")[0];
    //       console.log(workType)
    //       if (workType === "image") {
    //           this.images[i] = new Image();
    //           this.images[i].src = this.data.rows[i].thumbnails.full.url;
    //       }
    //   }
    }
  
    render() {
        // Put in image header w/ alt text
        var header = $("<table id='exhibit_header'>");

        // Put in "menu"
        var menu = $("<tr id='exhibit_menu'>");
        var priceListLink=$("<td><a href='#exhibit_priceList'>Price List</a></td>");
        var statementLink=$("<td><a href='#exhibit_statement'>Statement</a></td>");
        var bioLink=$("<td><a href='#exhibit_bio'>Bio</a></td>");
        var linksLink=$("<td><a href='#exhibit_links'>Price List</a></td>");

        menu.append(priceListLink);
        menu.append(statementLink);
        menu.append(bioLink);
        menu.append(linksLink);
        header.append(menu);

        // Put in Price List
        var priceList = $("<table id='exhibit_priceList'>");
        for (var work in []) {
            var workForSale = $("<tr class='exhibit_workForSale'>");

            var workImage = $("<td>");
            workImage.html('<img />');

            var workInformation = $("<td>");
            workInformation.html('<img />');

            var workPrice = $("<td>");
            workPrice.html('$500');

            workForSale.append(workImage);
            workForSale.append(workInformation);
            workForSale.append(workPrice);

            priceList.append(workForSale);
        }

        // Put in Statement
        var statement = $("<div id='exhibit_statement'>");

        // Put in Statement
        var bio = $("<div id='exhibit_bio'>");

        // Put in Links
        var links = $("<div id='exhibit_links'>");

      $("#body").style("scroll-behavior", "smooth");
      $("#body").append(header);
      $("#body").append(priceList);
      $("#body").append(statement);
      $("#body").append(bio);
      $("#body").append(links);
    }
  }
  