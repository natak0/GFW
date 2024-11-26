import { useState } from 'react';
import { Logo, SwitchRow } from '@globalfishingwatch/ui-components';
import styles from './Sidebar.module.css';

function Sidebar() {
  const [active, setActive] = useState(true);
  return (
    <div className={styles.sidebar}>
      <Logo className={styles.logo} />
      <div className={styles.content}>
        <SwitchRow
          active={active}
          onClick={() => setActive(!active)}
          tooltip="Toggle layer visibility"
          tooltipPlacement="top"
          label="Presence"
        />
        <SwitchRow
          active={false}
          onClick={() => console.log('TODO')}
          tooltip="Toggle layer visibility"
          tooltipPlacement="top"
          label="Satellite"
        />
      </div>
    </div>
  );
}

export default Sidebar;
