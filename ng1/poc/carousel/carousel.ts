namespace poc {
    'use strict';  
    
    class CarouselDirective implements ng.IDirective {
        public link: ($scope: IScrollScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'EA';
        public template = `
<div class="carousel">
    <button type="button">
        <i>&lt;</i>
    </button>
    <div class="slide"></div>
    <button type="button">
        <i>&gt;</i>
    </button>
    <button type="button" class="dot">
        <i>.</i>
    </button>
</div>`;

        constructor() {
            const self: CarouselDirective = this;
            
            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: IScrollScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: CarouselDirective = this;
            
        }
    }

    interface IScrollScope extends ng.IScope {
        currentItemIndex: number;
        items: Array<IItem>;
    }

    interface IItem {
        name: string;
        visible: boolean;
    }

    angular.module('poc').directive('carousel', [() => new CarouselDirective()]);
}