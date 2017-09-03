"use strict";
describe("this suite describes the basic types of typescript", function () {
    it("uses let to declare variables", function () {
        var isDone = false;
        expect(isDone).toBe(false);
    });
    it("has support for numeric types", function () {
        var decimal = 6;
        var hex = 0xf00d;
        var binary = 10;
        var octal = 484;
        expect(decimal).toEqual(6);
        expect(hex).toEqual(0xf00d);
        expect(binary).toEqual(10);
        expect(octal).toEqual(484);
    });
    it('has support for string types', function () {
        var color = 'blue';
        color = 'red';
    });
    it('uses backticks to create strings with multiple lines', function () {
        var averylongtext = "The quick brown fox\njumps over the lazy dog";
        expect(averylongtext).toEqual('The quick brown fox\njumps over the lazy dog');
    });
    it('uses backticks to create templates inside the string', function () {
        var fullName = "Bob Bobbington";
        var age = 37;
        var sentence = "Hello, my name is " + fullName + ".";
        expect(sentence).toBe('Hello, my name is Bob Bobbington.');
    });
    it('has support for arrays', function () {
        var list = [1, 2, 3];
        expect(list).toContain(1);
        expect(list).toContain(2);
        expect(list).toContain(3);
    });
    it('has support for generic array types', function () {
        var list = [1, 2, 3];
        expect(1);
        expect(2);
        expect(3);
    });
    it('has support for tuples', function () {
        var x;
        x = ['hello', 10];
        expect(x[0]).toBe('hello');
        expect(x[1]).toBe(10);
    });
    it('has support for enums', function () {
        var Color;
        (function (Color) {
            Color[Color["Red"] = 1] = "Red";
            Color[Color["Green"] = 2] = "Green";
            Color[Color["Blue"] = 3] = "Blue";
        })(Color || (Color = {}));
        ;
        var c = Color.Green;
        var r = Color[2];
        expect(c).toEqual(Color.Green);
        expect(r).toEqual('Green');
    });
    it('has support for dynamic types called any', function () {
        var notSure = 4;
        notSure = "maybe a string instead";
        notSure = false;
        expect(notSure).toBe(false);
    });
    it('can use any in arrays', function () {
        var list = [1, true, 'free'];
        list[1] = 100;
        expect(list).toContain(1);
        expect(list).toContain(100);
        expect(list).toContain('free');
        expect(list).not.toContain(true);
    });
    it('has also support for void types', function () {
        function warnUser() {
        }
        var receiver = warnUser();
        expect(receiver).toBe(undefined);
    });
    it('defines that null and undefined have their own types', function () {
        var u = undefined;
        var n = null;
        expect(u).toBe(undefined);
        expect(n).toBe(null);
    });
    it('it has support for exceptions', function () {
        var error = function (message) {
            throw new Error(message);
        };
        var fail = function () {
            return error("Something failed");
        };
        expect(function () { fail(); }).toThrowError("Something failed");
    });
    xit('uses never for infinite loops', function () {
        function infinite() {
            while (true) { }
        }
        // expect(()=>{infinite()}).toBe(never);
    });
    it('has support for type assertions', function () {
        var someValue = 'this is a string';
        var strLength = someValue.length;
        expect(strLength).toBe(16);
    });
    it('can also as for type assertions', function () {
        var someValue = 'this is a string';
        var strLength = someValue.length;
        expect(strLength).toBe(16);
    });
});
