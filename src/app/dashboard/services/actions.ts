'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addService(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get("name") as string
    const amount = parseFloat(formData.get("amount") as string)
    const dueDate = parseInt(formData.get("due_date") as string)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "No user found" }
    }

    const { error } = await supabase.from("services").insert({
        user_id: user.id,
        name,
        amount,
        due_date: dueDate,
        frequency: 'monthly'
    })

    if (error) {
        console.error("Error adding service:", error)
        return { error: "Failed to add service" }
    }

    revalidatePath("/dashboard")
    return { success: true }
}
