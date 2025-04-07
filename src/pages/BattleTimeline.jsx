import useThreeKingdomsData from '../hooks/useThreeKingdomsData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useThreeKingdomsContext } from '../contexts/ThreeKingdomsContext'

function BattleTimeline() {
  const { data: battles, loading, error } = useThreeKingdomsData('battles')
  const { factions } = useThreeKingdomsContext()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  const sortedBattles = [...battles].sort((a, b) => a.year - b.year)

  const factionColors = {
    'Shu': 'var(--shu-color)',
    'Wei': 'var(--wei-color)',
    'Wu': 'var(--wu-color)',
    'Others': 'var(--others-color)'
  }

  return (
    <div>
      <h1 className="h4 mb-4">Linimasa Pertempuran</h1>
      
      <div className="timeline">
        {sortedBattles.map((battle, index) => {
          const primaryFaction = battle.factions[0] || 'Others'
          return (
            <div key={battle.id} className="timeline-item">
              <div className="timeline-point" style={{ 
                backgroundColor: factionColors[primaryFaction] 
              }}></div>
              
              <div className="card card-dark timeline-content">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title mb-1">{battle.name}</h5>
                    <span className="badge bg-secondary">{battle.year}</span>
                  </div>
                  <p className="text-muted small mb-2">{battle.location}</p>
                  <p className="small mb-1">
                    <strong>Hasil:</strong> {battle.outcome}
                  </p>
                  <div className="d-flex flex-wrap gap-1 mt-2">
                  {battle.factions.map((faction, i) => {
                    const bgColor = factionColors[faction]
                    const isColorAvailable = Boolean(bgColor)

                    return (
                        <span 
                        key={i} 
                        className="badge"
                        style={{ 
                            backgroundColor: isColorAvailable ? bgColor : '#fff',
                            color: isColorAvailable ? '#fff' : '#000',
                            border: isColorAvailable ? 'none' : '1px solid #000'
                        }}
                        >
                        {faction}
                        </span>
                    )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BattleTimeline