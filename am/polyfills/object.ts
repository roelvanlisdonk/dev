if (typeof Object.create != 'function') {
    Object.create = function (o: any): any {
		if (arguments.length > 1) {
			throw new Error('This polyfill for Object.create, only accepts one parameter.');
		}

        o = o || {};
        
		function F() {}
		F.prototype = o;
        const FasAny: any = F as any;
		return new FasAny();
	};
}