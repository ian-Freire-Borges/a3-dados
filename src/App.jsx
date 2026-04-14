import './App.css'
import SideMenu from './components/SideMenu'
import BodyCharts from './components/BodyCharts'

function App() {
  return (
      <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideMenu />
      <BodyCharts/>
    </div>
  )
}

export default App
