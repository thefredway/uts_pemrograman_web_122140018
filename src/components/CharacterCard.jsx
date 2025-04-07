import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Heart, HeartFill } from 'react-bootstrap-icons'
import useFavorites from '../hooks/useFavorites'

function CharacterCard({ character }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites('favCharacters')

  const factionColor = {
    'Shu': 'text-shu',
    'Wei': 'text-wei',
    'Wu': 'text-wu',
    'Others': 'text-others'
  }[character.faction] || 'text-secondary'

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    isFavorite(character.id)
      ? removeFavorite(character.id)
      : addFavorite(character)
  }

  return (
    <>
      <div className="card card-dark mb-3" style={{ height: '100%' }}>
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title mb-1">
              <span className={factionColor}>{character.name}</span>
            </h5>
            <div className="d-flex align-items-center">
              <span className={`badge badge-${character.faction.toLowerCase()} ms-2`}>
                {character.faction}
              </span>
              <button
                className="btn btn-sm p-0 ms-2 favorite-btn"
                onClick={handleToggleFavorite}
                aria-label={isFavorite(character.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(character.id) ? (
                  <HeartFill color="var(--wu-color)" size={16} />
                ) : (
                  <Heart color="#aaa" size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="mt-2">
            <small className="text-muted d-block">
              {character.birthYear} - {character.deathYear}
              <span className="ms-2">({character.deathYear - character.birthYear} yrs)</span>
            </small>

            {/* Attribute Bars */}
            <div className="attribute-bars mt-2">
              <div className="progress-container strength-container">
                <div className="progress mb-2" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-danger strength-bar"
                    role="progressbar"
                    style={{ width: `${character.strength}%` }}
                    aria-valuenow={character.strength}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value={character.strength}
                  ></div>
                </div>
                <span className="progress-label strength-label">Kekuatan: {character.strength}</span>
              </div>
              <div className="progress-container intelligence-container">
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-primary intelligence-bar"
                    role="progressbar"
                    style={{ width: `${character.intelligence}%` }}
                    aria-valuenow={character.intelligence}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-value={character.intelligence}
                  ></div>
                </div>
                <span className="progress-label intelligence-label">Kecerdasan: {character.intelligence}</span>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-2">
              <Link
                to={`/characters/${character.id}`}
                className="btn btn-sm faction-btn py-0 px-2"
                data-faction={character.faction.toLowerCase()}
              >
                Detail
              </Link>
            </div>
          </div>

          <p className="card-text mt-2 small" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {character.description}
          </p>
        </div>
      </div>
    </>
  )
}

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    faction: PropTypes.string.isRequired,
    birthYear: PropTypes.number.isRequired,
    deathYear: PropTypes.number.isRequired,
    strength: PropTypes.number.isRequired,
    intelligence: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
}

export default CharacterCard
