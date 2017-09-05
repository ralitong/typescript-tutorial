"use strict";
describe('Typescript type compatibility', function () {
    it('explains that if two types has the same structure then one type can be assigned by the other', function () {
        var Person = (function () {
            function Person() {
            }
            return Person;
        }());
        var p;
        // okay because of structural typing
        p = new Person();
    });
    it('explains that if two types are compatible with each other if one type has the same members on the other type', function () {
        var x;
        // y's inferred type is {name : string; location : string}
        var y = { named: "Alice", location: "Seattle" };
        x = y;
        function greet(n) {
            var message = "Hello, " + n.named;
        }
        greet(y);
    });
    it('demonstrates that a type can be assigned to another type if the asignee has the parameter types required by assigned type', function () {
        var x = function (a) { return 0; };
        var y = function (b, s) { return 0; };
        y = x; // OK
        // x = y; //  NOT OK because x does not have parameter s : string type
    });
    it('demonstrates that an object should have all the required return types for another in order to be assigned to that object', function () {
        var x = function () { return ({ name: "Alice" }); };
        var y = function () { return ({ name: "Alice", location: "Seattle" }); };
        x = y; // OK
        // y = x; // x is not compativle because it is missing the location return type
    });
    it('demonstrates the problem with rest parameters with no specific type that is used in a callback', function () {
        function invokeLater(args, callback) {
            /* ... Invoke callback with 'args' ... */
        }
        // Unsound - invokeLater "might" provide any number of arguments
        invokeLater([1, 2], function (x, y) { return console.log(x + ", " + y); });
        // Confusing (x and y are actually required) and undiscoverable
        invokeLater([1, 2], function (x, y) { return console.log(x + ", " + y); });
    });
    it('demonstrates how enums from one type cannot be assigned to another enum type', function () {
        var Status;
        (function (Status) {
            Status[Status["Ready"] = 0] = "Ready";
            Status[Status["Waiting"] = 1] = "Waiting";
        })(Status || (Status = {}));
        ;
        var Color;
        (function (Color) {
            Color[Color["Red"] = 0] = "Red";
            Color[Color["Blue"] = 1] = "Blue";
            Color[Color["Green"] = 2] = "Green";
        })(Color || (Color = {}));
        ;
        var status = Status.Ready;
        // status = Color.Green; not possible
    });
    it('demonstrates how two types with different names can be assigned with each other, static methods, properties and constructor does not matter', function () {
        var Animal = (function () {
            function Animal(name, numFeet) {
            }
            return Animal;
        }());
        var Size = (function () {
            function Size(numFeet) {
            }
            return Size;
        }());
        var a;
        var s;
        // a = s; OK: but typescript will throw a warning because s has no instance
        // s = a; OK: but typescript will throw a warning because b has no instance
    });
    it('demonstrates how interfaces with no methods but with different types can be compatible with each other', function () {
        var x;
        var y;
        // x = y; // okay, y matches structure of x. will not work though because y has no instance;
    });
    it('demonstrates that non-empty interfaces with different type implementations cannot be compatible with each other', function () {
        var a;
        var b;
        // a = b; // a and b have different types so it will not work
    });
    it('demonstrates that if no type is specified in for the type parameters, the type any is used', function () {
        // let identity = function<T>(x :T) : T{
        // }
        // let reverse = function<U> (y : U) : U {
        // }
        // identity = reverse // Okay because (x : any) => any matches (y : any) => any
    });
});
