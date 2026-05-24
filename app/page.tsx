import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div>
      {/* Login lewat Gugel */}
      <form action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/dashboard" })
      }}>
        <button type="submit">Login dengan Google</button>
      </form>

      {/* Lewat adalah pokona */}
      <form action={async (formData) => {
        "use server"
        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirectTo: "/dashboard",
        })
      }}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}