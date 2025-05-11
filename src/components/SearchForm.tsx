import { useForm } from "react-hook-form";
import slugify from 'react-slugify';
import { useMutation } from "@tanstack/react-query";

import Error from "./ErrorMessage";
import { searchHandle } from "../utils/postData";
import { Link } from "react-router-dom";

export default function SearchForm(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ''
        }
    });

    const mutation = useMutation({
        mutationFn: searchHandle
    });

    const handle = watch('handle')

    const handleChange = () => {
        const slug = slugify(handle);
        mutation.mutate(slug)
    }

    return (
            <form
                onSubmit={handleSubmit(handleChange)}
                className="space-y-5"
            >
                <div className="relative flex items-center  bg-white  px-2">
                    <label
                        htmlFor="handle"
                        >devtree.com/</label>
                    <input
                        type="text"
                        id="handle"
                        className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                        placeholder="elonmusk, zuck, jeffbezos"
                        {...register("handle", {
                            required: "Un Nombre de Usuario es obligatorio",
                        })}
                    />

                </div>
                {errors.handle && (
                    <Error>{errors.handle.message}</Error>
                )}

                <div className="mt-10">
                    {mutation.isPending && <p className="text-center">Cargando...</p>}
                    {mutation.error && <p className="text-center text-red-600 font-black">{mutation.error.message} 
                        <span className="text-cyan-500 font-black"><Link to={`/users/${slugify(handle)}`}> Visita su perfil</Link></span>
                        </p>}
                    {mutation.data && 
                        <p className="text-center text-cyan-500 font-black">
                            {mutation.data} ir a <Link to={'/register'} state={{handle: slugify(handle)}}>Registarse</Link>
                        </p>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Buscar nombre de Usuario'
                />
            </form>
    )
}