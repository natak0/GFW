/* eslint-disable @typescript-eslint/no-explicit-any */
import { BitmapLayer } from '@deck.gl/layers';
import { CompositeLayer, LayerContext } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';

export class SatelliteLayer extends CompositeLayer {
  static layerName = 'SatelliteLayer';
  initializeState(context: LayerContext): void {
    super.initializeState(context);
  }

  renderLayers() {
    return new TileLayer({
      id: 'basemap-satellite',
      data: 'https://gateway.api.dev.globalfishingwatch.org/v3/tileset/sat/tile?x={x}&y={y}&z={z}',
      minZoom: 0,
      maxRequests: 100,
      debounceTime: 800,
      onDataLoad: this.props.onDataLoad,
      renderSubLayers: (props: any) => {
        const {
          bbox: { west, south, east, north },
        } = props.tile;
        return new BitmapLayer(props, {
          data: undefined,
          image: props.data,
          bounds: [west, south, east, north],
        });
      },
    });
  }
}
