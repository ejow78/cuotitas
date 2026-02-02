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
import { addLoan } from "@/app/dashboard/loans/actions"
import { toast } from "sonner"
import { HandCoins } from "lucide-react"

export function NewLoanModal() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("borrowed") // borrowed (Debo plata), lent (Me deben plata)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        await addLoan(formData)
        setLoading(false)
        toast.success("Préstamo registrado")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <HandCoins className="mr-2 h-4 w-4" />
                    Préstamo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Registrar Préstamo</DialogTitle>
                    <DialogDescription>
                        Registra dinero que te prestaron o que prestaste.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Tipo</Label>
                        <div className="col-span-3">
                            <Select name="type" value={type} onValueChange={setType} required>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="borrowed">Me prestaron (Debo)</SelectItem>
                                    <SelectItem value="lent">Presté (Me deben)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            {type === 'borrowed' ? 'Acreedor' : 'Deudor'}
                        </Label>
                        <Input id="name" name="name" placeholder="Nombre de la persona/banco" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Monto
                        </Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="interest_rate" className="text-right">Interés %</Label>
                        <Input
                            id="interest_rate"
                            name="interest_rate"
                            type="number"
                            step="0.1"
                            placeholder="0"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="due_date" className="text-right">
                            Vencimiento
                        </Label>
                        <Input
                            id="due_date"
                            name="due_date"
                            type="date"
                            className="col-span-3"
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
