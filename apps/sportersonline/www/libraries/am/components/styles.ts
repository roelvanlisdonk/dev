import { createClass, IClass } from "../virtual.dom/class";

export const defaultBackgroundColor = "#FFFFFF";
export const defaultColor: string = "#8F8E93";
export const defaultFontFamily: string = "Helvetica, Arial, sans-serif";

export const container = createClass("container", {
    backgroundColor: defaultBackgroundColor,
    borderWidth: "0",
    boxSizing: "border-box",
    color: defaultColor,
    display: "block",
    fontFamily: defaultFontFamily,
    margin: "0",
    outlineWidth: "0",
    padding: "0"
});