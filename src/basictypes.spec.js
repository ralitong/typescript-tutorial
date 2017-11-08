"use strict";
describe("Types", function () {
    it("should be declared using let", function () {
        var isDone = false;
        expect(isDone).toBe(false);
    });
    it("should have support for numeric types", function () {
        var decimal = 6;
        var hex = 0xf00d;
        var binary = 10;
        var octal = 484;
        expect(decimal).toEqual(6);
        expect(hex).toEqual(0xf00d);
        expect(binary).toEqual(10);
        expect(octal).toEqual(484);
    });
    it('should have support for string types', function () {
        var color = 'blue';
        color = 'red';
    });
    it('should create strings with multiple lines using backticks', function () {
        var averylongtext = "The quick brown fox\njumps over the lazy dog";
        expect(averylongtext).toEqual('The quick brown fox\njumps over the lazy dog');
    });
    it('should display variables inside a string using templates', function () {
        var fullName = "Bob Bobbington";
        var age = 37;
        var sentence = "Hello, my name is " + fullName + ".";
        expect(sentence).toBe('Hello, my name is Bob Bobbington.');
    });
    it('should have support for arrays', function () {
        var list = [1, 2, 3];
        expect(list).toContain(1);
        expect(list).toContain(2);
        expect(list).toContain(3);
    });
    it('should support generic array types', function () {
        var list = [1, 2, 3];
        expect(1);
        expect(2);
        expect(3);
    });
    it('should support tuples', function () {
        var x;
        x = ['hello', 10];
        expect(x[0]).toBe('hello');
        expect(x[1]).toBe(10);
    });
    it('should support enums', function () {
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
    it('should support dynamic types by using the type "any"', function () {
        var notSure = 4;
        notSure = "maybe a string instead";
        notSure = false;
        expect(notSure).toBe(false);
    });
    it('should support the type "any" in arrays', function () {
        var list = [1, true, 'free'];
        list[1] = 100;
        expect(list).toContain(1);
        expect(list).toContain(100);
        expect(list).toContain('free');
        expect(list).not.toContain(true);
    });
    it('should suppport void types', function () {
        function warnUser() {
        }
        var receiver = warnUser();
        expect(receiver).toBe(undefined);
    });
    it('should let null and undefined be seperate types', function () {
        var u = undefined;
        var n = null;
        expect(u).toBe(undefined);
        expect(n).toBe(null);
    });
    it('should support exceptions', function () {
        var error = function (message) {
            throw new Error(message);
        };
        var fail = function () {
            return error("Something failed");
        };
        expect(function () { fail(); }).toThrowError("Something failed");
    });
    xit('should support the use of "never" when indicating an endless loop', function () {
        function infinite() {
            while (true) { }
        }
        // expect(()=>{infinite()}).toBe(never);
    });
    it('should support type assertions like typecasting in Java', function () {
        var someValue = 'this is a string';
        var strLength = someValue.length;
        expect(strLength).toBe(16);
    });
    it('should support using "as" when asserting a type', function () {
        var someValue = 'this is a string';
        var strLength = someValue.length;
        expect(strLength).toBe(16);
    });
});
