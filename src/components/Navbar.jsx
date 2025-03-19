function Navbar() {
    return (
      <nav className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Tableau de bord - Chief Data Scientist</div>
          <div className="flex items-center bg-slate-700 px-4 py-2 rounded-lg">
            <span className="mr-2">👤</span>
            <span>Admin</span>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;