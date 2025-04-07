import { useState } from 'react'
import useThreeKingdomsData from '../hooks/useThreeKingdomsData'
import CharacterCard from '../components/CharacterCard'
import LoadingSpinner from '../components/LoadingSpinner'
import FactionFilter from '../components/FactionFilter'

function Characters() {
  const { data: characters, loading, error } = useThreeKingdomsData('characters')
  const [filter, setFilter] = useState('All')

  if (loading) return <LoadingSpinner />
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  const filteredCharacters = filter === 'All' 
    ? characters 
    : characters.filter(char => char.faction === filter)

  return (
    <div>
      <h1 className="h4 mb-3">Karakter</h1>
      
      <FactionFilter currentFilter={filter} onFilterChange={setFilter} />
      
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {filteredCharacters.map(character => (
          <div key={character.id} className="col">
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Characters