class PriceList extends Page {

    constructor(data) {
      super(data);
      // console.log(data);

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
        $("#body").html('');
        $("#body").append($('<div class="exhibit_sectionHeader">Price List</div>'));
        $("#body").append($('<div style="margin-bottom: 80px">paintings by <a href="https://samt.work" target="_blank">Sam Ticknor</a></div>'));
        $("#body").append($('<div class="exhibit_priceListItemBorder"></div>'));

        // Put in Price List
        var priceList = $("<div id='pricelist' class='exhibit_sectionHeader'></div>");

        for (var i = 0; i < this.data.length; i++) {
            // console.log(this.data[i])

            const work = this.data[i];
        // console.log(work);

          var compiledTemplate = Handlebars.getTemplate('priceListItem');
          var html = compiledTemplate({ 
            image : firstOr(work.get("Work"), { url: undefined }).url,
            title: work.get("Title"),
            dimensions: `${work.get("Width")}" x ${work.get("Height")}"`,
            materials: work.get("Medium"),
            year: work.get("Year"),
            price: work.get("Price") ? work.get("Price") : ' available upon request',
            sold: work.get("Sold")
          });  

          priceList.append(html);
        }

        // Put in Bio
        // var bio = $("<div id='exhibit_bio'  class='exhibit_sectionHeader'>");
        // var bioText = $("<div class='exhibit_text'>");
        // bioText.html(this.data.get("Bio"));
        // bio.append(bioText);

        // Put in Links
        // var linksHeader = $("<div id='exhibit_links' class='exhibit_sectionHeader'>");
        // var compiledTemplate = Handlebars.getTemplate('links');
        // var links = compiledTemplate();  


      // $("#body").style("scroll-behavior", "smooth");

      $("#body").addClass("exhibit_page");
      $("#body").append(priceList);
    // pythonbody").append(links);
    }
  }
  
