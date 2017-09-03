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
describe("This suite of tests describes the interfaces in typescript", function () {
    it('explains how interfaces work using ordinary functions', function () {
        function printLabel(labelledObj) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }
        var myObj = { size: 10, label: "Size 10 Object" };
        printLabel(myObj);
    });
    it('explains how a basic interface works', function () {
        function printLabel(labelledObj) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }
        var myObj = { size: 10, label: "Size 10 Object" };
        printLabel(myObj);
    });
    it('explains how optional properties can be set in an interface', function () {
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
    it('describes how readonly properties interfaces works', function () {
        var p1 = { x: 10, y: 20 };
        // p1.x = 5; // this will not work
    });
    it('describes how readonly can also be used on arrays', function () {
        var a = [1, 2, 3, 4];
        var ro = a;
        // ro[0] = 12; // error
        // ro.push(5); // error
        // ro.length = 100; // error
        // a = ro // error
        a = ro; // works because readonly array has been converted to an ordinary number[] array
    });
    it('describes how interfaces can be declared as functions', function () {
        var mySearch;
        mySearch = function (src, sub) {
            var result = src.search(sub);
            return result > -1;
        };
        expect(mySearch('abcdefgh', 'abcde')).toBe(true);
    });
    it('describes how interfaces can be indexable just like arrays', function () {
        var myArray;
        myArray = ["Bob", "Fred"];
        expect(myArray[0]).toBe("Bob");
    });
    it('describes that when using multi-indexers, the second index type should be the sub-type of the first indexer', function () {
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
    it('describes that properties of an indexable interface should be the sub-type of the indexer', function () {
    });
    it('describes how readonly indexable interfaces can be implemented', function () {
        var myArray = ["Alice", "Bob"];
        // myArray[2] = "Mallory"; // error
    });
    it('describe how an interface can be implemented', function () {
        var Clock = (function () {
            function Clock(h, m) {
                expect(h).toBe(1);
                expect(m).toBe(30);
            }
            return Clock;
        }());
        var clock = new Clock(1, 30);
    });
    it('describes how methods can be implemented on a class from an interface', function () {
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
    it('explains how static methods should be properly implemented so that it can be used in an implementing class', function () {
        // interface ClockConstructor {
        //     new (hour : number, minute : number);
        // } 
        // class Clock implements ClockConstructor {
        //     currentTime : Date;
        //     constructor(h : number, m : number);
        // }
    });
    it('explains how a constructor could be placed in a seperate interface to create instances of other interfaces', function () {
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
    it('explains how interfaces can be extended', function () {
        var square = {};
        square.color = "blue";
        square.sideLength = 10;
        expect(square.color).toBe("blue");
        expect(square.sideLength).toBe(10);
    });
    it('explains another example of extending interfaces', function () {
        var square = {};
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;
        expect(square.color).toBe("blue");
        expect(square.sideLength).toBe(10);
        expect(square.penWidth).toBe(5.0);
    });
    it('explains how interfaces can extend classes', function () {
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
