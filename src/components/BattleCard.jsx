import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import useFavorites from '../hooks/useFavorites'

function BattleCard({ battle, isFavorite: propFavorite, onToggleFavorite }) {
  const isUsingProps = typeof propFavorite !== 'undefined' && onToggleFavorite
  const { isFavorite: isFavHook, addFavorite, removeFavorite } = useFavorites('favBattles')

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isUsingProps) {
      onToggleFavorite()
    } else {
      isFavHook(battle.id) ? removeFavorite(battle.id) : addFavorite(battle)
    }
  }

  const isFavorite = isUsingProps ? propFavorite : isFavHook(battle.id)

  return (
    <div className="card card-dark mb-4" style={{ position: 'relative' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h3 className="card-title">{battle.name}</h3>
            <p className="text-muted">{battle.namePinyin}</p>
          </div>
          <button
            className="btn btn-sm p-0 favorite-btn"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartFill color="var(--wu-color)" size={18} />
            ) : (
              <Heart color="#aaa" size={18} />
            )}
          </button>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <p><strong>Tahun:</strong> {battle.year}</p>
            <p><strong>Lokasi:</strong> {battle.location}</p>
            <p><strong>Hasil:</strong> {battle.outcome}</p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Faksi:</strong>
              {battle.factions.map((faction, index) => {
                const factionClass = ['Shu', 'Wei', 'Wu', 'Others'].includes(faction)
                  ? `badge-${faction.toLowerCase()}`
                  : 'badge-custom'
                return (
                  <span key={index} className={`badge ${factionClass} ms-2`}>
                    {faction}
                  </span>
                )
              })}
            </p>
            <p className="card-text">
              {battle.description.length > 100
                ? `${battle.description.substring(0, 100)}...`
                : battle.description}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link 
            to={`/battles/${battle.id}`} 
            className="btn btn-sm faction-btn"
            data-faction={battle.factions[0].toLowerCase()}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  )
}

BattleCard.propTypes = {
  battle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    namePinyin: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    factions: PropTypes.arrayOf(PropTypes.string).isRequired,
    outcome: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func
}

export default BattleCard
