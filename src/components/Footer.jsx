function Footer() {
    return (
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0">
            Three Kingdoms Encyclopedia © {new Date().getFullYear()}<br />
            Dibangun dengan ❤️ menggunakan React, PropTypes, JavaScript, dan Bootstrap oleh Freddy Harahap (122140018) <br />
            Website ini dibuat sebagai bentuk ketertarikan pribadi terhadap sejarah dan budaya Tiongkok, terutama era Tiga Kerajaan.
          </p>
        </div>
      </footer>
    )
  }
  
  export default Footer