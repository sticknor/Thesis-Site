class Exhibit extends Page {

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

        var titleImage = $(`<tr class='exhibit_title'><td><img src='${this.data.get('Title Image')[0].url}' alt='${this.data.get('Title')}'/><td/></tr>`);
        header.append(titleImage);
        var headerImage = $(`<tr class='exhibit_header'><td><img src='${this.data.get('Header Image')[0].url}' /><td/></tr>`);
        header.append(headerImage);

        // Put in "menu"
        var menu = $("<tr id='exhibit_menu'>");
        var priceListLink=$("<td><a href='#pricelist'>Price List</a></td>");
        var statementLink=$("<td><a href='#exhibit_statement'>Statement</a></td>");
        var bioLink=$("<td><a href='#exhibit_bio'>Bio</a></td>");
        var linksLink=$("<td><a href='#exhibit_links'>Price List</a></td>");

        menu.append(priceListLink);
        menu.append(statementLink);
        menu.append(bioLink);
        menu.append(linksLink);
        header.append(menu);

        // Put in Price List
        console.log(this.data);
        var priceList = $("<table id='pricelist'>");

        for (var i = 0; i < this.data.get("Price List").length; i++) {
            var workForSale = $("<tr class='exhibit_workForSale'>");

            var workImage = $("<td>");
            workImage.html(`<img src="${this.data.get("Work (from Price List)")[i].url}"/>`);

            var workInformation = $("<td>");
            var workTitle = $("<div>");
            workTitle.html(`<div>${this.data.get("Title (from Price List)")[i]}</div>`);
            var workYear = $("<div>");
            workYear.html(`<div>${this.data.get("Year (from Price List)")[i]}</div>`);
            var workDimensions = $("<div>");
            workDimensions.html(`<div>${this.data.get("Width (from Price List)")[i]}" x ${this.data.get("Height (from Price List)")[i]}"</div>`);
            workInformation.append(workTitle);
            workInformation.append(workDimensions);
            workInformation.append(workYear);

            var workPrice = $("<div>");
            if (this.data.get("Sold (from Price List)")[i] === true) {
                workPrice.html(`<div><div style="text-decoration: line-through;">$${this.data.get("Price (from Price List)")[i]}</div><div style="color:#FF69B4;">sold</div></div>`);
            } else {
                workPrice.html(`<div>$${this.data.get("Price (from Price List)")[i]}</div>`);
            }
            workInformation.append(workPrice);
            

            workForSale.append(workImage);
            workForSale.append(workInformation);

            priceList.append(workForSale);
        }

        // Put in Statement
        var statement = $("<div id='exhibit_statement'>");

        // Put in Statement
        var bio = $("<div id='exhibit_bio'>");

        // Put in Links
        var links = $("<div id='exhibit_links'>");

      // $("#body").style("scroll-behavior", "smooth");
      $("#body").addClass("exhibit_page");
      $("#body").append(header);
      $("#body").append(priceList);
      $("#body").append(statement);
      $("#body").append(bio);
      $("#body").append(links);
    }
  }
  
