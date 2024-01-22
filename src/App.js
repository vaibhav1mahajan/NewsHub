import './App.css'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

function App() {
  const [progress,setProgress] = useState(0);
  const setLoading = (progress)=>{
    setProgress(progress);
  }
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route path="/general" element={<News setLoading={setLoading} key="general" country="in" category="general" />} />
          <Route path="/business" element={<News setLoading={setLoading} key="business" country="in" category="business" />} />
          <Route path="/entertainment" element={<News setLoading={setLoading} key="entertainment" country="in" category="entertainment" />} />
          {/* <Route path="/general" element={<News setLoading={setLoading} key="general" country="in" category="general" />} /> */}
          <Route path="/health" element={<News setLoading={setLoading} key="health" country="in" category="health" />} />
          <Route path="/science" element={<News setLoading={setLoading} key="science" country="in" category="science" />} />
          <Route path="/sports" element={<News setLoading={setLoading} key="sports" country="in" category="sports" />} />
          <Route path="/technology" element={<News setLoading={setLoading} key="technology" country="in" category="technology" />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
