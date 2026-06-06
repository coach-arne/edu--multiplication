import { useNavigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import PlayerCard from '@/components/progress/PlayerCard'
import { Button } from '@/components/ui/button'
import { getCategoryConfig } from '@/data/categories'

const HomePage = () => {
  const navigate = useNavigate()
  const multiplication = getCategoryConfig('multiplication')
  const division = getCategoryConfig('division')

  return (
    <AppLayout>
      <div className="flex flex-col items-center gap-8 flex-1">
        <div className="text-center mt-4">
          <h1 className="text-4xl font-bold text-amber-800 mb-1">Reken Avontuur</h1>
          <p className="text-amber-600 text-lg">Oefen maaltafels en deeltafels!</p>
        </div>

        <PlayerCard />

        <div className="flex flex-col gap-4 w-full">
          <Button
            size="lg"
            onClick={() => navigate(`/select/${multiplication.routeSegment}`)}
            className="w-full h-20 text-2xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg active:scale-95 transition-transform"
          >
            {multiplication.symbol} {multiplication.startButtonLabel}
          </Button>

          <Button
            size="lg"
            onClick={() => navigate(`/select/${division.routeSegment}`)}
            className="w-full h-20 text-2xl font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-lg active:scale-95 transition-transform"
          >
            {division.symbol} {division.startButtonLabel}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/progress')}
            className="w-full h-14 text-lg font-semibold border-amber-300 text-amber-700 hover:bg-amber-50 active:scale-95 transition-transform"
          >
            Bekijk Voortgang
          </Button>
        </div>

        <div className="mt-auto pb-4 text-center text-amber-400 text-sm">
          <p>Maaltafels en deeltafels 1 t.e.m. 10</p>
        </div>
      </div>
    </AppLayout>
  )
}

export default HomePage
