import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router-dom";

export default function AdminNavigation(){
    const navigation = useNavigate();
    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        queryClient.removeQueries({ queryKey: ['user'] });
        if(location.pathname === '/'){
            window.location.reload();
        }else{
            navigation('/');
        }
    }
    return(
        <div className="flex items-center gap-4">
            {location.pathname !== '/' && (
                <Link
                    className='text-white p-2 uppercase font-black text-xs cursor-pointer bg-blue-600 rounded-md'
                    to='/'
                >
                    Buscar perfil
                </Link>
            )}

            <button
                className="bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </div>
    )
}