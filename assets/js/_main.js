/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Constants for CDNs
const PLOTLY_URL = "https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js";
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

// Detect OS/browser preference
const browserPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determine the computed theme, which can be "dark", "light", or "lcars".
function determineComputedTheme() {
  // Determine the expected state of the theme toggle: "dark", "light", "lcars", or default "system"
  let themeSetting = localStorage.getItem("theme");
  themeSetting = (themeSetting != "dark" && themeSetting != "light" && themeSetting != "lcars" && themeSetting != "system") ? "system" : themeSetting;

  // Return the setting if set, or use the browser preference
  if (themeSetting != "system") {
    return themeSetting;
  }
  return browserPref ? "dark" : "light";
}

// Set the theme on page load or when explicitly called
function setTheme(theme) {
  const use_theme = theme ||
    localStorage.getItem("theme") ||
    $("html").attr("data-theme") ||
    browserPref;

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else if (use_theme === "lcars") {
    $("html").attr("data-theme", "lcars");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }
}

// LCARS is a hidden third theme: after a viewer has clicked the toggle more than
// LCARS_UNLOCK_CLICKS times on a page, each click has LCARS_CHANCE of landing on it
const LCARS_UNLOCK_CLICKS = 3;
const LCARS_CHANCE = 1 / 3;
let themeToggleClicks = 0;
let lcarsExitTheme = "light";

// Toggle the theme manually: light <-> dark, with the occasional surprise LCARS
function toggleTheme() {
  const current_theme = $("html").attr("data-theme");
  let new_theme = current_theme === "dark" ? "light" : "dark";
  themeToggleClicks += 1;
  if (current_theme === "lcars") {
    new_theme = lcarsExitTheme;
  } else if (themeToggleClicks > LCARS_UNLOCK_CLICKS && Math.random() < LCARS_CHANCE) {
    // Leaving LCARS finishes the light/dark flip that the surprise replaced
    lcarsExitTheme = new_theme;
    new_theme = "lcars";
  }
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
  redrawPlotly();
}

// Defer the loading of Mermaid to only if there is a field on the page to be rendered
let mermaidElements = document.querySelectorAll("pre>code.language-mermaid");
if (mermaidElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Append the Mermaid module to the DOM
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = `
      import mermaid from '${MERMAID_URL}';
      mermaid.initialize({startOnLoad:true, theme:'default'});
      await mermaid.run({querySelector:'code.language-mermaid'});
    `;
    document.body.appendChild(moduleScript);
  });
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is
// actually present on the page.
//
// NOTE that plotlyDarkLayout and plotlyLightLayout will be exposed in the minimized file
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Return if not ready
    if (document.readyState !== "complete") {
      return;
    }

    // Prepare to load Plotly from the CDN
    const script = document.createElement('script');
    script.src = PLOTLY_URL;
    script.async = true;

    // Once loaded, update the page elements to work with it
    script.onload = function() {
      plotlyElements.forEach(function(elem) {
        // Parse the Plotly JSON data and hide it
        let jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "light") ? plotlyLightLayout : plotlyDarkLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }

    // Add the script to the document
    document.head.appendChild(script);
  });
}

function redrawPlotly() {
  plotlyElements.forEach(function(elem) {
    // Parse the Plotly JSON data
    let jsonData = JSON.parse(elem.textContent);

    // Get the Plotly node
    let chartElement = $(elem).parent().next().get(0);

    // Set the theme for the plot and render it
    const theme = (determineComputedTheme() === "light") ? plotlyLightLayout : plotlyDarkLayout;
    if (jsonData.layout) {
      jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
    } else {
      jsonData.layout = { template: theme };
    }
    Plotly.react(chartElement, jsonData.data, jsonData.layout);
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

});
