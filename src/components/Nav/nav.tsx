type NavBarProps = {
  controlColor: boolean;
  setControlColor: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavBar({ controlColor, setControlColor }: NavBarProps) {
  return (
    <nav className=" shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">DevTree</div>
        <div className="space-x-6 hidden md:flex">
          <a href="#inicio" className=" hover:text-blue-500">
            Inicio
          </a>
          <a href="#proyectos" className=" hover:text-blue-500">
            Proyectos
          </a>
          <a href="#contacto" className=" hover:text-blue-500">
            Contacto
          </a>
        </div>
        <button
          onClick={() => setControlColor(!controlColor)}
          className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${
            !controlColor ? 'justify-start bg-yellow-400' : 'justify-end bg-gray-800'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300`}
          ></div>
        </button>
      </div>
    </nav>
  );
}