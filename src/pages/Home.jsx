import React from 'react'

function Home() {
  return (
    <div>
      <h1>Selamat datang dalam Three Kingdoms Encyclopedia</h1>
      <p className="lead">Menyingkap jejak para pahlawan dan pertempuran besar dalam sejarah Tiga Kerajaan yang penuh intrik dan kejayaan.</p>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card card-dark h-100">
            <div className="card-body">
              <h2>Karakter</h2>
              <p>Telusuri jejak para pahlawan dari kerajaan Shu, Wei, dan Wu yang mengukir sejarah.</p>
              <a href="/characters" className="btn btn-outline-light">Lihat Karakter</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-dark h-100">
            <div className="card-body">
              <h2>Pertempuran</h2>
              <p>Telusuri pertempuran besar yang mengubah arah sejarah dalam era Tiga Kerajaan.</p>
              <a href="/battles" className="btn btn-outline-light">View Pertempuran</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
