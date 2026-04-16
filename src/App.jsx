import './App.css'
import SideMenu from './components/SideMenu'
import BodyCharts from './components/BodyCharts'
import { useState } from 'react'

function App() {
    const [filtroIdade, setFiltroIdade] = useState()
    const [filtroCurso, setFiltroCurso] = useState()
    const [modoCores, setModoCores] = useState()
    const [filtroTemas, setFiltroTemas] = useState("geral")
      
  
  return (
      <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideMenu setFiltroIdade={setFiltroIdade} setFiltroCurso={setFiltroCurso} setModoCores={setModoCores} setFiltroTemas={setFiltroTemas}/>
      <BodyCharts filtroIdade={filtroIdade} filtroCurso={filtroCurso} modoCores={modoCores} filtroTemas={filtroTemas} />
    </div>
  )
}

export default App
