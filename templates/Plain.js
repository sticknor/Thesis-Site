class Plain extends Page {

  constructor(data) {
    super(data);
  }

  renderPlainRow(rowData) {

    var entry = $("<div class='entryPlain'>");

    if (rowData["text"]) {
      var text = $("<span class='textPlain'>");
      text.html(rowData["text"].replace(/\n/g, "<br/>"));
      entry.append(text);
    }

    if (rowData["image"]) {
      var image = $("<img class='textPlain'>");
      image.attr("src", rowData["image"]);
      entry.append(image);
    }

    if (rowData["emailLink"]) {
      var link = $("<a class='textPlain'>");
      link.attr("href", "mailto:"+rowData["emailLink"]);
      link.html(rowData["linkTitle"] || rowData["emailLink"]);
      entry.append(link);
    }

    if (rowData["link"]) {
      var link = $("<a class='textPlain'>");
      link.attr("href", rowData["link"]);
      link.html(rowData["linkTitle"] || rowData["link"]);
      entry.append(link);
    }

    $("#page").append(entry);
  }

  render() {
    this.setupPage()

    var rows = this.data.rows;

    for (var index in rows) {
      var row = rows[index];
      this.renderPlainRow(row);
    }
  }
}
