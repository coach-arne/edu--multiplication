import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'jotai'
import HomePage from '@/pages/HomePage'
import TableSelectPage from '@/pages/TableSelectPage'
import PracticePage from '@/pages/PracticePage'
import SessionSummaryPage from '@/pages/SessionSummaryPage'
import ProgressPage from '@/pages/ProgressPage'

const App = () => {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select/:category" element={<TableSelectPage />} />
          <Route path="/select" element={<Navigate to="/" replace />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/summary" element={<SessionSummaryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
