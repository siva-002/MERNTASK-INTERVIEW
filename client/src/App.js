import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Admin/Dashboard";
import { DataContextprovider } from "./components/Admin/context/DataContext";

function App() {
  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="admin">
          <Route index  path=":path" element={<DataContextprovider> <Dashboard/></DataContextprovider>}></Route>
        </Route>
      </Routes>
     
 
    </div>
  );
}

export default App;
