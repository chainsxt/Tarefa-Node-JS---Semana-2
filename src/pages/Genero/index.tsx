import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./console.module.css";
import buscar from "../../assets/busca.png";
import voltar from "../../assets/voltar.png";
import type { Livro } from "../../types/livro.ts";

export default function Genero() {
  const { generoNome } = useParams();
  const navigate = useNavigate();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [pesquisa, setPesquisa] = useState("");

const livrosFiltrados = livros.filter(livro =>
  livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
);

  useEffect(() => {
    axios.get("/livros.json").then((response) => {
      const todos = response.data.livros;
      const filtrados = todos.filter((livro: Livro) => livro.genero === generoNome);
      setLivros(filtrados);
    });
  }, [generoNome]);

  return (
    <main className={styles.containerPrincipal}>
      <div className={styles.barraPesquisa}>
        <img src={buscar} alt="lupa de pesquisa"/>
        <input
            type="text"
            placeholder="Pesquisar por título"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
/>
      </div>

      <div className={styles.header}>
        <button className={styles.voltar} onClick={() => navigate(-1)}>
        <img src={voltar} alt="voltar" />
        {generoNome}
        </button>
      </div>

      <div className={styles.livrosGrid}>
        {livrosFiltrados.map(livro => (
          <div 
          key={livro.id} 
          className={styles.cardLivro}
          onClick={() => navigate(`/produto/${livro.id}`)}
          style={{ cursor: 'pointer' }}
          >
            <div className={styles.capaContainer}>
              <img src={livro.capa} alt={livro.titulo} />
            </div>
            <div className={styles.infoLivro}>
              <h3 className={styles.titulo}>{livro.titulo}</h3>
              <div className={styles.rodape}>
                <p className={styles.autor}>{livro.autor}</p>
                <p className={styles.preco}>
                  R$ {livro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}