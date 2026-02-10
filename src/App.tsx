import Home from "./Components/Home";
import Layout from "./Components/Layout";
import Cities from "./Components/Cities";
import { HashRouter as Router, Routes, Route } from "react-router";

 export default function App() {
  return (
    <Router>
    <Layout>
    <Routes>  
      <Route path="/" element={<Home />} />
      <Route path="/cities" element={<Cities />} />
    </Routes>
    </Layout>
    </Router>
  )
}