import { useParams } from 'react-router-dom'
import useThreeKingdomsData from '../hooks/useThreeKingdomsData'
import LoadingSpinner from '../components/LoadingSpinner'
import StatsChart from '../components/StatsChart'

function CharacterDetail() {
  const { id } = useParams()
  const { data: character, loading, error } = useThreeKingdomsData(`characters/${id}`)

  if (loading) return <LoadingSpinner />
  if (error || !character) return <div className="alert alert-danger">Error: {error || 'Character not found'}</div>

  const factionColor = {
    'Shu': 'text-shu',
    'Wei': 'text-wei',
    'Wu': 'text-wu',
    'Others': 'text-others'
  }[character.faction] || 'text-secondary'

  return (
    <div>
      <div className="card card-dark mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="card-title h4">
                <span className={factionColor}>{character.name}</span>
                <span className={`badge ${factionColor} bg-transparent border ms-2`}>
                  {character.faction}
                </span>
              </h1>
              <p className="text-muted mb-2">{character.birthYear} - {character.deathYear}</p>
            </div>
          </div>

          {character.stats && <StatsChart character={character} />}

          <div className="mt-3">
            <h5 className="h6">Biografi</h5>
            <p className="card-text">{character.description || 'No description available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail