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
describe('Variables', function () {
    it('can be declared using var just like in javascript', function () {
        var message = 'Hello, World!';
        expect(message).toBe('Hello, World!');
    });
    it('should be able to contain functions within functions', function () {
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
    it('functions can be declared before it is used', function () {
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
    it('using var can be called outside its scope', function () {
        // function f(shouldInitialize : boolean) {
        //     if(shouldInitialize)
        //         var x = 10;
        //     return x;
        // }
        // expect(f(true)).toBe(10);
        // expect(f(false)).toBe(undefined);
    });
    it('using var can have unexpected effects inside nested loops', function () {
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
    it('using var can have unexpected effects when used in asynchronous functions', function () {
        // for(var i = 0; i < 10; i++) {
        //     setTimeout(function(){console.log(i);}, 100 * i);
        // }
    });
    it('using let should be properly scoped', function () {
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
    it('using let cannot be used when they are not declared yet', function () {
        // a++;
        // let a;
    });
    it('using let cannot be used inside a function when they are not declared', function () {
        // function foo() {
        //     // okat to capture 'a'
        //     return a;
        // }
        // illegal call 'foo' before 'a' is declared
        // runtimes should thrown an error here
        // foo();
        // let a;
    });
    it('using var can be declared multiple times', function () {
        function f(x) {
            var x;
            var x;
            if (true)
                var x;
        }
    });
    it('using let cannot be declared multiple times', function () {
        // let x = 10;
        // let x = 20;
    });
    it('using var cannot be declared again using let', function () {
        // function f(x : any) {
        //     let x = 100;
        // }
        // function g() {
        //     let x = 100;
        //     var x = 100;
        // }
    });
    it('using let can be redeclared only if they are not in the same scope', function () {
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
    it('inside a conditional statement can be captured only if that conditional statement has only one execution flow', function () {
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
    it('should support immutable types using the keyword const', function () {
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
    it('should support destructuring', function () {
        var input = [1, 2];
        var first = input[0], second = input[1];
        expect(first).toBe(1);
        expect(second).toBe(2);
    });
    it('should support destructuring in functions', function () {
        function f(_a) {
            var first = _a[0], second = _a[1];
            expect(first).toBe(1);
            expect(second).toBe(2);
        }
        f([1, 2]);
    });
    it('should be able to refer to multiple parameter as a destructured rest parameter', function () {
        var _a = [1, 2, 3, 4], first = _a[0], rest = _a.slice(1);
        expect(first).toBe(1);
        expect(rest).toContain(2);
        expect(rest).toContain(3);
        expect(rest).toContain(4);
    });
    it('should support destructuring objects', function () {
        var o = {
            a: "foo",
            b: 12,
            c: "bar"
        };
        var a = o.a, b = o.b;
        expect(a).toBe("foo");
        expect(b).toBe(12);
    });
    it('should support destructuring methods and properties in an object', function () {
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
    it('should support destructuring properties into different names', function () {
        var o = {
            a: 1,
            b: 2
        };
        var newName1 = o.a, newName2 = o.b;
        expect(newName1).toBe(1);
        expect(newName2).toBe(2);
    });
    it('should support destructuring object properties wih a type', function () {
        var o = {
            a: "something",
            b: 2
        };
        var a = o.a, b = o.b;
        expect(typeof (a)).toBe("string");
        expect(typeof (b)).toBe("number");
    });
    it('should be able to assign default values to parameters', function () {
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
    it('should support destructuring function parameters', function () {
        function f(_a) {
            var a = _a.a, b = _a.b;
            expect(a).toBe("something");
            expect(b).toBe(1);
        }
        f({ a: "something", b: 1 });
    });
    it('should be able to spread', function () {
        var first = [1, 2];
        var second = [3, 4];
        var bothPlus = [0].concat(first, second);
        expect(bothPlus).toContain(0);
        expect(bothPlus).toContain(1);
        expect(bothPlus).toContain(2);
        expect(bothPlus).toContain(3);
        expect(bothPlus).toContain(4);
    });
    it('should be able to spread objects', function () {
        var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
        var search = __assign({}, defaults, { food: "rich" });
        expect(search.ambiance).toBe("noisy");
        expect(search.price).toBe("$$");
        expect(search.food).toBe("rich");
    });
    it('should not be able to spread object methods', function () {
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
