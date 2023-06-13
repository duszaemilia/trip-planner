import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import {Outlet} from "react-router-dom";

function Layout(props) {
    return (
        <>
            <ResponsiveAppBar/>
            <Outlet/>

        </>
    );
}

export default Layout;