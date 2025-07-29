import {redirect} from "next/navigation"

export const handleUnauthorized = () => {
    redirect('/login')
}