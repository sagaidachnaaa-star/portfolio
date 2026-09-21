 // ---------------------------------------------
// Amplitude Analytics — Portfolio
// ---------------------------------------------

const AMPLITUDE_API_KEY = "d2371bbd6b46b59bb561709817132604";


// ---------------------------------------------
// Initialize Amplitude
// ---------------------------------------------

if (window.amplitude) {

  window.amplitude
    .init(AMPLITUDE_API_KEY, {
      serverZone: "EU",

      autocapture: {
        pageViews: true,
        sessions: true,
        attribution: true,
        fileDownloads: true,

        // Disable noisy automatic interactions
        formInteractions: false,
        elementInteractions: false
      }
    })
    .promise
    .then(() => {
      console.log("✅ Amplitude initialized");

      // TEST EVENT
      window.amplitude.track("Portfolio Test", {
        page: window.location.pathname
      });

      console.log("✅ Portfolio Test event sent");
    });

} else {
  console.error("❌ Amplitude SDK not loaded");
}


// ---------------------------------------------
// Custom event helper
// ---------------------------------------------

function trackEvent(eventName, properties = {}) {

  if (!window.amplitude) {
    console.error("Amplitude not available");
    return;
  }

  window.amplitude.track(eventName, {
    ...properties,

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

  console.log("📊 Tracking:", eventName, properties);

  trackEvent(eventName, properties);
});