'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addInstallment(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get("name") as string
    const totalAmount = parseFloat(formData.get("total_amount") as string)
    const totalInstallments = parseInt(formData.get("total_installments") as string)
    const startDate = formData.get("start_date") as string

    // Calculate installment amount (simple division for now)
    const installmentAmount = totalAmount / totalInstallments

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { error } = await supabase.from("installments").insert({
        user_id: user.id,
        name,
        total_amount: totalAmount,
        total_installments: totalInstallments,
        installment_amount: installmentAmount,
        start_date: startDate
    })

    if (error) {
        console.error("Error adding installment:", error)
        // Handle error (e.g., return to form with error)
        return { error: "Failed to add installment" }
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
}
