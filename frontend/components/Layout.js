import NavBar from "./NavBar";
import Seo from "../components/Seo";

import { useRouter } from "next/router";

export default function Layout({ children }) {
    const router = useRouter();
    const routerObj = { '/': 'Home', '/about': 'About' }
    //console.log(router.pathname)
    return (
        <>
            {/*<Seo title={routerObj[router.pathname]} /> */}
            <Seo title={router.pathname} />
            <NavBar />
            <div>{children}</div>
        </>
    )
}