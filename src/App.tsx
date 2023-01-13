import { Route, Routes } from "react-router-dom";
import { Character } from "./pages/Character";
import { Home } from "./pages/Home";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters/:id" element={<Character />} />
    </Routes>
  )
}

export default App;
