import { useThreeKingdomsContext } from '../contexts/ThreeKingdomsContext'
import useFavorites from '../hooks/useFavorites'
import CharacterCard from '../components/CharacterCard'
import BattleCard from '../components/BattleCard'

function Favorites() {
  const { favorites: favChars, removeFavorite: removeChar } = useFavorites('favCharacters')
  const { favorites: favBattles, removeFavorite: removeBattle } = useFavorites('favBattles')

  return (
    <div className="container mt-4">
      <h4>Favoritmu</h4>
      
      <div className="mt-4">
        <h5>Karakter ({favChars.length})</h5>
        {favChars.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {favChars.map(character => (
              <div key={character.id} className="col">
                <CharacterCard 
                  character={character} 
                  isFavorite={true}
                  onToggleFavorite={() => removeChar(character.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Belum ada karakter favorit.</p>
        )}
      </div>

      <div className="mt-5">
        <h5>Pertempuran ({favBattles.length})</h5>
        {favBattles.length > 0 ? (
          <div className="row row-cols-1 row-cols-lg-2 g-3">
            {favBattles.map(battle => (
              <div key={battle.id} className="col">
                <BattleCard 
                  battle={battle}
                  isFavorite={true}
                  onToggleFavorite={() => removeBattle(battle.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Belum ada pertempuran favorit.</p>
        )}
      </div>
    </div>
  )
}

export default Favorites
