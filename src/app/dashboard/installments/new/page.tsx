import { addInstallment } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewInstallmentPage() {
    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Nueva Compra en Cuotas</CardTitle>
                    <CardDescription>Agrega una nueva compra para seguimiento.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={addInstallment} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre / Descripción</Label>
                            <Input id="name" name="name" placeholder="Ej: TV Samsung" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="total_amount">Monto Total</Label>
                            <Input id="total_amount" name="total_amount" type="number" step="0.01" placeholder="0.00" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="total_installments">Cantidad de Cuotas</Label>
                            <Select name="total_installments" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3">3 Cuotas</SelectItem>
                                    <SelectItem value="6">6 Cuotas</SelectItem>
                                    <SelectItem value="9">9 Cuotas</SelectItem>
                                    <SelectItem value="12">12 Cuotas</SelectItem>
                                    <SelectItem value="18">18 Cuotas</SelectItem>
                                    <SelectItem value="24">24 Cuotas</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* Allow custom input if needed later */}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="start_date">Fecha de Inicio (Primera Cuota)</Label>
                            <Input id="start_date" name="start_date" type="date" required />
                        </div>
                        <Button type="submit" className="w-full">Agregar Compra</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
