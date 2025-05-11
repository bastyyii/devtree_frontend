import { Link } from "react-router-dom";

export default function Logo(){
    return (
        <Link
            to={'/'}
        >
            <img src="/images/logo.svg" className="w-full block" alt="Logo DevTree"/>
        </Link>
    )
}