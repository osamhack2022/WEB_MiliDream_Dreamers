import NavBar from "./NavBar";
import Seo from "../components/Seo";
import Footer from "../components/Footer";

import { useRouter } from "next/router";

import { Fragment } from "react";

export default function Layout({ children }) {
	const router = useRouter();
	//const routerObj = { '/': 'Home', '/about': 'About' }
	//console.log(typeof(router.pathname))
	//{/*<Seo title={routerObj[router.pathname]} /> */}

	return (
		<div className="wrapper">
			<div className="contentWrapper">
				<Fragment>
					<Seo title={router.pathname} />
					<NavBar />
					<div>{children}</div>
					<Footer bottomPx={"3000px"} />
				</Fragment>
			</div>
		</div>
	);
}
