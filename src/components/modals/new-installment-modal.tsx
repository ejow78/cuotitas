"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { addInstallment } from "@/app/dashboard/installments/actions"
import { toast } from "sonner"

export function NewInstallmentModal() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Custom amount logic
    const [totalAmount, setTotalAmount] = useState("")
    const [installments, setInstallments] = useState("12")
    const [customInstallmentAmount, setCustomInstallmentAmount] = useState("")
    const [isCustomAmount, setIsCustomAmount] = useState(false)

    // Calculate estimated installment amount when total or installments change
    const calculateEstimated = () => {
        if (!totalAmount || !installments) return ""
        return (parseFloat(totalAmount) / parseInt(installments)).toFixed(2)
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true)

        // Add custom amount flag/value handling if needed on server, 
        // but the input 'installment_amount' (if we add it) or 'custom_amount' 
        // should be handled by the action. 
        // For now, let's append the calculated/custom amount logicaly.

        // We'll pass the logic to the server action or prepare data here?
        // Server action expects FormData. We can let the form submit naturally
        // or intercept. Intercepting gives better control over modal closing.

        // Let's rely on standard form action but wrapped to close modal
        const result = await addInstallment(formData)

        setLoading(false)
        if (result && result.error) {
            toast.error("Error al guardar")
        } else {
            toast.success("Compra agregada")
            setOpen(false)
            // Reset form? The dialog unmounts or we can reset states
            setTotalAmount("")
            setCustomInstallmentAmount("")
            setIsCustomAmount(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nueva Compra
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nueva Compra en Cuotas</DialogTitle>
                    <DialogDescription>
                        Agrega una nueva compra a tu seguimiento.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input id="name" name="name" placeholder="Ej: TV" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="total_amount" className="text-right">
                            Total
                        </Label>
                        <Input
                            id="total_amount"
                            name="total_amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="col-span-3"
                            required
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="total_installments" className="text-right">
                            Cuotas
                        </Label>
                        <div className="col-span-3">
                            <Select name="total_installments" value={installments} onValueChange={setInstallments} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Pago</SelectItem>
                                    <SelectItem value="3">3 Cuotas</SelectItem>
                                    <SelectItem value="6">6 Cuotas</SelectItem>
                                    <SelectItem value="9">9 Cuotas</SelectItem>
                                    <SelectItem value="12">12 Cuotas</SelectItem>
                                    <SelectItem value="18">18 Cuotas</SelectItem>
                                    <SelectItem value="24">24 Cuotas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-xs text-muted-foreground">Valor Cuota</Label>
                        <div className="col-span-3 flex items-center gap-2">
                            <Input
                                name="custom_installment_amount" // We'll look for this in action
                                type="number"
                                step="0.01"
                                placeholder="Auto-calculado"
                                value={isCustomAmount ? customInstallmentAmount : calculateEstimated()}
                                onChange={(e) => {
                                    setIsCustomAmount(true)
                                    setCustomInstallmentAmount(e.target.value)
                                }}
                                className={isCustomAmount ? "border-primary" : "opacity-80"}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setIsCustomAmount(false)
                                    setCustomInstallmentAmount("")
                                }}
                                title="Recalcular automáticamente"
                            >
                                ↺
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start_date" className="text-right">
                            Inicio
                        </Label>
                        <Input
                            id="start_date"
                            name="start_date"
                            type="date"
                            className="col-span-3"
                            required
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
