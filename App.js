import React, { useState } from "react";

export default function ControleFraldas() {
  const [nome, setNome] = useState("");
  const [tamanho, setTamanho] = useState("P");
  const [quantidade, setQuantidade] = useState("");
  const [convidados, setConvidados] = useState([]);

  const tamanhos = ["P", "M", "G"];

  const porcentagemIdeal = { P: 35, M: 50, G: 15 };

  const adicionarFralda = () => {
    if (!nome || !quantidade) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaEntrada = { nome, tamanho, quantidade: parseInt(quantidade) };
    setConvidados((prev) => [...prev, novaEntrada]);

    setNome("");
    setQuantidade("");
  };

  const totalFraldas = convidados.reduce((sum, c) => sum + c.quantidade, 0);
  const contagemFraldas = tamanhos.reduce((acc, t) => {
    acc[t] = convidados
      .filter((c) => c.tamanho === t)
      .reduce((sum, c) => sum + c.quantidade, 0);
    return acc;
  }, {});

  const porcentagemAtual = tamanhos.reduce((acc, t) => {
    acc[t] = totalFraldas > 0 ? ((contagemFraldas[t] / totalFraldas) * 100).toFixed(1) : 0;
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative p-6">
      {/* Fundo azul e rosa */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-pink-300"></div>

      <div className="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Chá Revelação 🎉</h1>

        <p className="text-gray-600 text-lg mb-4">
          Vamos ajudar os papais a manter um estoque equilibrado? Veja a sugestão abaixo!
        </p>

        {/* Campo Nome */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Nome</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>

        {/* Seletor de Tamanho */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Tamanho</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
          >
            {tamanhos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Campo Quantidade */}
        <div className="mb-4">
          <label className="block text-lg font-semibold text-gray-700">Quantidade</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Digite a quantidade"
          />
        </div>

        {/* Botão de confirmação */}
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          onClick={adicionarFralda}
        >
          CONFIRMAR 🎁
        </button>
      </div>

      {/* Resumo das Fraldas */}
      <div className="relative bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo das Fraldas</h2>
        <ul className="text-gray-700 text-lg">
          {tamanhos.map((t) => (
            <li key={t}>
              {t}: <strong>{contagemFraldas[t]}</strong> pacotes ({porcentagemAtual[t]}%)
            </li>
          ))}
        </ul>
      </div>

      {/* Mensagem explicativa */}
      <div className="relative bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Sugestão de Distribuição</h2>
        <p className="text-gray-700 text-lg">
          🔹 <strong>{porcentagemIdeal.P}%</strong> em tamanho P <br />
          🔹 <strong>{porcentagemIdeal.M}%</strong> em tamanho M <br />
          🔹 <strong>{porcentagemIdeal.G}%</strong> em tamanho G <br />
        </p>
        <p className="text-gray-600 mt-4">
          Se algum tamanho já estiver com muita quantidade, escolha outro para variar. Assim, garantimos que nada falte em cada fase do bebê!
        </p>
        <p className="text-gray-800 font-bold mt-4">
          💙 Obrigado por fazer parte desse momento especial! 💗
        </p>
      </div>
    </div>
  );
}

