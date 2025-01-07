import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Logo, SwitchRow } from '@globalfishingwatch/ui-components';
import styles from './Sidebar.module.css';

function Sidebar() {
  const [activePresence, setActivePresence] = useState(true);
  const [activeSatellite, setActiveSatellite] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has('presence') && !searchParams.has('satellite')) {
      searchParams.set('presence', 'true');
      searchParams.set('satellite', 'false');
    }
  }, []);

  useEffect(() => {
    const presenceParam = searchParams.get('presence');
    const satelliteParam = searchParams.get('satellite');
    if (presenceParam) {
      setActivePresence(presenceParam === 'true');
    }
    if (satelliteParam) {
      setActiveSatellite(satelliteParam === 'true');
    }
  }, [searchParams]);

  const handlePresenceToggle = () => {
    const newPresenceState = !activePresence;
    setActivePresence(newPresenceState);
    setSearchParams({
      presence: `${newPresenceState}`,
      satellite: `${activeSatellite}`,
    });
  };

  const handleSatelliteToggle = () => {
    const newSatelliteState = !activeSatellite;
    setActiveSatellite(newSatelliteState);
    setSearchParams({
      presence: `${activePresence}`,
      satellite: `${newSatelliteState}`,
    });
  };

  return (
    <div className={styles.sidebar}>
      <Logo className={styles.logo} />
      <div className={styles.content}>
        <SwitchRow
          active={activePresence}
          onClick={handlePresenceToggle}
          tooltip='Toggle layer visibility'
          tooltipPlacement='top'
          label='Presence'
        />
        <SwitchRow
          active={activeSatellite}
          onClick={handleSatelliteToggle}
          tooltip='Toggle layer visibility'
          tooltipPlacement='top'
          label='Satellite'
        />
      </div>
    </div>
  );
}

export default Sidebar;
