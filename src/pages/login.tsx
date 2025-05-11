import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/getData";

import { postLogin } from "../utils/postData";
import InputRegister from '../components/InputRegister';
import { LoginUser } from "../types/user";

export default function Login(){
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: false,
        refetchOnWindowFocus: false
    });

    const initialValues : LoginUser = {
            email: '',
            password: ''
        }
    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues : initialValues});
    
    const loginUser = async (formData : LoginUser) => {
        await postLogin(formData);
        navigate('/admin')
    }
    if(isLoading) return null;
    if(data) navigate('/admin')
    return (
        <div>
            <h1 className="text-4xl text-white font-bold">Inicia Sesión</h1>
            <form 
                onSubmit={handleSubmit(loginUser)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <InputRegister
                    id="email"
                    label="E-mail"
                    type="email"
                    placeholder="Email de Registro"
                    register={register}
                    rules={{
                        required: 'El email es Obligatorio',
                        pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                        },
                    }}
                    error={errors.email}
                />
                <InputRegister
                    id="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Password de Registro"
                    register={register}
                    rules={{
                        required: 'La contraseña es Obligatoria',
                    }}
                    error={errors.password}
                />

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />  
            </form>

            <nav className="mt-10">
                <Link to={'/register'}
                    className="text-center text-white text-lg block"
                >
                    ¿No tienes una cuenta? Crea una aquí.
                </Link>
            </nav>
        </div>
    )
}