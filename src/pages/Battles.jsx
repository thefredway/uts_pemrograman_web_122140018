import { useState } from 'react'
import useThreeKingdomsData from '../hooks/useThreeKingdomsData'
import BattleCard from '../components/BattleCard'
import LoadingSpinner from '../components/LoadingSpinner'

function Battles() {
  const { data: battles, loading, error } = useThreeKingdomsData('battles')
  const [yearFilter, setYearFilter] = useState('')

  if (loading) return <LoadingSpinner />
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  const filteredBattles = yearFilter
    ? battles.filter(battle => battle.year.toString().includes(yearFilter))
    : battles

  return (
    <div>
      <h1>Pertempuran</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control bg-light text-dark"
          placeholder="Filter berdasarkan tahun..."
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </div>

      <div className="row mt-4">
        {filteredBattles.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">Tidak ada pertempuran yang ditemukan untuk filter yang dipilih.</div>
          </div>
        ) : (
          filteredBattles.map(battle => (
            <div key={battle.id} className="col-lg-6">
              <BattleCard battle={battle} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Battles