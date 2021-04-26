class PortfolioSite {

  constructor() {
    this.pages = {};
    this.menu = new Menu();
    this.airtable = new Airtable(["Works", "CV", "About"], this.onAirTableReady.bind(this));

    window.onpopstate = this.render.bind(this)
    $(window).resize(this.windowResized.bind(this));
  }

  windowResized() {
    // only re render if width of window was changed
    if (this.width !== $(window).width()) {
      this.render();
    }
  }

  render() {
    this.width = $(window).width();
    this.menu.render();
    this.pages[getCurrentHash()].render()
  }

  addPage(pageData) {
    var page;
    switch (pageData.template) {
      case "Carousel":
        page = new Carousel(pageData);
        break;
      case "Scroll":
        page = new Scroll(pageData);
        break;
      case "Bio":
        page = new Bio(pageData);
        break;
      case "Statement":
        page = new Statement(pageData);
        break;
      case "CV":
        page = new CV(pageData);
        break;
      case "Splash":
        page = new Splash(pageData);
        break;
      default:
        console.log('Unexpected page template: ' + pageData.template)
        return;
    }
    this.pages[pageData.hash] = page;
    return page;
  }

  onAirTableReady(data) {
    const works = data["Works"]
    const cv = data["CV"]
    const about = data["About"][0]
    console.log(about)

    var pages = {};

    /////////////// READ ABOUT TABLE /////////////////

    // Set up home page object and site details from the 'About' table
    // Name of Site - Also "Home Button"
    let name = about.get("Title") || "Portfolio";
    document.title = name;

    // Favicon - Icon in Title Bar
    // Defaults to Artist Palette Emoji
    let faviconLink = about.get("Favicon")[0].url || "favicon/favicon.ico";
    $('#favicon').attr('href', faviconLink);

    // Add home page to the pages object

    console.log(about.get("Splash Images"))
    console.log(works[0].get("Work"))
    pages[""] = { 
        template: 'Splash',
        category: name,
        hash: "",
        rows: about.get("Splash Images") || works[0].get("Work"),
        order: 0
    }

    ///////////////// READ WORKS TABLE //////////////////////

    // Go through each work
    for (var index in works) {
      var work = works[index];

      var category = work.get("Category") ? work.get("Category")[0]: undefined;
      var group = work.get("Group") ? work.get("Group")[0] : undefined;

      // If they didn't specify a category => ignore work
      if (category === undefined) continue;

      // If show on website is unchecked => ignore work
      if (work.get("Show on Website") === undefined) continue;

      // Build hash and title
      var hash = group === undefined ? category.split(' ').join('').toLowerCase() : (category+"-"+group).split(' ').join('').toLowerCase();
    
      // Now, add the work to the correct page
      // If the category does not yet exist => Create it + add work
      if (pages[hash] === undefined) {

        // Create the page
        pages[hash] = {
          template: 'Scroll',
          hash: hash,
          rows: [work], // Add the work to the page
          category,
          group,
          order: Object.keys(pages).length,
        };

      } else {
          // Add the work to the page
          pages[hash].rows.push(work);
      } 
    }

    // ABOUT PAGE
    // Retrieve Statements, Bio, and Social Media Link
    let bio = about.get("Bio") || undefined;
    let showCV = about.get("Show CV on Website") || undefined;
    let bioImage = undefined;
    if (about.get("Bio Image") !== undefined) {
      bioImage = about.get("Bio Image")[0].url;
    }
    
    let instagramLink = about.get("Instagram") || undefined;
    let emailLink = about.get("Email") || undefined;

    let statement = about.get("Artist Statement") || undefined;

    if (bio) {
      pages["about-bio"] = {
        template: 'Bio',
        category: "About",
        group: (statement || showCV) ? "Bio" : undefined,
        hash: "about-bio",
        image: bioImage,
        text: bio,
        instagramLink: instagramLink,
        emailLink: emailLink,
        order: Object.keys(pages).length,
      }
    }

    if (statement) {
      pages["about-statement"] = {
        template: 'Statement',
        category: "About",
        group: (bio || showCV) ? "Statement" : undefined,
        hash: "about-statement",
        text: statement,
        order: Object.keys(pages).length,
      }
    }

    if (showCV && cv.length > 0) {
      pages["about-cv"] = {
        template: 'CV',
        category: "About",
        group: (statement || bio) ? "CV" : undefined,
        hash: "about-cv",
        rows: cv,
        order: Object.keys(pages).length,
      }
    }

    for (var hash in pages) {
      var page = this.addPage(pages[hash]);
      if (hash === getCurrentHash()) { page.render(); }
    }

    this.menu.createMenu(pages);
  }
}
