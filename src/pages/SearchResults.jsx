import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useThreeKingdomsData from '../hooks/useThreeKingdomsData'
import CharacterCard from '../components/CharacterCard'
import BattleCard from '../components/BattleCard'
import LoadingSpinner from '../components/LoadingSpinner'

function SearchResults() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') || ''
  const [results, setResults] = useState({ characters: [], battles: [] })
  const [loading, setLoading] = useState(true)

  const { data: characters } = useThreeKingdomsData('characters')
  const { data: battles } = useThreeKingdomsData('battles')

  useEffect(() => {
    if (characters && battles) {
      const filteredChars = characters.filter(char => 
        char.name.toLowerCase().includes(query.toLowerCase()) ||
        char.faction.toLowerCase().includes(query.toLowerCase()) ||
        char.description.toLowerCase().includes(query.toLowerCase())
      )
      
      const filteredBattles = battles.filter(battle => 
        battle.name.toLowerCase().includes(query.toLowerCase()) ||
        battle.location.toLowerCase().includes(query.toLowerCase()) ||
        battle.commanders.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
        battle.description.toLowerCase().includes(query.toLowerCase())
      )

      setResults({
        characters: filteredChars,
        battles: filteredBattles
      })
      setLoading(false)
    }
  }, [query, characters, battles])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mt-4">
      <h4>Hasil pencarian untuk: "{query}"</h4>
      
      <div className="mt-4">
        <h5>Karakter ({results.characters.length})</h5>
        {results.characters.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {results.characters.map(character => (
              <div key={character.id} className="col">
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Tidak ada karakter yang ditemukan.</p>
        )}
      </div>

      <div className="mt-5">
        <h5>Pertempuran ({results.battles.length})</h5>
        {results.battles.length > 0 ? (
          <div className="row row-cols-1 row-cols-lg-2 g-3">
            {results.battles.map(battle => (
              <div key={battle.id} className="col">
                <BattleCard battle={battle} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Tidak ada pertempuran yang ditemukan.</p>
        )}
      </div>
    </div>
  )
}

export default SearchResults