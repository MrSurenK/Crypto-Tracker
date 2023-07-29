import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      {/* Sets the background color for the entire website using Box component in MUI */}
      <Box sx={{ bgcolor: "#001B35", color: "white", minHeight: "100vh" }}>
        <Header />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
