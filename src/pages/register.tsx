import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../utils/getData";

import type { RegisterUser } from "../types/user";
import { postRegister } from "../utils/postData";
import InputRegister from '../components/InputRegister';

export default function Register(){
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false
    });

    const location = useLocation();
    const initialValues : RegisterUser = {
        name: '',
        lastname: '',
        handle: location?.state?.handle ? location.state.handle : '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({defaultValues : initialValues});
    
    const password = watch('password');

    const registerUser = async (formData : RegisterUser) => {
        await postRegister(formData, reset);
        navigate('/login');
    }
    if(isLoading) return null;
    if(data) navigate('/admin')
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>
            
            <form 
                onSubmit={handleSubmit(registerUser)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
               <InputRegister
                    id="name"
                    label="Nombre"
                    placeholder="Tu Nombre"
                    register={register}
                    rules={{ required: 'El nombre es Obligatorio' }}
                    error={errors.name}
                    />

                <InputRegister
                    id="lastname"
                    label="Apellido"
                    placeholder="Tu Apellido"
                    register={register}
                    rules={{ required: 'El apellido es Obligatorio' }}
                    error={errors.lastname}
                />

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
                    id="handle"
                    label="Nombre de usuario"
                    placeholder="Nombre de usuario: sin espacios"
                    register={register}
                    rules={{ required: 'El nombre de usuario es Obligatorio' }}
                    error={errors.handle}
                />

                <InputRegister
                    id="password"
                    label="Contraseña"
                    type="password"
                    placeholder="Password de Registro"
                    register={register}
                    rules={{
                        required: 'La contraseña es Obligatoria',
                        minLength: {
                        value: 8,
                        message: 'La contraseña debe ser de mínimo 8 caracteres',
                        },
                    }}
                    error={errors.password}
                />

                <InputRegister
                    id="password_confirmation"
                    label="Repetir Contraseña"
                    type="password"
                    placeholder="Repetir Password"
                    register={register}
                    rules={{
                        required: 'Repita la contraseña',
                        validate: (value: string) => value === password || 'Las contraseñas deben ser iguales.',
                    }}
                    error={errors.password_confirmation}
                />

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />  
            </form>

            <nav className="mt-10">
                <Link to={'/login'}
                    className="text-center text-white text-lg block"
                >
                    ¿Tienes una cuenta? Inicia Sesión Aquí.
                </Link>
            </nav>
        </>
    )
}