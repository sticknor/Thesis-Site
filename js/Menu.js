class MenuSubOption {

  constructor(data) {
    this.title = data.title;
    this.hash = data.hash;
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

  constructor(pageHash, pageTitle, subOptions) {
    this.subOptions = [];
    this.expanded = false;
    this.title = pageTitle;
    this.hash = pageHash;
    if (getCurrentPage() === this.hash) {
      this.expanded = true;
    }

    for (var subOption in subOptions) {
      this.subOptions.push(new MenuSubOption(subOptions[subOption]));
    }
    this.subOptions.sort(function(a, b){ a.menuOrder - b.menuOrder });

  }

  toggle() {
    this.expanded = !this.expanded
  }

  onClick() {
    if (this.subOptions.length === 0) {
      window.location.hash = this.hash;
      gtag('event', `${this.hash}_page_opened`);
    }
    else { 
      this.toggle()
    }
  }

  render(index) {
    var menuOption = $("<div>");
    menuOption.html(this.title);
    menuOption.addClass("menuOption clickable");
    if (parseInt(index) === 1) {
      menuOption.addClass("homeMenuOption");
    }
    menuOption.attr("data-hash", this.hash);
    menuOption.on("click", this.onClick.bind(this));
    if (getCurrentHash() === this.hash) {
      menuOption.addClass("menuSelection");
    }
    $("#menu").append(menuOption);

    if (this.expanded) {
      for (var subOption in this.subOptions) {
        this.subOptions[subOption].render()
      }
    }
  }
}

class Menu {

  constructor() {
    this.options = {};
  }

  addOption(pageHash, pageTitle, index, subOptions) {
    this.options[index] = new MenuOption(pageHash, pageTitle, subOptions);
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
      this.options[index].render(index)
    }
  }
}