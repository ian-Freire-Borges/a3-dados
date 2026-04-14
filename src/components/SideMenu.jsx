import React, { useState } from 'react'

function SideMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="d-flex flex-column p-4 border-end shadow-sm"
      style={{
        width: '260px',
        background: '#e9ecef',
        minHeight: '100%'
      }}
    >
      <h4 className="mb-4 fw-bold text-primary">Menu</h4>

      <div className="mb-3">
            <label className="form-label fw-semibold">\Temas</label>
            <select className="form-select">
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Relações</label>
            <select className="form-select">
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
              <option>Selecione</option>
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
            <select className="form-select">
              <option>Selecione</option>
              <option>17 - 19</option>
              <option>20 - 21</option>
              <option>21 - 22</option>
              <option>23 - 24</option>
              <option>25 +</option>
            </select>
          </div>

          {/* Curso */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Curso</label>
            <select className="form-select">
              <option>Selecione</option>
              <option>Engenharia</option>
              <option>Direito</option>
              <option>Biomedicina</option>
              <option>Administração</option>
              <option>Jornalismo</option>
            </select>
          </div>

          <button className="btn btn-success w-100">
            Aplicar filtro
          </button>

        </div>
      </div>
    </div>
  )
}

export default SideMenu