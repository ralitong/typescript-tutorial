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
    it('', function () {
        function invokeLater(args, callback) {
            /* ... Invoke callback with 'args' ... */
        }
        // Unsound - invokeLater "might" provide any number of arguments
        invokeLater([1, 2], function (x, y) { return console.log(x + ", " + y); });
        // Confusing (x and y are actually required) and undiscoverable
        invokeLater([1, 2], function (x, y) { return console.log(x + ", " + y); });
    });
});
