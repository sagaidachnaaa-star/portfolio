 // ---------------------------------------------
// Amplitude Analytics — Portfolio
// ---------------------------------------------

const AMPLITUDE_API_KEY = "YOUR_AMPLITUDE_API_KEY";


// ---------------------------------------------
// Initialize Amplitude
// ---------------------------------------------

if (window.amplitude) {
  window.amplitude.init(AMPLITUDE_API_KEY, {
    serverZone: "EU",

    autocapture: {
      // Useful for portfolio analytics
      pageViews: true,
      sessions: true,
      attribution: true,
      fileDownloads: true,

      // Turn these off to avoid noisy events
      formInteractions: false,
      elementInteractions: {
      viewportContentUpdated: {
        enabled: false
      }
    },
    }
  });
}


// ---------------------------------------------
// Custom event helper
// ---------------------------------------------

function trackEvent(eventName, properties = {}) {
  if (!window.amplitude) return;

  window.amplitude.track(eventName, {
    ...properties,

    // Useful context added automatically
    page_title: document.title,
    page_url: window.location.href,
    page_path: window.location.pathname
  });
}


// ---------------------------------------------
// Track portfolio interactions
// ---------------------------------------------

document.addEventListener("click", function (event) {
  const element = event.target.closest("[data-analytics]");

  if (!element) return;

  const eventName = element.dataset.analytics;

  const properties = {};

  // Project card
  if (element.dataset.project) {
    properties.project_name = element.dataset.project;
  }

  // Where the click happened
  if (element.dataset.location) {
    properties.location = element.dataset.location;
  }

  // External destination e.g. LinkedIn
  if (element.dataset.destination) {
    properties.destination = element.dataset.destination;
  }

  // Contact method e.g. Email
  if (element.dataset.method) {
    properties.method = element.dataset.method;
  }

  trackEvent(eventName, properties);
});