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
        var header = $("<div id='exhibit_header'>");

        var titleImage = $(`<img src='${this.data.get('Title Image')[0].url}' alt='${this.data.get('Title')}'/>`);
        header.append(titleImage);
        var headerImage = $(`<img src='${this.data.get('Header Image')[0].url}' />`);
        header.append(headerImage);

        // Put in "menu"
        var menu = $("<div id='exhibit_menu'>");
        var priceListLink=$("<div><a href='#pricelist'>Price List</a></div>");
        var statementLink=$("<div><a href='#exhibit_statement'>Statement</a></div>");
        var bioLink=$("<div><a href='#exhibit_bio'>Bio</a></div>");
        var linksLink=$("<div><a href='#exhibit_links'>Price List</a></div>");

        menu.append(priceListLink);
        menu.append(statementLink);
        menu.append(bioLink);
        menu.append(linksLink);
        header.append(menu);

        // Put in Price List
        console.log(this.data);
        var priceList = $("<div id='pricelist'>");

        for (var i = 0; i < this.data.get("Price List").length; i++) {

          var compiledTemplate = Handlebars.getTemplate('priceListItem');
          var html = compiledTemplate({ 
            image : this.data.get("Work (from Price List)")[i].url,
            title: this.data.get("Title (from Price List)")[i],
            dimensions: `${this.data.get("Width (from Price List)")[i]}" x ${this.data.get("Height (from Price List)")[i]}"`,
            materials: this.data.get("Medium (from Price List)")[i],
            year: this.data.get("Year (from Price List)")[i].title,
            price: this.data.get("Price (from Price List)")[i],
            sold: this.data.get("Sold (from Price List)")[i]
          });  

          priceList.append(html);
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
  
