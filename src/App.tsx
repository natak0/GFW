import { useState } from 'react';
import { SplitView } from '@globalfishingwatch/ui-components';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <SplitView
      isOpen={sidebarOpen}
      onToggle={() => setSidebarOpen(!sidebarOpen)}
      aside={<Sidebar />}
      main={<Main />}
    />
  );
}

export default App;
