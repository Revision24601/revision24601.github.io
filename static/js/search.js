// Tiny client-side filter for the tags/browse page. Progressive enhancement:
// with JS off, the full tag index is still there. With JS on, typing filters
// the listed essays/notes by title (and hides now-empty tag sections).
(function () {
  var input = document.getElementById("q");
  var root = document.getElementById("tag-sections");
  var empty = document.getElementById("search-empty");
  if (!input || !root) return;

  var sections = Array.prototype.slice.call(root.querySelectorAll(".series"));
  var items = Array.prototype.slice.call(root.querySelectorAll(".entry-list li"));

  function apply() {
    var q = input.value.trim().toLowerCase();
    var anyVisible = false;

    items.forEach(function (li) {
      var hit = q === "" || li.textContent.toLowerCase().indexOf(q) !== -1;
      li.classList.toggle("is-hidden", !hit);
      if (hit) anyVisible = true;
    });

    // Hide a tag section if none of its items matched.
    sections.forEach(function (sec) {
      var visible = sec.querySelectorAll(".entry-list li:not(.is-hidden)").length;
      sec.classList.toggle("is-hidden", q !== "" && visible === 0);
    });

    if (empty) empty.classList.toggle("is-hidden", anyVisible);
  }

  input.addEventListener("input", apply);
})();
