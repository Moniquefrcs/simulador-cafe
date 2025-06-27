
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const cafes = [
  {
    id: 1,
    nome: "Café Tradicional",
    permiteLeite: false,
    adicionais: ["chantilly", "licor"]
  },
  {
    id: 2,
    nome: "Café com Leite",
    permiteLeite: true,
    adicionais: ["canela", "chocolate"]
  }
];

app.get('/cafes', (req, res) => {
  res.json(cafes);
});

app.post('/pedido', (req, res) => {
  const { cafeId, comLeite, adicionais } = req.body;
  const cafe = cafes.find(c => c.id === cafeId);
  if (!cafe) return res.status(400).json({ erro: 'Café inválido' });

  if (!cafe.permiteLeite && comLeite)
    return res.status(400).json({ erro: 'Este café não pode conter leite' });

  const adicionaisInvalidos = adicionais.filter(a => !cafe.adicionais.includes(a));
  if (adicionaisInvalidos.length)
    return res.status(400).json({ erro: `Adicionais inválidos: ${adicionaisInvalidos.join(', ')}` });

  res.json({ status: 'Pedido recebido com sucesso!' });
});

app.listen(3001, () => console.log('Backend rodando na porta 3001'));
