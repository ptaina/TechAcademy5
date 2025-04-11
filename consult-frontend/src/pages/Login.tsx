import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          Acesso ao Sistema
        </h2> 

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu e-mail"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua senha"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors" // Botão verde
        >
          Entrar
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não possui uma conta?
            <Link to="/register" className="text-blue-500 hover:text-blue-700 ml-1">
              Criar Conta
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}