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

    it('demonstrates the problem with rest parameters with no specific type that is used in a callback', () => {
        function invokeLater(args: any[], callback: (...args: any[]) => void) {
            /* ... Invoke callback with 'args' ... */
        }

        // Unsound - invokeLater "might" provide any number of arguments
        invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

        // Confusing (x and y are actually required) and undiscoverable
        invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
    });

    it('demonstrates how enums from one type cannot be assigned to another enum type', () => {
        enum Status { Ready, Waiting };
        enum Color { Red, Blue, Green };

        let status = Status.Ready;
        // status = Color.Green; not possible
    });


    it('demonstrates how two types with different names can be assigned with each other, static methods, properties and constructor does not matter', () => {
        class Animal {
            feet: number;
            constructor(name: string, numFeet: number) { }
        }

        class Size {
            feet: number;
            constructor(numFeet: number) { }
        }

        let a: Animal;
        let s: Size;

        // a = s; OK: but typescript will throw a warning because s has no instance
        // s = a; OK: but typescript will throw a warning because b has no instance
    });

    it('demonstrates how interfaces with no methods but with different types can be compatible with each other', () => {
        interface Empty<T> {

        }

        let x: Empty<number>;
        let y: Empty<string>;

        // x = y; // okay, y matches structure of x. will not work though because y has no instance;
    });

    it('demonstrates that non-empty interfaces with different type implementations cannot be compatible with each other', () => {

        interface NotEmpty<T> {
            data: T;
        }

        let a: NotEmpty<number>;
        let b: NotEmpty<string>;

        // a = b; // a and b have different types so it will not work
    });

    it('demonstrates that if no type is specified in for the type parameters, the type any is used', ()=>{
        // let identity = function<T>(x :T) : T{
            
        // }

        // let reverse = function<U> (y : U) : U {
        
        // }

        // identity = reverse // Okay because (x : any) => any matches (y : any) => any
    })

})