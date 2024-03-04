import { Component, createRef } from 'preact';
import '@etchteam/diamond-ui/control/Input/Input';

import '@/components/content/Icon/Icon';
import config from '@/config';
import { CustomElement } from '@/types/customElement';
import { Location } from '@/types/locatorApi';

import MapMarker from './marker.svg?raw';

export interface PlacesMapProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly locations: Location[];
  readonly static?: boolean;
  readonly onZoom?: (zoom: number) => void;
  readonly onDrag?: (instance: H.Map) => void;
  readonly onMarkerClick?: (location: Location) => void;
}

/**
 * Render a map
 *
 * This is a Preact component wrapping a custom element
 * - component is used for prop flexibility, it allows the location data to be passed in
 * - The custom element is used for styling only
 */
export default class PlacesMap extends Component<PlacesMapProps> {
  apiKey = config.mapsPlacesKey;
  HereMaps: typeof H;
  MapInstance: H.Map;
  elementRef = createRef<HTMLDivElement>();
  currentZoom: number;

  resizeMap() {
    this.MapInstance?.getViewPort().resize();
  }

  async initMap() {
    const { default: HereMaps } = await import(
      // @ts-expect-error TS can't find the maps types
      '@here/maps-api-for-javascript/bin/mapsjs.bundle'
    );
    const platform = new H.service.Platform({
      apikey: this.apiKey,
    });

    const defaultLayers = platform.createDefaultLayers() as any;
    const baseLayer = defaultLayers.vector.normal.map as H.map.layer.Layer;
    // Limit the zoom level so people never get a silly radius
    baseLayer.setMin(9);
    baseLayer.setMax(15);

    this.HereMaps = HereMaps;
    this.MapInstance = new H.Map(this.elementRef.current, baseLayer, {
      zoom: 5,
      center: { lat: this.props.latitude, lng: this.props.longitude },
      pixelRatio: window.devicePixelRatio ?? 1,
    });

    window.addEventListener('resize', this.resizeMap.bind(this));
  }

  addControls() {
    // Enable zooming and dragging
    new this.HereMaps.mapevents.Behavior(
      new this.HereMaps.mapevents.MapEvents(this.MapInstance),
    );

    // Add the zoom control
    new this.HereMaps.ui.UI(this.MapInstance).addControl(
      'zoom',
      new this.HereMaps.ui.ZoomControl({
        alignment: this.HereMaps.ui.LayoutAlignment.RIGHT_BOTTOM,
      }),
    );

    // Setup event listeners for zooming and dragging
    this.MapInstance.addEventListener('drag', () => {
      this.props?.onDrag?.(this.MapInstance);
    });

    this.MapInstance.addEventListener('mapviewchangeend', () => {
      const currentZoom = this.currentZoom;
      const newZoom = this.MapInstance.getZoom();

      if (newZoom !== currentZoom) {
        this.currentZoom = newZoom;
        this.props?.onZoom?.(newZoom);
      }
    });
  }

  addMarker(location: Location) {
    const handleClick = () => {
      this.props.onMarkerClick?.(location);
    };

    const marker = new this.HereMaps.map.DomIcon(
      `<locator-places-map-marker>${MapMarker}</locator-places-map-marker>`,
      {
        onAttach(element) {
          element.addEventListener('click', handleClick);
        },
        onDetach(element) {
          element.removeEventListener('click', handleClick);
        },
      },
    );

    const coords = { lat: location.latitude, lng: location.longitude };

    return new H.map.DomMarker(coords, { data: location, icon: marker });
  }

  addPlaceMarkers() {
    const group = new this.HereMaps.map.Group();

    // Create the markers then center the map on them
    group.addObjects(
      this.props.locations.map((location) => this.addMarker(location)),
    );
    this.MapInstance.addObject(group);
    this.MapInstance.getViewModel().setLookAtData({
      bounds: group.getBoundingBox(),
    });
  }

  async componentDidMount() {
    await this.initMap();
    this.addPlaceMarkers();

    if (!this.props.static) {
      this.addControls();
    }
  }

  componentWillUnmount() {
    this.MapInstance.dispose();
    window.removeEventListener('resize', this.resizeMap);
  }

  render() {
    return <locator-places-map ref={this.elementRef} />;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-places-map': CustomElement;
      'locator-places-map-marker': CustomElement;
    }
  }
}
