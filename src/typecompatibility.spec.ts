describe('Type compatability', () => {
    it('explains that if two types has the same structure then one type can be assigned by the other', () => {
        interface Named {
            name: string;
        }

        class Person {
            name: string;
        }

        let p: Named;
        // okay because of structural typing
        p = new Person();
    });

    it('explains that if two types are compatible with each other if one type has the same members on the other type', () => {
        interface Named {
            named: string
        }

        let x: Named;
        // y's inferred type is {name : string; location : string}
        let y = { named: "Alice", location: "Seattle" }
        x = y;

        function greet(n: Named) {
            var message = "Hello, " + n.named;
        }

        greet(y);
    });

    it('demonstrates that a type can be assigned to another type if the asignee has the parameter types required by assigned type', () => {
        let x = (a: number) => 0;
        let y = (b: number, s: string) => 0;

        y = x; // OK
        // x = y; //  NOT OK because x does not have parameter s : string type
    });

    it('demonstrates that an object should have all the required return types for another in order to be assigned to that object', () => {
        let x = () => ({ name: "Alice" });
        let y = () => ({ name: "Alice", location: "Seattle" });

        x = y; // OK
        // y = x; // x is not compativle because it is missing the location return type
    });

    it('', () => {
        function invokeLater(args: any[], callback: (...args: any[]) => void) {
            /* ... Invoke callback with 'args' ... */
        }

        // Unsound - invokeLater "might" provide any number of arguments
        invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

        // Confusing (x and y are actually required) and undiscoverable
        invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
    })




})