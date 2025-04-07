import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p className="lead">Halaman yang Anda cari tidak ada.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Kembali ke Home
      </Link>
    </div>
  )
}

export default NotFound