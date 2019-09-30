(function () {
  /*global $*/
  /*global history*/
  /*global hljs*/
  "use strict";

  var mainId = "body > div#main";
  var tocId = "ul#toc";
  var sectionId = "div#top > h3#section";
  var progressId = "div#top > h3#progress";

  $(document).ready(function() {
    setTimeout(initHash, 300);
    initToc();
    document.querySelectorAll('pre code').forEach(function(block) {
      hljs.highlightBlock(block);
      block.classList.add('loaded');
    });
  });

  var tocOpen = false;
  var fresh = true;

  function onScroll() {
    if (tocOpen || fresh) {
      fresh = false;
      return;
    }
    var scrollPos = $(document).scrollTop();
    updateSectionByScroll(scrollPos);
    updateProgress(scrollPos);
  }

  function updateSectionByScroll(scrollPos) {
    var found = false;
    $("h2").each(function () {
      var section = $(this);
      var nextSection = section.nextUntil("h2").last().next();
      var top = section.position().top;
      var bottom = (nextSection && nextSection.position())
        ? nextSection.position().top
        : $(document).height();
      if (top <= scrollPos && bottom > scrollPos) {
        updateSection(section.text());
        found = true;
      }
    });
    if (!found) {
      reset();
    }
  }

  function updateSection(section) {
    if (!section) { return; }
    $(sectionId).text(section);
  }

  function updateProgress(scrollPos) {
    var progress = $(progressId);
    if (!progress.length) { return; }
    var max = $(document).height() - $(window).height();
    var value = Math.ceil((scrollPos / max) * 100);
    var text = value === 0 ? "" : value;
    progress.text(text);
  }

  function toggleToc() {
    $(tocId + "," + progressId + "," + mainId).toggle();
    tocOpen = !tocOpen;
    reset();
    history.replaceState(null, null, " ");
    window.scrollTo(0, 0);
  }

  function updateHash() {
    var hash = $(this).attr("id");
    window.location.hash = hash;
  }

  function reset() {
    updateSection("Sections");
    updateProgress(0);
  }

  function initHash() {
    var hash = window.location.hash;
    var h2 = $("h2" + hash);
    if (!hash || !h2.length) { return; }
    $("html").animate({ scrollTop: $(h2).offset().top }, 200);
  }

  function initToc() {
    if ($(tocId).length === 0) {
      return;
    }
    $(document).on("scroll", onScroll);
    $(sectionId).click(toggleToc);
    $(tocId + " a").click(toggleToc);
    $(mainId + " h2").click(updateHash);
  }
})();
