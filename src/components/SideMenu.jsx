import React, { useState } from 'react'
import { useSheetData } from '../hooks/useSheetData'

const TEMAS = [
  { value: 'geral',       label: 'Geral' },
  { value: 'desempenho',  label: 'Desempenho' },
  { value: 'habitos',     label: 'Hábitos de Estudo' },
  { value: 'perfil',      label: 'Perfil dos Estudantes' },
  { value: 'emocional',   label: 'Problemas emocionais' },  
  { value: 'ajuda',       label: 'Busca por ajuda' },
]

const CORES = [
  { value: 'default', label: 'Padrão' },
  { value: 'Tritanopia',  label: 'Tritanopia' },
  { value: 'Deuteranopia', label: 'Deuteranopia' },
  { value: 'Protanopia',    label: 'Protanopia' },
]

function SideMenu() {
  const { tema, setTema, cores, setCores, filtros, aplicarFiltros, limparFiltros, opcoes, data, rawData } = useSheetData()

  // Filtros locais (antes de aplicar)
  const [localFiltros, setLocalFiltros] = useState({ ...filtros })
  const [filtroAberto, setFiltroAberto] = useState(false)

  const temFiltroAtivo = Object.values(filtros).some(v => v !== '')

  function handleAplicar() {
    aplicarFiltros(localFiltros)
    setFiltroAberto(false)
  }

  function handleLimpar() {
    const vazio = { idade: '', curso: '', trabalho: '', semestre: '', desempenho: '' }
    setLocalFiltros(vazio)
    limparFiltros()
    setFiltroAberto(false)
  }

  return (
    <div style={{
      width: '240px',
      minWidth: '240px',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      gap: 0,
      boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
    }}>

      {/* Logo / Título */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>📊</div>
          <div>
            <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Saúde Mental</div>
            <div style={{ color: '#64748b', fontSize: 11 }}>Bem-estar Acadêmico</div>
          </div>
        </div>

        {/* Contador de respostas */}
        <div style={{
          marginTop: 14, background: '#1e293b', borderRadius: 8,
          padding: '8px 12px', border: '1px solid #334155',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: '#94a3b8', fontSize: 11 }}>Respostas</span>
          <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 14 }}>
            {temFiltroAtivo ? `${data.length} / ${rawData.length}` : rawData.length}
          </span>
        </div>
      </div>

      {/* ─── Temas ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>
          Tema
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {TEMAS.map(t => (
            <button key={t.value} onClick={() => setTema(t.value)} style={{
              background: tema === t.value ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : 'transparent',
              border: 'none', borderRadius: 8, padding: '8px 12px',
              color: tema === t.value ? '#fff' : '#94a3b8',
              fontWeight: tema === t.value ? 600 : 400,
              fontSize: 13, textAlign: 'left', cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Cores ──────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>
          Paleta de Cores
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {CORES.map(c => (
            <button key={c.value} onClick={() => setCores(c.value)} style={{
              background: cores === c.value ? '#334155' : 'transparent',
              border: cores === c.value ? '1px solid #6366f1' : '1px solid #1e293b',
              borderRadius: 6, padding: '6px 8px',
              color: cores === c.value ? '#e2e8f0' : '#64748b',
              fontSize: 11, cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Filtros ─────────────────────────────────────────── */}
      <div>
        <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>
          Filtros {temFiltroAtivo && <span style={{ color: '#f59e0b', marginLeft: 4 }}>●</span>}
        </p>

        <button onClick={() => setFiltroAberto(o => !o)} style={{
          width: '100%', background: filtroAberto ? '#334155' : '#1e293b',
          border: '1px solid #334155', borderRadius: 8, padding: '8px 12px',
          color: '#e2e8f0', fontSize: 13, cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'all 0.15s',
        }}>
          <span>⚙️ Filtrar dados</span>
          <span style={{ transform: filtroAberto ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
        </button>

        {filtroAberto && (
          <div style={{
            marginTop: 8, background: '#1e293b', borderRadius: 8,
            border: '1px solid #334155', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>

            {/* Idade */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>Idade</label>
              <select value={localFiltros.idade} onChange={e => setLocalFiltros(p => ({ ...p, idade: e.target.value }))}
                style={selectStyle}>
                <option value="">Todas</option>
                {opcoes.idades.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Curso */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>Curso</label>
              <select value={localFiltros.curso} onChange={e => setLocalFiltros(p => ({ ...p, curso: e.target.value }))}
                style={selectStyle}>
                <option value="">Todos</option>
                {opcoes.cursos.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Trabalho */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>Trabalha?</label>
              <select value={localFiltros.trabalho} onChange={e => setLocalFiltros(p => ({ ...p, trabalho: e.target.value }))}
                style={selectStyle}>
                <option value="">Todos</option>
                {opcoes.trabalhos.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Semestre */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>Semestre</label>
              <select value={localFiltros.semestre} onChange={e => setLocalFiltros(p => ({ ...p, semestre: e.target.value }))}
                style={selectStyle}>
                <option value="">Todos</option>
                {opcoes.semestres.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Desempenho */}
            <div>
              <label style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>Desempenho</label>
              <select value={localFiltros.desempenho} onChange={e => setLocalFiltros(p => ({ ...p, desempenho: e.target.value }))}
                style={selectStyle}>
                <option value="">Todos</option>
                {opcoes.desempenho.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <button onClick={handleAplicar} style={{
                flex: 1, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                border: 'none', borderRadius: 6, padding: '7px 0',
                color: '#fff', fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}>
                Aplicar
              </button>
              <button onClick={handleLimpar} style={{
                flex: 1, background: '#334155', border: 'none',
                borderRadius: 6, padding: '7px 0',
                color: '#94a3b8', fontWeight: 600, fontSize: 12, cursor: 'pointer',
              }}>
                Limpar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <p style={{ color: '#334155', fontSize: 10, textAlign: 'center' }}>
          Dados via Google Forms
        </p>
      </div>
    </div>
  )
}

const selectStyle = {
  width: '100%', background: '#0f172a', border: '1px solid #334155',
  borderRadius: 6, padding: '6px 8px', color: '#e2e8f0',
  fontSize: 12, outline: 'none',
}

export default SideMenu
