import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useRef, useState } from "react"
import { api } from "@/api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useShopper } from "@/context/shopper-context"
import { useNavigate } from "react-router-dom"


export function EstimateRide() {
  const { data, updateDataContext } = useShopper()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formSchema = z.object({
    customer_id: z.string().min(1, { message: "Obrigatório" }),
    origin: z.string().min(1, { message: "Obrigatório" }),
    destination: z.string().min(1, { message: "Obrigatório" })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: "",
      origin: "",
      destination: ""
    }
  })

  const handleNavigate = () => {
    navigate('/confirm')
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const { data: responseEstimate } = await api.post('/api/ride/estimate', {
        customer_id: +data.customer_id,
        origin: data.origin,
        destination: data.destination
      })

      toast.success(responseEstimate.description)
      const { origin, destination } = responseEstimate.response
      const formatResponse = {
        ...responseEstimate.response,
        origin: {
          ...origin,
          description: data.origin
        },
        destination: {
          ...destination,
          description: data.destination
        }
      }
      updateDataContext(formatResponse)

      handleNavigate()
    } catch (error) {
      if (error instanceof AxiosError) toast.error(error.response.data.error_description)
    } finally {
      setIsLoading(false)
    }
  }


  interface PlaceAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
  }
  const PlaceAutocomplete = ({ value, onChange }: PlaceAutocompleteProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };
      autocompleteRef.current = new places.Autocomplete(inputRef.current, options);

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        const address = place?.formatted_address || place?.name || "";
        onChange(address);
      });
    }, [places, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Previne o envio do formulário
      }
    };

    return (
      <Input
        ref={inputRef}
        placeholder="Selecione a origem"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    );
  };

  return (
    <>
      <APIProvider apiKey={process.env.GOOGLE_API_KEY!}>
        <div className="flex-center min-h-[90vh] w-full text-muted p-5">
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <Card className="w-[600px]">
              <CardHeader>
                <CardTitle>Calcular viagem</CardTitle>
                <CardDescription>Insira os dados da viagem.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="customer_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel />
                          <FormControl>
                            <>
                              <Label htmlFor="customer_id">Usuário</Label>
                              <Input placeholder="ID do usuário" {...field} />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel />
                          <FormControl>
                            <>
                              <Label htmlFor="origin">Origem</Label>
                              <PlaceAutocomplete
                                value={field.value}
                                onChange={field.onChange}
                                onPlaceSelect={(place) => {
                                  form.setValue(
                                    "origin",
                                    place?.formatted_address || ""
                                  )
                                }}
                              />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel />
                          <FormControl>
                            <>
                              <Label htmlFor="destination">Destino</Label>
                              <PlaceAutocomplete
                                value={field.value}
                                onChange={field.onChange}
                                onPlaceSelect={(place) => {
                                  form.setValue(
                                    "origin",
                                    place?.formatted_address || ""
                                  )
                                }}
                              />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Form>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => form.reset()} disabled={isLoading}>Limpar</Button>
                <Button disabled={isLoading}>Calcular</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </APIProvider>
    </>
  )
}