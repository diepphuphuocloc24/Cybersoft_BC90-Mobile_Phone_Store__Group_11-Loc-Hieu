import { dom_Element_ID } from "../controllers/index.js";

class Validation {
    checkEmpty(value, errorID, mess) {
        if (value === "") {
            dom_Element_ID(errorID).style.display = "block";
            dom_Element_ID(errorID).innerHTML = mess;
            return false;
        }
        dom_Element_ID(errorID).style.display = "none";
        dom_Element_ID(errorID).innerHTML = "";
        return true;
    }

    checkOption(idSelect, errorID, mess) {
        const optionIndex = dom_Element_ID(idSelect).selectedIndex;
        if (optionIndex === 0) {
            dom_Element_ID(errorID).style.display = "block";
            dom_Element_ID(errorID).innerHTML = mess;
            return false;
        }
        dom_Element_ID(errorID).style.display = "none";
        dom_Element_ID(errorID).innerHTML = "";
        return true;
    }

    checkIDLength(value, errorID, mess) {
        if (value.trim().length < 5) {
            dom_Element_ID(errorID).style.display = "block";
            dom_Element_ID(errorID).innerHTML = mess;
            return false;
        }
        dom_Element_ID(errorID).style.display = "none";
        dom_Element_ID(errorID).innerHTML = "";
        return true;
    }

    checkURL(value, errorID, mess) {
        const pattern =
            /^(https?:\/\/)([a-zA-Z0-9.-]+)(\/[^\s]*)?\.(jpg|jpeg|png|gif|webp)$/i;
        if (!pattern.test(value)) {
            dom_Element_ID(errorID).style.display = "block";
            dom_Element_ID(errorID).innerHTML = mess;
            return false;
        }
        dom_Element_ID(errorID).style.display = "none";
        dom_Element_ID(errorID).innerHTML = "";
        return true;
    }
}
export default Validation;
