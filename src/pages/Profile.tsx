import { useForm } from "react-hook-form"
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Error from "../components/ErrorMessage";
import { User, ProfileForm } from "../types/user";
import { updateUser, uploadImage } from "../utils/postData";
import { toast } from "sonner";

export default function Profile() {
    const queryClient = useQueryClient();
    const data : User = queryClient.getQueryData(['user'])!
    
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
        handle: data.handle,
        description: data.description
    } });
    const updateProfileMutation = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast(data),
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    });

    const uploadImageMutatio = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return{
                    ...prevData,
                    image: data
                }
            });
        }
    });

    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            uploadImageMutatio.mutate(e.target.files[0])
        }
    }

    const handleUserProfile = (formData: ProfileForm) => {
        const user: User = queryClient.getQueryData(['user'])!;
        user.description = formData.description;
        user.handle = formData.handle;
        updateProfileMutation.mutate(user);
    }

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfile)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Nombre de usuario:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="El nombre de usuario no puede quedar vacio."
                    {...register('handle', {
                        required: 'El nombre de usuario es obligatorio.'
                    })}
                />
                {errors.handle && <Error>{errors.handle.message}</Error>}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    className="w-full border-none bg-slate-100 rounded-lg p-2 resize-y"
                    placeholder="Tu Descripción"
                    {...register('description')}
                />
                {errors.description && <Error>{errors.description.message}</Error>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="image" className="text-sm font-semibold text-gray-700">
                    Imagen:
                </label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={imageChange}
                    className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-100 file:text-blue-700
                            hover:file:bg-blue-200 cursor-pointer"
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}