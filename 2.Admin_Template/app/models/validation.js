import { dom_Element_ID } from "../controllers/index.js";

class Validation {
    checkEmpty(value, errorID, mess) {
        if (value === "") {
            dom_Element_ID(errorID).style.display = "block";
            dom_Element_ID(errorID).innerHTML = mess;
            return false;
        }
        dom_Element_ID(errorID).style.display = "none"
        dom_Element_ID(errorID).innerHTML = "";
        return true;
    }

    checkOption(idSelect, errorID, mess) {
        const optionIndex = dom_Element_ID(idSelect).selectedIndex
        if (optionIndex === 0) {
            dom_Element_ID(errorID).style.display = "block";
            dom_Element_ID(errorID).innerHTML = mess;
            return false;
        }
        dom_Element_ID(errorID).style.display = "none"
        dom_Element_ID(errorID).innerHTML = "";
        return true; 
    }
}
export default Validation;
