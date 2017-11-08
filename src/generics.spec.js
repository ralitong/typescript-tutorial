"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
describe('Generics', function () {
    it('should make generic functions by using a type symbol', function () {
        function identity(arg) {
            return arg;
        }
        var output = identity("mystring");
        expect(output).toBe("mystring");
    });
    it('should be supported on arrays', function () {
        function loggingIdentiy(arg) {
            return arg;
        }
        var identity = loggingIdentiy(['some', 'nyx']);
        expect(identity).toContain("some");
        expect(identity).toContain("nyx");
    });
    it('should also be applied to interfaces', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentiy = identity;
    });
    it('should be able to use any symbol for the generic type', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentiy = identity;
    });
    it('should be able to use the generic type as a call signature', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentity = identity;
    });
    it('should be able to use as an interface as a call signature', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentity = identity;
    });
    it('should also be applied to all parts of an interface', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentity = identity;
    });
    it('should also be supported in classes', function () {
        var GenericNumber = (function () {
            function GenericNumber() {
            }
            return GenericNumber;
        }());
        var myGenericNumber = new GenericNumber();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y; };
    });
    it('context should be neutral to the ones implementing the generic', function () {
        var GenericNumber = (function () {
            function GenericNumber() {
            }
            return GenericNumber;
        }());
        var stringNumeric = new GenericNumber();
        stringNumeric.zeroValue = "";
        stringNumeric.add = function (x, y) { return x + y; };
        expect(stringNumeric.add(stringNumeric.zeroValue, "test")).toBe("test");
    });
    it('should be able to constraint parameters with properties expected from the type', function () {
        function loggingIdentity(arg) {
            var some = arg.length; // any type that has length can be used
            return arg;
        }
        // loggingIdentity(3) // will not work because 3 has no length property
        loggingIdentity({ length: 10, value: 3 }); // will work because it has length
    });
    it('should support more than one generic type', function () {
        function getProperty(obj, key) {
            return obj[key];
        }
        var x = { a: 1, b: 2, c: 3, d: 4 };
        expect(getProperty(x, "a")).toBe(1);
        // getProperty(x, "m"); will not work since m is not a key of x
    });
    it('should support specifying a generic type for constructor functions', function () {
        function create(c) {
            return new c();
        }
    });
    xit('should support constraining relationships between the constructor, function and the instance of the class', function () {
        var BeeKeeper = (function () {
            function BeeKeeper() {
            }
            return BeeKeeper;
        }());
        var ZooKeeper = (function () {
            function ZooKeeper() {
            }
            return ZooKeeper;
        }());
        var Animal = (function () {
            function Animal() {
            }
            return Animal;
        }());
        var Bee = (function (_super) {
            __extends(Bee, _super);
            function Bee() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Bee;
        }(Animal));
        var Lion = (function (_super) {
            __extends(Lion, _super);
            function Lion() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Lion;
        }(Animal));
        function createInstance(c) {
            return new c();
        }
        createInstance(Lion).keeper.nametag;
        createInstance(Bee).keeper.hasMask;
    });
});
