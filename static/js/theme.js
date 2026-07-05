// Theme toggle: respects the OS preference by default, lets the reader
// override it, and remembers the choice. The initial theme is set by a tiny
// inline <head> script (see pages) so there's no flash of the wrong theme.
(function () {
  var root = document.documentElement;
  var mql = window.matchMedia("(prefers-color-scheme: dark)");

  function stored() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem("theme", value); } catch (e) {}
  }
  function current() {
    return root.getAttribute("data-theme") ||
      (mql.matches ? "dark" : "light");
  }
  function apply(theme, buttons) {
    root.setAttribute("data-theme", theme);
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  function init() {
    var buttons = Array.prototype.slice.call(
      document.querySelectorAll("[data-theme-toggle]")
    );
    apply(current(), buttons);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        save(next);
        apply(next, buttons);
      });
    });

    // Follow the OS if the reader hasn't made an explicit choice.
    mql.addEventListener("change", function (e) {
      if (!stored()) apply(e.matches ? "dark" : "light", buttons);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
