import { Home } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

export const AppBar = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-center w-full bg-slate-950 relative">
        <Button variant={'outline'} onClick={() => navigate('/')} className="absolute left-5 top-5 hover:bg-primary hover:text-muted">
          <Home />
          Home Page
        </Button>
        <div className="flex items-center justify-center w-full bg-muted shadow-md shadow-primary/40">
          <h1 className="text-foreground p-5 rounded-lg text-3xl antialiased">Seja bem-vindo à </h1>
          <span className="font-bold text-primary relative text-3xl font-sans mr-5">Shopper Táxi<div className="absolute w-7 h-[3px] translate-x-10 bg-foreground -bottom-2 right-10 rounded-lg"></div></span>
        </div>
      </div>
    </>
  )
}