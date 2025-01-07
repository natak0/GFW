import DeckGL from '@deck.gl/react';
import { MapViewState } from '@deck.gl/core';
import { FourwingsHeatmapTileLayerProps } from '../layers/fourwings-heatmap.types';
import { FourwingsHeatmapTileLayer } from '../layers/FourwingsHeatmapTileLayer';
import { BaseMapLayer } from '../layers/BasemapLayer';
import { Timebar, TimebarProps } from '@globalfishingwatch/timebar';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import {
  FOURWINGS_INTERVALS_ORDER,
  getFourwingsInterval,
} from '../loaders/helpers/time';

import { getUTCDateTime } from '../layers/fourwings-heatmap.utils';
import styles from './Main.module.css';
import { SatelliteLayer } from '../layers/SatelliteLayer';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -30,
  latitude: 30,
  zoom: 3,
};

const AVAILABLE_START = '2020-01-01T00:00:00.000Z';
const AVAILABLE_END = new Date().toISOString();

function Main() {
  const [searchParams] = useSearchParams();
  const [{ start, end }, setRange] = useState<{ start: string; end: string }>({
    start: '2024-01-01T00:00:00.000Z',
    end: '2024-04-01T00:00:00.000Z',
  });

  const [isSatellite, setIsSatellite] = useState<boolean>(false);

  useEffect(() => {
    const satelliteParam = searchParams.get('satellite');
    if (satelliteParam) {
      setIsSatellite(satelliteParam === 'true');
    }
  }, [searchParams]);

  const fourwingsLayerProps: FourwingsHeatmapTileLayerProps = useMemo(() => {
    return {
      id: 'ais',
      startTime: getUTCDateTime(start).toMillis(),
      endTime: getUTCDateTime(end).toMillis(),
      sublayers: [
        {
          id: 'presence',
          visible: true,
          datasets: ['public-global-presence:v3.0'],
          color: '#FF64CE',
          colorRamp: 'magenta',
        },
      ],
      visible: true,
    };
  }, [start, end]);

  // TODO: sync state with sidebar
  const layers = useMemo(() => {
    return [
      isSatellite ? new SatelliteLayer() : new BaseMapLayer(),
      new FourwingsHeatmapTileLayer(fourwingsLayerProps),
    ];
  }, [fourwingsLayerProps, isSatellite]);

  const onChange: TimebarProps['onChange'] = (e) => {
    setRange({ start: e.start, end: e.end });
  };
  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={layers}
      />
      <div className={styles.timebar}>
        <Timebar
          enablePlayback={false}
          start={start}
          end={end}
          absoluteStart={AVAILABLE_START}
          absoluteEnd={AVAILABLE_END}
          onChange={onChange}
          bookmarkPlacement='bottom'
          minimumRange={1}
          intervals={FOURWINGS_INTERVALS_ORDER}
          getCurrentInterval={getFourwingsInterval}
          trackGraphOrientation={'mirrored'}
        ></Timebar>
      </div>
    </div>
  );
}

export default Main;
