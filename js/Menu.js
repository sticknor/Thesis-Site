class MenuSubOption {

  constructor(title, hash) {
    this.title = title;
    this.hash = hash;
  }

  onClick() {
    window.location.hash = this.hash;
    gtag('event', `${this.hash}_page_opened`);
  }

  render() {
    var subOption = $("<div>");
    subOption.html(this.title);
    subOption.addClass("menuOption subOption clickable");
    subOption.attr("data-hash", this.hash);
    subOption.on("click", this.onClick.bind(this));
    if (getCurrentHash() === this.hash) {
      subOption.addClass("menuSelection");
    }
    $("#menu").append(subOption);
  }
}

class MenuOption {

  constructor(title, hash, index) {
    this.title = title;
    this.hash = hash;
    this.index = index;
    this.suboptions = [];
    this.expanded = getCurrentHash().split("-")[0] === this.hash;
  }

  addSubOption(title, hash) {
    this.suboptions.push(new MenuSubOption(title, hash))
  }

  toggle() {
    this.expanded = !this.expanded
  }

  onClick() {
    if (this.suboptions.length === 0) {
      window.location.hash = this.hash;
      gtag('event', `${this.hash}_page_opened`);
    }
    else { 
      this.toggle()
    }
  }

  render() {
    var menuOption = $("<div>");
    menuOption.html(this.title);
    menuOption.addClass("menuOption clickable");
    if (this.index === 0) {
      menuOption.addClass("homeMenuOption");
    }
    menuOption.attr("data-hash", this.hash);
    menuOption.on("click", this.onClick.bind(this));

    if (getCurrentHash() === this.hash) {
      menuOption.addClass("menuSelection");
    }

    $("#menu").append(menuOption);

    if (this.expanded) {
      for (var subOption in this.suboptions) {
        this.suboptions[subOption].render()
      }
    }
  }
}

class Menu {

  constructor() {
    this.options = {};
  }

  createMenu(pages) {
    // Sort it here
    var orderedPages = new Array(Object.keys(pages).length);
    for (var page in pages) {
      orderedPages[pages[page].order] = {
        category: pages[page].category,
        group: pages[page].group,
        order: pages[page].order,
        hash: pages[page].hash
      }
    }

    for (var page in orderedPages) {
      var pageData = orderedPages[page];

      if (this.options[pageData.category] === undefined) {
        var pageHash = pageData.group === undefined? pageData.hash : pageData.category.toLowerCase().split(" ").join("");
        this.options[pageData.category] = new MenuOption(pageData.category, pageHash, pageData.order);
      }

      if (pageData.group && pageData.category !== "about") {
        this.options[pageData.category].addSubOption(pageData.group, pageData.hash);
      }
    }
    this.render();
  }

  onClick(event) {
    this.render();
  }

  render() {
    $("#menu").empty();
    $("#menu").unbind();
    $("#menu").on("click", this.onClick.bind(this));

    for (var index in this.options) {
      this.options[index].render()
    }

    // Add Special Link
    var specialLink = $("<a>");
    specialLink.html('Rhapsody');
    specialLink.addClass("menuOption subOption specialOption clickable");
    specialLink.attr("href", "https://samt.work/rhapsody");
    $("#menu").append(specialLink);
  }
}