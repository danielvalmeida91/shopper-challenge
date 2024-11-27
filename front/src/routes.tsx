import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/layout"
import { EstimateRide } from "./pages/estimate"
import { ConfirmRide } from "./pages/confirm"
import { Home } from "./pages/home"
import { History } from "./pages/history"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/estimate" element={<EstimateRide />} />
          <Route path="/confirm" element={<ConfirmRide />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}