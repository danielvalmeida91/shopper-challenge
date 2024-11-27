import { Button } from "@/components/ui/button"
import { CarTaxiFront, History, HistoryIcon, LucideHistory } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="flex flex-col items-center justify-center gap-5 ">
          <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-3xl antialiased font-bold text-muted">
              Escolha uma das opções abaixo, 👍
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center justify-center gap-8 border border-primary hover:scale-105 hover:border-primary rounded-lg p-5 transition-all duration-500 min-w-[300px] sm: max-w-[230px]">
                <div className="flex items-center justify-center rounded-full w-20 h-20 bg-primary">
                  <CarTaxiFront size={32} className="text-gray-100" />
                </div>
                <h2 className="text-2xl font-bold leading-tight text-gray-100">Pedir um táxi</h2>
                <Button variant={'default'} onClick={() => navigate('/estimate')} className="text-md min-w-[200px] hover:bg-accent hover:text-slate-900 transition-all duration-500">
                  Pedir um táxi
                </Button>
              </div>
              <div className="flex flex-col items-center justify-center gap-8 border border-primary hover:scale-105 hover:border-primary rounded-lg p-5 transition-all duration-500 min-w-[300px] sm: max-w-[230px]">
                <div className="flex items-center justify-center rounded-full w-20 h-20 bg-primary">
                  <History size={32} className="text-muted" />
                </div>
                <h2 className="text-2xl font-bold leading-tight text-muted">Histórico de viagens</h2>
                <Button variant={'default'} onClick={() => navigate('/history')} className="text-md min-w-[200px] hover:bg-accent hover:text-slate-900 transition-all duration-500">
                  Histórico de viagens
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}