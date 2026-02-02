'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addLoan(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get("name") as string
    const amount = parseFloat(formData.get("amount") as string)
    const type = formData.get("type") as string // 'lent' or 'borrowed'
    const interestRate = parseFloat(formData.get("interest_rate") as string || "0")
    const dueDate = formData.get("due_date") as string

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "No user found" }
    }

    const { error } = await supabase.from("loans").insert({
        user_id: user.id,
        name,
        amount,
        type,
        interest_rate: interestRate,
        due_date: dueDate || null,
        status: 'pending'
    })

    if (error) {
        console.error("Error adding loan:", error)
        return { error: "Failed to add loan" }
    }

    revalidatePath("/dashboard")
    return { success: true }
}
