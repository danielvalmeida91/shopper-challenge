import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { LucideUserCheck } from "lucide-react";
import { Ratings } from "./rating";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useState } from "react";
import { useShopper } from "@/context/shopper-context";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

interface IDriver {

  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface IDriversCarousel {
  drivers: IDriver[]
}
export const DriversCarousel = ({ drivers }: IDriversCarousel) => {
  const { data, updateDataContext } = useShopper()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSelectDriver = async (driver: {}) => {
    try {
      setIsLoading(true)
      updateDataContext({ ...data, driverSelected: { ...driver } })

      const payload = {
        customer_id: String(data?.customer_id),
        origin: data?.destination.description,
        destination: data?.origin.description,
        distance: data?.distance,
        duration: data?.duration,
        driver: {
          id: driver?.id,
          name: driver?.name
        },
        value: driver?.value
      }

      await api.patch('/api/ride/confirm', payload)
      toast.success('Viagem confirmada com sucesso !')
      navigate('/history')
    } catch (error) {
      if (error instanceof AxiosError) toast.error(error.response.data.error_description)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="max-w-[300px] md:max-w-[600px] lg:max-w-[900px]">
        {drivers.map((driver, index) => {
          return (
            <CarouselItem key={index} className="basis-[100%] md:basis-1/2 lg:basis-1/3 ">
              <div className="w-full p-1">
                <Card>
                  <CardContent className="flex flex-col gap-4 aspect- min-h-[320px] items-center justify-between p-4">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center">
                        <LucideUserCheck size={30} className="text-muted" />
                      </div>
                      <Ratings variant="yellow" rating={driver.review.rating ?? 0} />
                      <p className="text-foreground  font-semibold">{driver.name ?? ''}</p>
                    </div>
                    <p className="text-muted-foreground font-semibold text-sm">Comentário: <span className=" text-foreground caption leading-5 line-clamp-3 overflow-hidden text-ellipsis text-xs">{driver.review?.comment ?? ''}</span></p>

                    <Button variant={'default'} onClick={() => handleSelectDriver(driver)} className="text-sm min-w-[100px] hover:bg-slate-950 hover:text-muted transition-all duration-500" disabled={isLoading}>
                      Escolher {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((driver.value / 1000) ?? 0)}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}