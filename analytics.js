// ------------------------------
// Amplitude Analytics
// ------------------------------

const AMPLITUDE_API_KEY = "0f544da3f8c13464a87b1d6a96d599f7";

if (window.amplitude) {
  window.amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: {
      pageViews: true,
      sessions: true,
      attribution: true,
      fileDownloads: true,
      formInteractions: true,
      elementInteractions: true
    }
  });
}


// ------------------------------
// Custom portfolio events
// ------------------------------

function trackEvent(eventName, properties = {}) {
  if (window.amplitude) {
    window.amplitude.track(eventName, properties);
  }
}


// Track elements that have data-analytics
document.addEventListener("click", function (event) {
  const element = event.target.closest("[data-analytics]");

  if (!element) return;

  const eventName = element.dataset.analytics;

  const properties = {};

  if (element.dataset.project) {
    properties.project_name = element.dataset.project;
  }

  if (element.dataset.location) {
    properties.location = element.dataset.location;
  }

  if (element.dataset.destination) {
    properties.destination = element.dataset.destination;
  }

  if (element.dataset.method) {
    properties.method = element.dataset.method;
  }

  trackEvent(eventName, properties);
});