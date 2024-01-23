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
import { type } from '@testing-library/user-event/dist/type';

function App() {
  const [progress,setProgress] = useState(0);
  const setLoading = (progress)=>{
    setProgress(progress);
  }
  const apiKey ='83d9a86f7e7c4b9a9b0ec6c96d9c4cb8';
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        {console.log(process.env.REACT_APP_NEWS_API , typeof(process.env.REACT_APP_NEWS_API))};
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route path="/general" element={<News setLoading={setLoading} apiKey={apiKey} key="general" country="in" category="general" />} />
          <Route path="/business" element={<News setLoading={setLoading} apiKey={apiKey} key="business" country="in" category="business" />} />
          <Route path="/entertainment" element={<News setLoading={setLoading} apiKey={apiKey} key="entertainment" country="in" category="entertainment" />} />
          {/* <Route path="/general" element={<News setLoading={setLoading} apiKey={apiKey} key="general" country="in" category="general" />} /> */}
          <Route path="/health" element={<News setLoading={setLoading} apiKey={apiKey} key="health" country="in" category="health" />} />
          <Route path="/science" element={<News setLoading={setLoading} apiKey={apiKey} key="science" country="in" category="science" />} />
          <Route path="/sports" element={<News setLoading={setLoading} apiKey={apiKey} key="sports" country="in" category="sports" />} />
          <Route path="/technology" element={<News setLoading={setLoading} apiKey={apiKey} key="technology" country="in" category="technology" />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
