import '@etchteam/recycling-locator';

const MARKER_KEY = import.meta.env.VITE_MARKER_KEY;

if (MARKER_KEY) {
  window.markerConfig = {
    project: MARKER_KEY,
    source: 'snippet',
  };

  /* eslint-disable-next-line */
  !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);
}
