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
describe("Interfaces", function () {
    it('should be implemented using functions', function () {
        function printLabel(labelledObj) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }
        var myObj = { size: 10, label: "Size 10 Object" };
        printLabel(myObj);
    });
    it('should be created using the interface keyword', function () {
        function printLabel(labelledObj) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }
        var myObj = { size: 10, label: "Size 10 Object" };
        printLabel(myObj);
    });
    it('should support optional properties', function () {
        function createSqure(config) {
            var newSquare = { color: "white", area: 100 };
            if (config.color)
                newSquare.color = config.color;
            if (config.width)
                newSquare.area = config.width * config.width;
            return newSquare;
        }
        var mySquare = createSqure({ color: "black" });
        expect(mySquare.area).toBe(100);
        expect(mySquare.color).toBe("black");
    });
    it('should support readonly properties', function () {
        var p1 = { x: 10, y: 20 };
        // p1.x = 5; // this will not work
    });
    it('should support readonly arrays using ReadonlyArray generic type', function () {
        var a = [1, 2, 3, 4];
        var ro = a;
        // ro[0] = 12; // error
        // ro.push(5); // error
        // ro.length = 100; // error
        // a = ro // error
        a = ro; // works because readonly array has been converted to an ordinary number[] array
    });
    it('should also support implementation in functions', function () {
        var mySearch;
        mySearch = function (src, sub) {
            var result = src.search(sub);
            return result > -1;
        };
        expect(mySearch('abcdefgh', 'abcde')).toBe(true);
    });
    it('should be indexable arrays', function () {
        var myArray;
        myArray = ["Bob", "Fred"];
        expect(myArray[0]).toBe("Bob");
    });
    it('using multi-indexers; the second index type should be the sub-type of the first indexer', function () {
        var Animal = (function () {
            function Animal() {
            }
            return Animal;
        }());
        var Dog = (function (_super) {
            __extends(Dog, _super);
            function Dog() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Dog;
        }(Animal));
    });
    it('properties should be the sub-type of the return type of the indexer', function () {
    });
    it('should support readonly indexers', function () {
        var myArray = ["Alice", "Bob"];
        // myArray[2] = "Mallory"; // error
    });
    it('should support implementation using the keyword implement', function () {
        var Clock = (function () {
            function Clock(h, m) {
                expect(h).toBe(1);
                expect(m).toBe(30);
            }
            return Clock;
        }());
        var clock = new Clock(1, 30);
    });
    it('should support methods without a body', function () {
        var Clock = (function () {
            function Clock(h, m) {
            }
            Clock.prototype.setTime = function (d) {
                this.currentTime = d;
            };
            return Clock;
        }());
        var clock = new Clock(1, 30);
        var today = new Date();
        clock.setTime(today);
        expect(clock.currentTime).toEqual(today);
    });
    it('implementing classes should not be able to use constructor interfaces directly', function () {
        // interface ClockConstructor {
        //     new (hour : number, minute : number);
        // } 
        // class Clock implements ClockConstructor {
        //     currentTime : Date;
        //     constructor(h : number, m : number);
        // }
    });
    it('should be created with a constructor function only if that constructor function is used by creator or factory function', function () {
        function createClock(ctor, hour, minute) {
            return new ctor(hour, minute);
        }
        var DigitalClock = (function () {
            function DigitalClock(h, m) {
                this.h = h;
                this.m = m;
            }
            DigitalClock.prototype.tick = function () {
                expect(this.h).toBe(1);
                expect(this.m).toBe(30);
            };
            return DigitalClock;
        }());
        var AnalogClock = (function () {
            function AnalogClock(h, m) {
                this.h = h;
                this.m = m;
            }
            AnalogClock.prototype.tick = function () {
                expect(this.h).toBe(1);
                expect(this.m).toBe(30);
            };
            return AnalogClock;
        }());
        var digital = createClock(DigitalClock, 1, 30);
        var analog = createClock(AnalogClock, 1, 30);
    });
    it('should support extension', function () {
        var square = {};
        square.color = "blue";
        square.sideLength = 10;
        expect(square.color).toBe("blue");
        expect(square.sideLength).toBe(10);
    });
    it('should be able to extend using other interfaces', function () {
        var square = {};
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;
        expect(square.color).toBe("blue");
        expect(square.sideLength).toBe(10);
        expect(square.penWidth).toBe(5.0);
    });
    it('should be able to extend using classes', function () {
        var Control = (function () {
            function Control() {
            }
            return Control;
        }());
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Button.prototype.select = function () { };
            return Button;
        }(Control));
        var Textbox = (function (_super) {
            __extends(Textbox, _super);
            function Textbox() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Textbox;
        }(Control));
        // will not work since Image does not contain the state property
        // class Image implements SelectableControl {
        // }
        var Location = (function () {
            function Location() {
            }
            return Location;
        }());
    });
});
