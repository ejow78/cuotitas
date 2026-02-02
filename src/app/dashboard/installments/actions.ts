'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addInstallment(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get("name") as string
    const totalAmount = parseFloat(formData.get("total_amount") as string)
    const totalInstallments = parseInt(formData.get("total_installments") as string)
    const startDate = formData.get("start_date") as string

    // Check for custom installment amount FIRST
    const customAmountRaw = formData.get("custom_installment_amount") as string
    let installmentAmount = 0

    if (customAmountRaw && customAmountRaw.trim() !== "") {
        installmentAmount = parseFloat(customAmountRaw)
    } else {
        // Fallback to calculation
        installmentAmount = totalAmount / totalInstallments
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "User not authenticated" }
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
        return { error: "Failed to add installment" }
    }

    revalidatePath("/dashboard")
    return { success: true }
}
