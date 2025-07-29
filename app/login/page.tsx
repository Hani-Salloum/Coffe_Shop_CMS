
 //@ts-nocheck
// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Eye, EyeOff, Phone, Lock, Loader } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { cn } from "@/lib/utils"
// import { login } from "@/requests/user-management"
// import Cookies from "js-cookie";


// // Define the form schema with Zod
// const loginSchema = z.object({
//   phoneNumber: z
//     .string()
//     .min(1, "Phone number is required")
//     .refine((val) => {
//       // Remove all non-digit characters for validation
//       const digits = val.replace(/\D/g, "")
//       return digits.length === 10 || digits.length === 9
//     }, "Please enter a valid 10-digit phone number"),
//   password: z.string().min(1, "Password is required"),
//   rememberMe: z.boolean().optional(),
// })

// // Infer the type from the schema
// type LoginFormValues = z.infer<typeof loginSchema>

// export default function LoginPage() {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [serverError, setServerError] = useState<string | null>(null)

//   // Initialize react-hook-form with zod resolver
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       phoneNumber: "",
//       password: "",
//     },
//   })

//   // Watch the phone number to format it
// //   const phoneNumber = watch("phoneNumber")

//   // Format phone number as user types
// //   const formatPhoneNumber = (value: string) => {
// //     // Remove all non-digit characters
// //     let digits = value.replace(/\D/g, "")

// //     // Limit to 10 digits
// //     digits = digits.substring(0, 10)

// //     // Format the phone number
// //     if (digits.length > 0) {
// //       if (digits.length <= 3) {
// //         return digits
// //       } else if (digits.length <= 6) {
// //         return `${digits.slice(0, 3)}-${digits.slice(3)}`
// //       } else {
// //         return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
// //       }
// //     }

// //     return ""
// //   }

//   // Handle phone number change and formatting
// //   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     // const formattedValue = formatPhoneNumber(e.target.value)
// //     setValue("phoneNumber", e.target.value, { shouldValidate: true })
// //   }

//   // Handle form submission
//   const onSubmit = async (data: LoginFormValues) => {
//     setServerError(null)
//     setIsLoading(true)

//     try {
//       await login(data.phoneNumber, data.password).then((res: any) => {
//         const token = res.data.access
//         console.log(token)
//         Cookies.set("accessToken", token);
//       })

//       router.push("/dashboard/user-management")
//     } catch (err) {
//       console.error("Login error:", err)
//       setServerError("Invalid credentials. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold">Welcome back</h1>
//             <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
//           </div>

//           {serverError && (
//             <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
//               {serverError}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Phone Number
//               </Label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <Phone className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <Input
//                   id="phoneNumber"
//                   type="tel"
//                   placeholder="123-456-7890"
//                   className={cn(
//                     "pl-10 rounded-xl shadow-sm",
//                     errors.phoneNumber ? "border-red-500 focus:ring-red-500" : "",
//                   )}
//                   disabled={isLoading}
//                   {...register("phoneNumber")}
//                 />
//               </div>
//               {errors.phoneNumber ? (
//                 <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
//               ) : (
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Enter your 10-digit phone number</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </Label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <Lock className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={cn(
//                     "pl-10 pr-10 rounded-xl shadow-sm",
//                     errors.password ? "border-red-500 focus:ring-red-500" : "",
//                   )}
//                   disabled={isLoading}
//                   {...register("password")}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 flex items-center pr-3"
//                   onClick={() => setShowPassword(!showPassword)}
//                   tabIndex={-1}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-400" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
//             </div>

//             {/* <div className="flex items-center justify-between">
//               <ModernCheckbox label="Remember me" id="rememberMe" {...register("rememberMe")} disabled={isLoading} />

//               <button
//                 type="button"
//                 className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
//                 disabled={isLoading}
//               >
//                 Forgot password?
//               </button>
//             </div> */}

//             <Button type="submit" className="w-full rounded-xl h-11" disabled={isLoading}>
//               {isLoading ? <Loader className="size-4" /> : "Login"}
//             </Button>
//           </form>
//         </div>

//         {/* <div className="text-center mt-6">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Need help? Contact support at{" "}
//             <a href="mailto:support@example.com" className="text-primary hover:text-primary/90 transition-colors">
//               support@example.com
//             </a>
//           </p>
//         </div> */}
//       </div>
//     </div>
//   )
// }

export default async function Page() {
  return <>
   test
  </>
}