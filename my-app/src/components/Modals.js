import React from "react";
import AddRecipeModal from "./AddRecipeModal";

const Modals =(props)=> {
    switch(props.currentModal)
{
    case NEW_RECIPE:
    return <AddRecipeModal {... props} />;
    default: return null;
}
}

export default Modals;