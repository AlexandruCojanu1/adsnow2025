import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import NotFoundSection from "../../Components/NotFound/notfound";

function NotFoundPage(){
    return(
        <>
            <HeadTitle title="Error 404 - Marko - Digital Marketing Agency" />
            <NotFoundSection />
        </>
    );
}

export default NotFoundPage;