"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// In this version, change detection is based on IStoreField changes.
function getRefreshedVirtualDomPart(part) {
    const deps = part.deps;
    const refresh = part.refresh;
    if (deps && refresh) {
        return refresh(part.deps);
    }
    return part;
}
exports.getRefreshedVirtualDomPart = getRefreshedVirtualDomPart;
//# sourceMappingURL=virtual.dom.js.map