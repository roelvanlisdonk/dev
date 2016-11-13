
// ...objects: NestedCSSProperties[].
const _rules: any = {};

export function addClass(name: string, rules: Array<string>): string {
	const rule: string = _rules[name] as any;
	if(rule) { return name; }

	const rulesAsString = rules.join(";");
	if("insertRule" in styleSheet) {
		styleSheet.insertRule(`.${name} { ${rulesAsString} }`, 0);
	}
	else if("addRule" in styleSheet) {
		styleSheet.addRule(`.${name}`, rulesAsString, 0);
	}
	_rules[name] = rulesAsString;
	return name;
}

function create(id: string): CSSStyleSheet {
    // Create the <style> tag
	const head = document.head ||  document.getElementsByTagName('head')[0];
	const style = document.createElement("style") as any;
    style.id = id;
	style.type = "text/css";

	if (style.styleSheet){
		// IE8
		style.styleSheet.cssText = "";
	} else {
		// WebKit hack
		style.appendChild(document.createTextNode(""));
	}

	// Add the <style> element to the page
	head.appendChild(style);
	
	// IE8 support (style.styleSheet)
	return style.sheet || style.styleSheet as CSSStyleSheet;
}

const styleSheet = create("am");