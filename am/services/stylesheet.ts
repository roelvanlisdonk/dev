
// ...objects: NestedCSSProperties[]

export function addClass(name: string, rules: Array<string>): string {
	const rulesAsString = rules.join("");
	if("insertRule" in styleSheet) {
		styleSheet.insertRule(`.${name} { ${rulesAsString} }`, 0);
	}
	else if("addRule" in styleSheet) {
		styleSheet.addRule(`.${name}`, rulesAsString, 0);
	}
	return name;
}

function create(id: string): CSSStyleSheet {
    // Create the <style> tag
	const style = document.createElement("style");
    style.id = id;

	// WebKit hack
	style.appendChild(document.createTextNode(""));

	// Add the <style> element to the page
	document.head.appendChild(style);

	return style.sheet as CSSStyleSheet;
}

const styleSheet = create("am");