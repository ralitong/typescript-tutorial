"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
describe('This suite describes the ways to declare variables in typescript', function () {
    it('can declare variables using var just like in javascript', function () {
        var message = 'Hello, World!';
        expect(message).toBe('Hello, World!');
    });
    it('can declare functions within functions', function () {
        function f() {
            var a = 10;
            return function g() {
                var b = a + 1;
                return b;
            };
        }
        var g = f();
        expect(g()).toEqual(11);
    });
    it('has another sample for declaring functions within functions', function () {
        function f() {
            var a = 1;
            a = 2;
            var b = g();
            a = 3;
            return b;
            function g() {
                return a;
            }
        }
        expect(f()).toBe(2);
    });
    it('explains the odd scoping rules of var declarations', function () {
        // function f(shouldInitialize : boolean) {
        //     if(shouldInitialize)
        //         var x = 10;
        //     return x;
        // }
        // expect(f(true)).toBe(10);
        // expect(f(false)).toBe(undefined);
    });
    it('explains another example of odd scoping rules of var', function () {
        function sumMatrix(matrix) {
            var sum = 0;
            for (var i = 0; i < matrix.length; i++) {
                var currentRow = matrix[i];
                for (var i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }
            return sum;
        }
        var matrix = [
            [1, 2, 3],
            [1, 2, 3]
        ];
        expect(sumMatrix(matrix)).toBe(6);
    });
    it('also explains this weird behavior of var in a for-loop', function () {
        // for(var i = 0; i < 10; i++) {
        //     setTimeout(function(){console.log(i);}, 100 * i);
        // }
    });
    it('explains how let block scoping solves the problem of var', function () {
        // function f(input : boolean) {
        //     let a = 100;
        //     if(input) {
        //         // Still okay to reference
        //         let b = a + 1;
        //         return b;
        //     }
        //     // Error: 'b' doesn't exist here
        //     return b;
        // }
    });
    it('explains how variables cannot be used when they are not declared yet', function () {
        // a++;
        // let a;
    });
    it('explains how some variables can still be used in another scope', function () {
        // function foo() {
        //     // okat to capture 'a'
        //     return a;
        // }
        // illegal call 'foo' before 'a' is declared
        // runtimes should thrown an error here
        // foo();
        // let a;
    });
    it('explains how var can be redeclared multiple times', function () {
        function f(x) {
            var x;
            var x;
            if (true)
                var x;
        }
    });
    it('explains how let will not declare the same variable multiple times', function () {
        // let x = 10;
        // let x = 20;
    });
    it('explains how variables declared with var cannot be declared again with let', function () {
        // function f(x : any) {
        //     let x = 100;
        // }
        // function g() {
        //     let x = 100;
        //     var x = 100;
        // }
    });
    it('explains that blocked-scoped variable with the same names can be declared in distinct separate blocks', function () {
        function f(condition, x) {
            if (condition) {
                var x_1 = 100;
                return x_1;
            }
            return x;
        }
        expect(f(false, 0)).toBe(0);
        expect(f(true, 0)).toBe(100);
    });
    it('explains how a block scoped variable can be captured from a finished scope', function () {
        function theCityThatAlwaysSleeps() {
            var getCity;
            if (true) {
                var city_1 = "Seattle";
                getCity = function () {
                    return city_1;
                };
            }
            return getCity();
        }
        expect(theCityThatAlwaysSleeps()).toBe('Seattle');
    });
    it('has support immutable types by using the keyword const', function () {
        var numLivesForCat = 9;
        var kitty = {
            name: 'Aurora',
            numLives: numLivesForCat
        };
        // Error
        //    kitty = {
        //        name : "Danielle",
        //        numLives : numLivesForCat
        //    };
        // all "okay"
        kitty.name = 'Rory';
        kitty.name = 'Kitty';
        kitty.name = 'Cat';
        kitty.numLives--;
        expect(kitty.name).toBe('Cat');
        expect(kitty.numLives).toBe(8);
    });
    it('has also support for destructuring', function () {
        var input = [1, 2];
        var first = input[0], second = input[1];
        expect(first).toBe(1);
        expect(second).toBe(2);
    });
    it('explains how destructuring can be placed inside a function', function () {
        function f(_a) {
            var first = _a[0], second = _a[1];
            expect(first).toBe(1);
            expect(second).toBe(2);
        }
        f([1, 2]);
    });
    it('explains how destructuring can be used to refer to remaining items in a list', function () {
        var _a = [1, 2, 3, 4], first = _a[0], rest = _a.slice(1);
        expect(first).toBe(1);
        expect(rest).toContain(2);
        expect(rest).toContain(3);
        expect(rest).toContain(4);
    });
    it('has support for object destructuring', function () {
        var o = {
            a: "foo",
            b: 12,
            c: "bar"
        };
        var a = o.a, b = o.b;
        expect(a).toBe("foo");
        expect(b).toBe(12);
    });
    it('explains how object destructuring can assign an array to refer to the methods and properties of the object', function () {
        var o = {
            a: 1,
            b: 3,
            c: [1, 2, 3],
            d: 10
        };
        var a = o.a, passthrough = __rest(o, ["a"]);
        var total = a + passthrough.c.length;
        expect(total).toEqual(4);
    });
    it('explains how properties can be renamed', function () {
        var o = {
            a: 1,
            b: 2
        };
        var newName1 = o.a, newName2 = o.b;
        expect(newName1).toBe(1);
        expect(newName2).toBe(2);
    });
    it('explains how properties with type can also be renamed', function () {
        var o = {
            a: "something",
            b: 2
        };
        var a = o.a, b = o.b;
        expect(typeof (a)).toBe("string");
        expect(typeof (b)).toBe("number");
    });
    it('explains how default values can be assigned if parameters are undefined', function () {
        function keepWholeObject(wholeObject) {
            var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
            expect(a).toBe("something");
            expect(b).toBe(1001);
        }
        keepWholeObject({
            a: "something",
            b: undefined
        });
    });
    it('explains how destructuring can be used in function parameters', function () {
        function f(_a) {
            var a = _a.a, b = _a.b;
            expect(a).toBe("something");
            expect(b).toBe(1);
        }
        f({ a: "something", b: 1 });
    });
    it('explains how spread is opposite to destructuring', function () {
        var first = [1, 2];
        var second = [3, 4];
        var bothPlus = [0].concat(first, second);
        expect(bothPlus).toContain(0);
        expect(bothPlus).toContain(1);
        expect(bothPlus).toContain(2);
        expect(bothPlus).toContain(3);
        expect(bothPlus).toContain(4);
    });
    it('explains how objects can also be spread', function () {
        var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
        var search = __assign({}, defaults, { food: "rich" });
        expect(search.ambiance).toBe("noisy");
        expect(search.price).toBe("$$");
        expect(search.food).toBe("rich");
    });
    it('explains how spread will not support methods of an object', function () {
        var C = (function () {
            function C() {
                this.p = 12;
            }
            C.prototype.m = function () {
            };
            return C;
        }());
        var c = new C();
        var clone = __assign({}, c);
        expect(clone.p).toBe(12);
        // expect(clone.m()) this will not compile
    });
});
