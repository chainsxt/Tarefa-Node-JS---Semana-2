import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./console.module.css";
import voltar from "../../assets/voltar.png";
import type { Livro } from "../../types/livro.ts";

export default function Produto() {
  const { livroId } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [adicionado, setAdicionado] = useState(false);

  function handleClick(){
  setAdicionado(true);
  }


  useEffect(() => {
    axios.get("/livros.json").then((response) => {
      const todos = response.data.livros;
      const encontrado = todos.find((l: Livro) => l.id === Number(livroId));
      setLivro(encontrado);
    });
  }, [livroId]);

   if (!livro) return <p>Carregando...</p>;

  return (
    <main className={styles.containerPrincipal}>
      <div className={styles.header}>
        <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
        <img src={voltar} alt="voltar"/>
        Detalhes do livro
        </button>
      </div>

      <div className={styles.conteudo}>
        <div className={styles.capaContainer}>
          <img src={livro.capa} alt={livro.titulo} />
        </div>

        <div className={styles.info}>
          <div className={styles.detalhes}>
          <h1 className={styles.titulo}>{livro.titulo}</h1>
          <p className={styles.autor}>{livro.autor}</p>
          </div>
          <div className={styles.sinopse}>
            <h3>Sinopse</h3>
            <p>{livro.sinopse}</p>
          </div>

          <div className={styles.rodape}>
            <span className={styles.preco}>
              R$ {livro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <button onClick={handleClick}  className={adicionado ? styles.btnAdicionado : styles.btnCarrinho}>
              {adicionado ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}