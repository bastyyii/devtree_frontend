import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { getUser } from "../utils/getData";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false
    });
    if(isLoading) return;
    if(isError){
        return <Navigate to={'/login'}/>
    }
    
    if(data) return <DevTree data={data}/>
}