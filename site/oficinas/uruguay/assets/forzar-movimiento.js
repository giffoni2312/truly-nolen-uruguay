// Owner's request (31-oct-2026): the hero video must always move, even when the OS has animations turned off.
// The template (preview.js, escenas.js) pauses the video when "prefers-reduced-motion" is on; this script loads
// before them and makes that query report "no preference", so the hero film always plays.
(function () {
  var original = window.matchMedia.bind(window);
  window.matchMedia = function (query) {
    if (/prefers-reduced-motion/.test(query)) {
      return { matches: false, media: query, onchange: null, addListener: function () {}, removeListener: function () {},
        addEventListener: function () {}, removeEventListener: function () {}, dispatchEvent: function () { return false; } };
    }
    return original(query);
  };
})();
