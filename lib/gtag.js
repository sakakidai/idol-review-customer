export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const existsGaId = GA_TRACKING_ID !== '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// PVを測定する
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// GAイベントを発火させる
export const event = ({ action, category, label, value = '' }) => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
