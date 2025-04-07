import PropTypes from 'prop-types'

function FactionFilter({ currentFilter, onFilterChange }) {
  const factions = [
    { name: 'All', bgColor: 'bg-dark', textColor: 'text-light' },
    { name: 'Shu', bgColor: 'bg-shu-light', textColor: 'text-shu-dark' },
    { name: 'Wei', bgColor: 'bg-wei-light', textColor: 'text-wei-dark' },
    { name: 'Wu', bgColor: 'bg-wu-light', textColor: 'text-wu-dark' },
    { name: 'Others', bgColor: 'bg-others-light', textColor: 'text-others-dark' }
  ]

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      {factions.map((faction) => (
        <button
          key={faction.name}
          type="button"
          className={`btn btn-sm ${faction.bgColor} ${faction.textColor} border-0 rounded-pill px-3`}
          style={{ 
            opacity: currentFilter === faction.name || currentFilter === 'All' ? 1 : 0.7,
            fontWeight: currentFilter === faction.name ? 'bold' : 'normal'
          }}
          onClick={() => onFilterChange(faction.name)}
        >
          {faction.name}
        </button>
      ))}
    </div>
  )
}

FactionFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
}

export default FactionFilter