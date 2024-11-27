import { Outlet } from "react-router-dom";
import { AppBar } from "./app-bar";
import { Toaster } from "./ui/sonner";
import { ShopperProvider } from "@/context/shopper-context";


export function Layout() {

  return (
    <>
      <ShopperProvider>
        <main className="flex flex-col min-h-screen bg-slate-950">
          <AppBar />
          <Outlet />
          <Toaster style={{
            top: '10vh',
            right: '20px'
          }}
            position="top-right" />
        </main>
      </ShopperProvider>
    </>
  )
}