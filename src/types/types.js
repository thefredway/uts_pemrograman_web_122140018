export const CharacterType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    faction: PropTypes.string.isRequired,
    birthYear: PropTypes.number.isRequired,
    deathYear: PropTypes.number.isRequired,
    strength: PropTypes.number.isRequired,
    intelligence: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  })
  
  export const BattleType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    namePinyin: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    factions: PropTypes.arrayOf(PropTypes.string).isRequired,
    commanders: PropTypes.arrayOf(PropTypes.string).isRequired,
    outcome: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })