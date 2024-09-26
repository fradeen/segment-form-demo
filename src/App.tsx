import { useRef } from 'react'
import './App.css'
import { Dialog } from './components/dialog'
import SegmentForm from './components/segmentForm'

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button type='button' onClick={() => dialogRef.current?.showModal()}>Save Segment</button>
      <Dialog ref={dialogRef}>
        <h1>Saving Segment</h1>
        <SegmentForm />
        <button type='button' id='dialogCloseBtn' onClick={() => dialogRef.current?.close()}>Close dialog</button>
      </Dialog>
    </>
  )
}

export default App
