import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const HistoryTable = (data: []) => {

  return (
    <>
      <div>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Id</TableHead>
              <TableHead>Motorista</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="">Origem</TableHead>
              <TableHead className="">Destino</TableHead>
              <TableHead className="">Tempo</TableHead>
              <TableHead className="">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.length > 0 && data?.data?.map((ride, index) => (
              <TableRow key={index}>
                <TableCell className="w-[20px]">{ride.id}</TableCell>
                <TableCell>{ride.driver.name}</TableCell>
                <TableCell>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hourCycle: 'h23' }).format(new Date(ride.date))}</TableCell>
                <TableCell className="text-right">{ride.origin}</TableCell>
                <TableCell className="text-right">{ride.destination}</TableCell>
                <TableCell className="text-right">{ride.duration}</TableCell>
                <TableCell className="text-right">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ride.value / 1000)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </>
  )
}