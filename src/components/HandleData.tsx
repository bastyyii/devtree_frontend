import { SocialNetwork } from "../types/network";
import { UserHandle } from "../types/user";
import Header from "./Nav/Header";

type HandleDataProps = {
    data : UserHandle
}
export default function HandleData({data}: HandleDataProps){

    const links : SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return(
        <>
            <Header/>
            <div className="bg-slate-800 min-h-screen space-y-6 text-white">
                <div className="max-w-lg mx-auto pt-10">
                    <h1 className="text-5xl text-center font-black">
                        {data.handle}
                    </h1>
                    {
                        data.image && <img src={data.image} className="max-w-[250px] mx-auto"/>
                    }
                    <h2 className="text-lg text-center font-bold">
                        {data.name} {data.lastname} 
                    </h2>
                    <p className="text-lg text-center break-words font-bold">
                        {data.description}
                    </p>
                    <div className="mt-20 flex flex-col gap-6 pb-20">
                        {
                            links.length ?
                                links.map(link => (
                                    <a
                                        key={link.name}
                                        className="bg-white px-5 py-2 flex items-center rounded-lg"
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <img src={`/social/icon_${link.name}.svg`} className="w-12" alt="icono red social"/>
                                        <p className="text-black capitalize font-bold text-lg">Visita mi: {link.name}</p>
                                    </a>
                                ))
                            : <p className="text-center">No hay enlaces en este perfil.</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}