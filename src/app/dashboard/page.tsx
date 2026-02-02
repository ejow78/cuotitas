
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { NewInstallmentModal } from "@/components/modals/new-installment-modal"
import { NewServiceModal } from "@/components/modals/new-service-modal"
import { NewLoanModal } from "@/components/modals/new-loan-modal"

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // Fetch services
    const { data: services } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)

    let servicesTotal = 0
    services?.forEach((svc) => {
        // Services are monthly by default for now
        servicesTotal += svc.amount
    })

    // Fetch installments
    const { data: installments } = await supabase
        .from("installments")
        .select("*")
        .eq("user_id", user.id)

    // Calculate monthly totals
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    let installmentsTotal = 0

    installments?.forEach((inst) => {
        const startDate = new Date(inst.start_date)
        const endDate = new Date(startDate)
        endDate.setMonth(startDate.getMonth() + inst.total_installments)

        // Check if the installment is active for the current month/year
        // Simple logic: if start date <= now < end date
        // Note: JS months are 0-indexed
        const startTotalMonths = startDate.getFullYear() * 12 + startDate.getMonth()
        const currentTotalMonths = currentYear * 12 + currentMonth
        const endTotalMonths = endDate.getFullYear() * 12 + endDate.getMonth()

        if (currentTotalMonths >= startTotalMonths && currentTotalMonths < endTotalMonths) {
            installmentsTotal += inst.installment_amount
        }
    })

    const monthlyTotal = installmentsTotal + servicesTotal

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="flex h-16 items-center justify-between border-b px-6">
                <h1 className="text-xl font-bold">Cuotitas Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" size="sm">Cerrar Sesión</Button>
                    </form>
                </div>
            </header>
            <main className="flex-1 p-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Mensual Estimado</CardTitle>
                            <span className="text-muted-foreground">$</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${monthlyTotal.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">
                                Sumatoria de cuotas + servicios
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cuotas del Mes</CardTitle>
                            <span className="text-muted-foreground">💳</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${installmentsTotal.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Servicios Fijos</CardTitle>
                            <span className="text-muted-foreground">💡</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${servicesTotal}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <NewInstallmentModal />
                    <NewServiceModal />
                    <NewLoanModal />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Próximos Vencimientos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">No hay vencimientos próximos.</p>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Resumen Tarjetas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Carga tu resumen para comparar.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
