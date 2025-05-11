import { useEffect, useState } from "react"
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../utils/postData";

import { social } from "../data/data"
import LinkInput from "../components/LinkInput";
import { isValidUrl } from "../utils/utilsFunctions";
import { User } from "../types/user";
import { SocialNetwork } from "../types/network";

export default function LinkTree() {
    const [  devTreeLinks, setDevTreeLinks ] = useState(social);
    
    const queryClient = useQueryClient();
    const user : User = queryClient.getQueryData(['user'])!;

    const { mutate } = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Actualizado correctamente.');
        }
    });
    
    useEffect(() => {
        const updatedData = devTreeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link : SocialNetwork) => link.name === item.name)
            if(userLink){
                return {...item, url: userLink.url, enabled: userLink.enabled}
            }
            return item;
        }); 
        setDevTreeLinks(updatedData);
        
    }, []);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(item => 
            item.name === e.target.name ? {
                ...item,
                url: e.target.value
            } : item);

        setDevTreeLinks(updatedLinks);
        
    }
    
    const links : SocialNetwork[] = JSON.parse(user.links);

    const handleEnableLink = (network: string) => {
        const updatedLinks = devTreeLinks.map(item => {
            if(item.name === network ) {
                if(isValidUrl(item.url)){
                    return { ...item, enabled: !item.enabled }
                }else {
                    toast.error('La url no es correcta.');
                }
                
            } 
            return item
        });

        setDevTreeLinks(updatedLinks);
        
        let updatedItems : SocialNetwork[] = []
        const selectedSocialNetwork = updatedLinks.find(link => link.name === network)
        if(selectedSocialNetwork?.enabled){
            const temporal_id = links.filter(link => link.id).length + 1;
            if(links.some(link => link.name === network)){
                updatedItems = links.map(link => {
                    if(link.name === network){
                        return {
                            ...link,
                            enabled: true,
                            id:temporal_id
                        }
                    }else{
                        return link
                    }
                })
            }else{
                const newItem = {
                    ...selectedSocialNetwork,
                    id: temporal_id
                }
                updatedItems = [...links, newItem]
            }
            
        }else{
            const indexToLink = links.findIndex(link => link.name === network);
            updatedItems = links.map(link => {
                if(link.name === network){
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                }else if(link.id > indexToLink && (indexToLink !== 0 && link.id === 1)){
                    return {
                        ...link,
                        id: link.id -1
                    }
                }else {
                    return link
                }
            });
        }
        console.log(updatedItems)

        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updatedItems)
            }
        });
    }

    return (
        <div className="space-y-5">
            {devTreeLinks.map(item => (
                <LinkInput 
                    key={item.name}
                    item={item}
                    handleUrlChange={handleUrlChange}
                    handleEnableLink={handleEnableLink}
                />
            ))}
            <button
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
                onClick={() => mutate(queryClient.getQueryData(['user'])!)}
            >Guardar Cambios.</button>
        </div>
    )
}