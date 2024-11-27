import { api } from "@/api"
import { AutoComplete } from "@/components/autocomplete"
import { HistoryTable } from "@/components/history-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const History = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [drivers, setDrivers] = useState([])
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [history, setHistory] = useState(null)
  const formSchema = z.object({
    customer_id: z.custom(value => value > 0, { message: "Código do usuário inválido" }),
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const { data: response } = await api.get(`/api/ride/${data.customer_id}`, {
        params: selectedDriver ? { driver_id: selectedDriver.value } : {}
      })
      setHistory(response)
      if (response?.rides.length === 0) {
        return toast.error('Nenhuma viagem encontrada')
      }
      return toast.success('Viagens encontradas com sucesso !')

    } catch (error) {
      if (error instanceof AxiosError) toast.error(error.response.data.error_description)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoading(true);
        const { data: drivers } = await api.get('/api/drivers');
        const formatDrivers = drivers.map((driver: any) => ({
          label: driver.name,
          value: driver.id
        }))
        setDrivers(formatDrivers);
      } catch (error) {
        toast.error('Erro ao buscar motoristas');
        console.error('Failed to fetch drivers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleResetForm = () => {
    form.reset({ customer_id: '', driver_id: '' })
    setSelectedDriver(null)
  }

  return (
    <>
      <div className="flex-center flex-col w-full min-h-[90vh] text-muted gap-10">
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <Card className="w-[600px]" >
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
              <CardDescription>Insira o código de seu usuário</CardDescription>
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
                  <FormField
                    control={form.control}
                    name="driver_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motorista</FormLabel>
                        <FormControl>
                          <AutoComplete
                            options={drivers}
                            emptyMessage="Não há motoristas"
                            placeholder="Selecione um motorista"
                            isLoading={isLoading}
                            onValueChange={(value) => {
                              setSelectedDriver(value)
                              form.setValue('driver_id', value)
                            }}
                            value={selectedDriver}
                            disabled={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handleResetForm} disabled={isLoading}>Limpar</Button>
              <Button disabled={isLoading}>Pesquisar</Button>
            </CardFooter>
          </Card >
        </form>


        {history && (
          <Card className="" >
            <CardContent>
              <div className="grid w-[600px] md:w-[700px] lg:w-[900px] items-center gap-4">
                <HistoryTable data={history.rides} />
              </div>
            </CardContent>
          </Card >
        )}
      </div>
    </>
  )
}