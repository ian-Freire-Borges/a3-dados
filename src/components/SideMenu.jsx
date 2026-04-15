import React, { useState } from "react";

function SideMenu({
  setFiltroIdade,
  setFiltroCurso,
  setModoCores,
  setFiltroTemas,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="d-flex flex-column p-4 border-end shadow-sm"
      style={{
        width: "260px",
        background: "#e9ecef",
        minHeight: "100%",
      }}
    >
      <h4 className="mb-4 fw-bold text-primary">Menu</h4>

      <div className="mb-3">
        <label className="form-label fw-semibold">Temas</label>
        <select
          className="form-select"
          onChange={(e) => setFiltroTemas(e.target.value)}
        >
          <option value="geral">Geral</option>
          <option value="desempenho">Desempenho</option>
          <option value="habitos">Hábitos de Estudo</option>
          <option value="perfil">Perfil dos Estudantes</option>
          <option value="engajamento">Engajamento</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold ">Tema de Cores</label>
        <select className="form-select ">
          <option value="default">Padrão</option>
          <option value="pastel">Pastel</option>
          <option value="vibrant">Vibrante</option>
          <option value="dark">Escuro</option>
          <option value="cool">Tons Frios</option>
          <option value="warm">Tons Quentes</option>
        </select>
      </div>

      <div className="dropdown mb-3">
        <button
          className="btn btn-primary dropdown-toggle w-100 text-start"
          type="button"
          data-bs-toggle="dropdown"
        >
          Filtrar
        </button>

        <div className="dropdown-menu p-3 w-100">
          {/* Idade */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Idade</label>
            <select
              className="form-select"
              onChange={(e) => setFiltroIdade(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="17-19">17 - 19</option>
              <option value="20-21">20 - 21</option>
              <option value="21-22">21 - 22</option>
              <option value="23-24">23 - 24</option>
              <option value="25+">25 +</option>
            </select>
          </div>

          {/* Curso */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Curso</label>
            <select
              className="form-select"
              onChange={(e) => setFiltroCurso(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="engenharia">Engenharia</option>
              <option value="direito">Direito</option>
              <option value="biomedicina">Biomedicina</option>
              <option value="administracao">Administração</option>
              <option value="jornalismo">Jornalismo</option>
            </select>
          </div>

          <button className="btn btn-success w-100">Aplicar filtro</button>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
