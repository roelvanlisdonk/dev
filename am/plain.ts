namespace plain {
    let passcode = "secret passcodedsdsddssd";


    class Employee {
        public fullName: string;

        constructor() {
            const self: Employee = this;
            let _fullName: string;

            Object.defineProperty(self, 'fullName', {
                get: function () { return _fullName; },
                set: function(name) {
                    _fullName = name;           
                },
                enumerable: true
            });
        }        
    }

    const employee1 = new Employee();
    employee1.fullName = "Bob Smith";
    const employee1AsString = JSON.stringify(employee1);
    console.log(employee1AsString);

    const employee2 = new Employee();
    
    const employee2AsString = JSON.stringify(employee2);
    console.log(employee2AsString);



    // var car = {
    //     name: 'audi'
    // };

    // Object.defineProperty(car, 'test', {
    //     get: function () { return 1; }

    //     enumerable: true
    // });

    // console.log(JSON.stringify(car));

}




