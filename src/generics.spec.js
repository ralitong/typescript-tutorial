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
describe('This suite of tests describe generics in typescript', function () {
    it('describes how to use a type variable to describe a generic object', function () {
        function identity(arg) {
            return arg;
        }
        var output = identity("mystring");
        expect(output).toBe("mystring");
    });
    it('describes how arrays can be used with type variable', function () {
        function loggingIdentiy(arg) {
            return arg;
        }
        var identity = loggingIdentiy(['some', 'nyx']);
        expect(identity).toContain("some");
        expect(identity).toContain("nyx");
    });
    it('demonstrates how to make an interface with a generic type', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentiy = identity;
    });
    it('demonstrates how different name can be used for the generic type', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentiy = identity;
    });
    it('demonstrates how the generic type can be used as a call signature', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentity = identity;
    });
    it('demonstrates using an interface instead of a call signature', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentity = identity;
    });
    it('demonstrates that the type variable can be used in the whole interface', function () {
        function identity(arg) {
            return arg;
        }
        var myIdentity = identity;
    });
    it('demonstrates how to use types in classes', function () {
        var GenericNumber = (function () {
            function GenericNumber() {
            }
            return GenericNumber;
        }());
        var myGenericNumber = new GenericNumber();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y; };
    });
    it('demonstrates how the type used in a class can be different than the context of the class', function () {
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
    it('demonstrates how to constrain types with a property', function () {
        function loggingIdentity(arg) {
            var some = arg.length; // any type that has length can be used
            return arg;
        }
        // loggingIdentity(3) // will not work because 3 has no length property
        loggingIdentity({ length: 10, value: 3 }); // will work because it has length
    });
    it('demonstrates how type can be used to constrain generic parameters', function () {
        function getProperty(obj, key) {
            return obj[key];
        }
        var x = { a: 1, b: 2, c: 3, d: 4 };
        expect(getProperty(x, "a")).toBe(1);
        // getProperty(x, "m"); will not work since m is not a key of x
    });
    it('demonstrates how a constructor can refer to a type when creating generic factories', function () {
        function create(c) {
            return new c();
        }
    });
    xit('demonstrates how generics can constrain relationships between the constructor, function and the instance of the class', function () {
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
