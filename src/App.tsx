import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { SplitView } from "@globalfishingwatch/ui-components";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <BrowserRouter>
      <SplitView
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        aside={<Sidebar />}
        main={
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        }
      />
    </BrowserRouter>
  );
}

export default App;
