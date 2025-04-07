import { useParams, Link } from 'react-router-dom'
import useThreeKingdomsData from '../hooks/useThreeKingdomsData'
import LoadingSpinner from '../components/LoadingSpinner'
import { useThreeKingdomsContext } from '../contexts/ThreeKingdomsContext'

function BattleDetail() {
  const { id } = useParams()
  const { data: battle, loading, error } = useThreeKingdomsData(`battles/${id}`)
  const { characters } = useThreeKingdomsContext()

  if (loading) return <LoadingSpinner />
  if (error || !battle) return <div className="alert alert-danger">Error: {error || 'Battle not found'}</div>

  const findCharacterByName = (name) => {
    if (!characters) return null;
    return characters.find(char => char.name.includes(name.split(' (')[0]))
  }

  return (
    <div className="card card-dark">
      <div className="card-body">
        <h1 className="card-title">{battle.name}</h1>
        <h3 className="text-muted">{battle.namePinyin || ''}</h3>

        <div className="row mt-4">
          <div className="col-md-6">
            <h4>Informasi Pertempuran</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent text-dark border-secondary">
                <strong>Tahun:</strong> {battle.year || 'Unknown'}
              </li>
              <li className="list-group-item bg-transparent text-dark border-secondary">
                <strong>Lokasi:</strong> {battle.location || 'Unknown'}
              </li>
              <li className="list-group-item bg-transparent text-dark border-secondary">
                <strong>Hasil:</strong> {battle.outcome || 'Unknown'}
              </li>
              <li className="list-group-item bg-transparent text-dark border-secondary">
                <strong>Faksi:</strong>
                <div className="mt-2">
                  {battle.factions?.map((faction, index) => (
                    <span key={index} className="badge bg-secondary me-2">{faction}</span>
                  )) || 'None listed'}
                </div>
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <h4>Komandan</h4>
            <div className="mb-4">
              {battle.commanders?.map((commander, index) => {
                const character = findCharacterByName(commander)
                return character ? (
                  <Link 
                    key={index} 
                    to={`/characters/${character.id}`}
                    className="badge bg-primary me-2 mb-2 text-decoration-none"
                  >
                    {commander}
                  </Link>
                ) : (
                  <span key={index} className="badge bg-secondary me-2 mb-2">
                    {commander}
                  </span>
                )
              }) || 'No commanders listed'}
            </div>

            <h4>Deskripsi</h4>
            <p className="card-text">{battle.description || 'No description available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleDetail