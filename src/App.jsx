import './App.css'
import { Button } from '@mui/material'

function App() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className='text-3xl font-bold text-yellow-300 mb-4'>
        ¡Probando!
      </h1>
      <Button variant='contained' color='primary'>
        ¡Click aquí!
      </Button>
    </div>
  )
}

export default App
