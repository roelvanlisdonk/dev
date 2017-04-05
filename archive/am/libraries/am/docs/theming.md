
# Theming
* Each component should export a const theming = {}; where 
* The theming can be set, app wide, by setting the teming property, but can als be overwritten per component instance for a component 


```TypeScript

// Example button
export const theming = {
    backgroundColor: 'rgb(120, 120, 120)';
    borderColor: 'rgb(50, 50, 50)';
    icon: 'data:image/svg+xml;utf8,<svg ... > ... </svg>'
};

export class ButtonOptions {
    theming = {
        backgroundColor: 'rgb(120, 120, 120)';
        borderColor: 'rgb(50, 50, 50)';
        icon: 'data:image/svg+xml;utf8,<svg ... > ... </svg>'
    };
}

```