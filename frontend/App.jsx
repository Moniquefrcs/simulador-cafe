
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cafes, setCafes] = useState([]);
  const [cafeSelecionado, setCafeSelecionado] = useState(null);
  const [comLeite, setComLeite] = useState(false);
  const [adicionais, setAdicionais] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/cafes").then(res => setCafes(res.data));
  }, []);

  const fazerPedido = () => {
    axios
      .post("http://localhost:3001/pedido", {
        cafeId: cafeSelecionado.id,
        comLeite,
        adicionais
      })
      .then(res => setMensagem(res.data.status))
      .catch(err => setMensagem(err.response.data.erro));
  };

  return (
    <div>
      <h1>Monte seu Café</h1>
      <select onChange={(e) => {
        const selecionado = cafes.find(c => c.id === Number(e.target.value));
        setCafeSelecionado(selecionado);
        setAdicionais([]);
        setComLeite(false);
      }}>
        <option>Selecione um café</option>
        {cafes.map(cafe => (
          <option key={cafe.id} value={cafe.id}>{cafe.nome}</option>
        ))}
      </select>

      {cafeSelecionado && (
        <>
          <div>
            <label>
              <input type="checkbox" disabled={!cafeSelecionado.permiteLeite} checked={comLeite} onChange={e => setComLeite(e.target.checked)} />
              Adicionar leite
            </label>
          </div>

          <div>
            {cafeSelecionado.adicionais.map(add => (
              <label key={add}>
                <input
                  type="checkbox"
                  checked={adicionais.includes(add)}
                  onChange={() =>
                    setAdicionais(prev =>
                      prev.includes(add)
                        ? prev.filter(a => a !== add)
                        : [...prev, add]
                    )
                  }
                />
                {add}
              </label>
            ))}
          </div>

          <button onClick={fazerPedido}>Fazer Pedido</button>
        </>
      )}

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default App;
