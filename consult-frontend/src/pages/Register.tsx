import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmar senha deve ter no mínimo 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Dados de registro:", data);
    navigate('/login');
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
          Criar Nova Conta
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Crie sua senha (mínimo 6 caracteres)"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Confirmar Senha
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirme sua senha"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Criar Conta
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Já possui uma conta?
            <Link to="/" className="text-blue-500 hover:text-blue-700 ml-1">
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}