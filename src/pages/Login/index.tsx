import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import livraria from "../../assets/livraria.jpg";
import styles from "./console.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido." }),
  senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

type UserSchema = z.infer<typeof userSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  function onSubmit(data: UserSchema) {
    console.log(data);
    reset();
    navigate("/home");
  }

  return (
    <div className={styles.pagina}>
      <img src={livraria} alt="livraria" className={styles.imagemLado} />
      <div className={styles.formularioLado}>
        <img src={logo} alt="logo" className={styles.logo} />

        <p className={styles.bemVindo}>Bem vindo(a)!</p>
        <h1 className={styles.titulo}>Entre na sua conta</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.campo}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Digite aqui seu e-mail"
              {...register("email")}
            />
            <p className={styles.erro}>{errors.email?.message}</p>

          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Digite aqui sua senha"
              {...register("senha")}
            />
            <p className={styles.erro}>{errors.senha?.message}</p>

          </div>

          <button className={styles.entrar} type="submit">
            Entrar
          </button>
        </form>

        <button className={styles.cadastro} onClick={() => navigate("#")}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
}