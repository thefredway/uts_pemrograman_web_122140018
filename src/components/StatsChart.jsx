import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function StatsChart({ character }) {
  const chartData = useMemo(() => ({
    labels: ['Strength', 'Intelligence'],
    datasets: [{
      label: 'Attributes',
      data: [character.strength, character.intelligence],
      backgroundColor: [
        'rgba(244, 67, 54, 0.7)',
        'rgba(33, 150, 243, 0.7)'
      ],
      borderColor: [
        'rgba(244, 67, 54, 1)',
        'rgba(33, 150, 243, 1)'
      ],
      borderWidth: 1
    }]
  }), [character])

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#e0e0e0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#e0e0e0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}/100`
          }
        }
      }
    }
  }

  return (
    <div className="mt-3" style={{ height: '200px' }}>
      <Bar data={chartData} options={options} />
    </div>
  )
}

StatsChart.propTypes = {
  character: PropTypes.shape({
    strength: PropTypes.number.isRequired,
    intelligence: PropTypes.number.isRequired
  }).isRequired
}

export default StatsChart