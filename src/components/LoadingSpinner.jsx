function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-3">Loading...</span>
    </div>
  )
}

export default LoadingSpinner