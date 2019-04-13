function getCurrentHash() {
  return window.location.hash.substring(1)
}

function getCurrentPage() {
  return getCurrentHash().split("-")[0]
}
