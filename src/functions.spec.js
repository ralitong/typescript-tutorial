"use strict";
describe('This suite describes how functions are used in typescript', function () {
    it('describes how functions can have types', function () {
        var add = function (x, y) {
            return x + y;
        };
        var myAdd = function (x, y) {
            return x + y;
        };
    });
    it('explains how to write the function type of the function', function () {
        var myAdd = function (x, y) { return x + y; };
    });
    it('explains how to aid readability by giving parameters name', function () {
        var myAdd = function (x, y) { return x + y; };
    });
    it('explains how types are inferred in functions', function () {
        // myAdd has the full function type
        var myAdd = function (x, y) {
            return x + y;
        };
        // The parameters 'x' and 'y' have the type number
        var yourAdd = function (x, y) { return x + y; };
    });
    it('has also support for optional parameters', function () {
        function buildName(firstName, lastName) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }
        var result1 = buildName("Bob");
        // let result2 = buildName("Bob", "Adams", "Sr"); // will not work since function has only two paramters
        var result3 = buildName("Bob", "Adams");
        expect(result1).toBe("Bob");
        expect(result3).toBe("Bob Adams");
    });
    it('it has also support for default values for parameters', function () {
        function buildName(firstName, lastName) {
            if (lastName === void 0) { lastName = "Smith"; }
            return firstName + " " + lastName;
        }
        var result1 = buildName("Bob");
        var result2 = buildName("Bob", undefined);
        // let result3 = buildName("Bob", "Adams", "Sr.") // too many parameters
        var result4 = buildName("Bob", "Adams");
        expect(result1).toBe("Bob Smith");
        expect(result2).toBe("Bob Smith");
        expect(result4).toBe("Bob Adams");
    });
    it('has support for variable number of parameters called rest', function () {
        function buildName(firstName) {
            var restOfName = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restOfName[_i - 1] = arguments[_i];
            }
            return firstName + " " + restOfName.join(" ");
        }
        var employeeName = buildName("Joseph", "Samuel", "Lucas", "Mackinzie");
        expect(employeeName).toBe("Joseph Samuel Lucas Mackinzie");
    });
});
