import { DriversCarousel } from "@/components/carousel"
import { useShopper } from "@/context/shopper-context"
import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps"

export const ConfirmRide = () => {
  const { data, updateDataContext } = useShopper()

  return (
    <>
      <APIProvider apiKey={process.env.GOOGLE_API_KEY!}>
        <div className="flex-center w-full h-full p-10">
          <div className="flex-center flex-col leading-relaxed gap-5">
            <div className="w-[300px] h-[300px] flex flex-col items-center justify-center lg:w-[900px] md:w-[600px] bg-muted rounded-lg gap-5">

              <h2 className="text-2xl font-bold leading-tight text-foreground">Olá , 👋</h2>
              <p className="text-foreground text-xl">Aqui estão os as estimativas de sua viagem !</p>
              <div className="flex flex-col  items-start justify-center">
                <p className="text-foreground text-sm font-bold">Origem: <span className="text-primary text-sm">{data.origin?.description ?? ''}</span></p>
                <p className="text-foreground text-sm font-bold">Destino: <span className="text-primary text-sm">{data.destination?.description ?? ''}</span></p>
                <p className="text-foreground text-sm font-bold">Distância: <span className="text-primary text-sm">{Number(data?.distance / 1000).toFixed(1) ?? ''}km</span></p>
                <p className="text-foreground text-sm font-bold">Tempo estimado: <span className="text-primary text-sm">{data.duration ?? ''}</span></p>
              </div>
            </div>
            <div className="w-[400px] h-[300px] lg:w-[900px] md:w-[600px]">
              <Map
                defaultZoom={13}
                defaultCenter={{ lat: data?.destination?.latitude ?? 0, lng: data?.destination?.longitude ?? 0 }}>
              </Map>
            </div>
            <div className="mb-10">
              {data?.options?.length > 0 ? (
                <div className="flex flex-col items-center justify-center gap-5">
                  <p className="text-muted text-xl text-center">Esolha um motorista e aguarde o contato !</p>
                  <DriversCarousel drivers={data?.options ?? []} />
                </div>

              ) : (
                <div className="w-[300px] h-[300px] flex items-center justify-center lg:w-[900px] md:w-[600px] bg-muted rounded-lg xs:flex-col">
                  <span className="text-muted-foreground text-sm font-bold md:text-xl lg:text-2xl">Que pena ... </span>
                  <span className="text-muted-foreground text-sm font-bold md:text-xl lg:text-2xl">😭 não temos motoristas disponíveis !</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </APIProvider>
    </>
  )
}