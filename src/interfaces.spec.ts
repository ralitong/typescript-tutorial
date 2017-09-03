describe("This suite of tests describes the interfaces in typescript", ()=>{
    it('explains how interfaces work using ordinary functions', ()=>{
        function printLabel(labelledObj : {label : string}) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }

        let myObj = {size : 10, label : "Size 10 Object"}
        printLabel(myObj);
    });

    it('explains how a basic interface works', ()=>{
        interface LabelledValue {
            label : string
        }

        function printLabel(labelledObj : LabelledValue) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }

        let myObj = {size : 10, label : "Size 10 Object"};
        printLabel(myObj);
    });

    it('explains how optional properties can be set in an interface', ()=>{
        interface SquareConfig {
            color? : string,
            width? : number
        }

        function createSqure(config : SquareConfig) : {color : string , area : number} {
            let newSquare = {color : "white", area : 100};
            if(config.color) 
                newSquare.color = config.color;

            if(config.width)
                newSquare.area = config.width * config.width;

            return newSquare;
        }

        let mySquare = createSqure({color : "black"});
        expect(mySquare.area).toBe(100);
        expect(mySquare.color).toBe("black");
    });

    it('describes how readonly properties interfaces works', ()=>{
        interface Point {
            readonly x : number,
            readonly y : number
        }

        let p1 : Point = {x : 10, y : 20};
        // p1.x = 5; // this will not work
    });

    it('describes how readonly can also be used on arrays', ()=>{
        let a : number[] = [1, 2, 3, 4];
        let ro : ReadonlyArray<number> = a;
        // ro[0] = 12; // error
        // ro.push(5); // error
        // ro.length = 100; // error
        // a = ro // error
        a = ro as number[]; // works because readonly array has been converted to an ordinary number[] array
    });

    it('describes how interfaces can be declared as functions', ()=>{
        interface SearchFunc {
            (source : string, subString : string): boolean;
        }

        let mySearch : SearchFunc;
        mySearch = function(src : string, sub : string) {
            let result = src.search(sub);
            return result > -1;
        }

        expect(mySearch('abcdefgh', 'abcde')).toBe(true);
    });

    it('describes how interfaces can be indexable just like arrays', ()=>{
        interface StringArray {
            [index : number] : string
        }

        let myArray : StringArray;
        myArray = ["Bob", "Fred"];

        expect(myArray[0]).toBe("Bob");
    });

    it('describes that when using multi-indexers, the second index type should be the sub-type of the first indexer', ()=>{
        class Animal {
            name : string
        }

        class Dog extends Animal {
            breed : string
        }

        interface NotOkay {
            // [x : number] : Animal; // will not work since number is not a sub type of string
            [x : string] : Dog;
        }
    });

    it('describes that properties of an indexable interface should be the sub-type of the indexer', ()=>{
        interface NumberDictionary {
            [index : string] : number;
            length  : number // ok, length is a number
            // name : string // error, the type of 'name' is not a subtype of the indexer
        }
    });

    it('describes how readonly indexable interfaces can be implemented', ()=>{
        interface ReadonlyStringArray {
            readonly [index : number] : string
        }

        let myArray : ReadonlyStringArray = ["Alice", "Bob"];
        // myArray[2] = "Mallory"; // error
    });

    it('describe how an interface can be implemented', ()=>{
        interface ClockInterface {
            currentTime : Date;
        }

        class Clock implements ClockInterface {
            currentTime : Date;
            constructor(h: number, m : number) {
                expect(h).toBe(1);
                expect(m).toBe(30);
            }
        }

        let clock : ClockInterface = new Clock(1, 30);
    });

    it('describes how methods can be implemented on a class from an interface', ()=>{
        interface ClockInterface {
            currentTime : Date;
            setTime(d : Date) : void;
        }

        class Clock implements ClockInterface {
            currentTime : Date;
            setTime(d : Date) {
                this.currentTime = d;
            }

            constructor(h : number, m : number) {

            }
        }

        let clock : ClockInterface = new Clock(1,30);
        var today = new Date();
        clock.setTime(today);
        expect(clock.currentTime).toEqual(today);
    });

    it('explains how static methods should be properly implemented so that it can be used in an implementing class', ()=> {
        // interface ClockConstructor {
        //     new (hour : number, minute : number);
        // } 

        // class Clock implements ClockConstructor {
        //     currentTime : Date;
        //     constructor(h : number, m : number);
        // }
    });

    it('explains how a constructor could be placed in a seperate interface to create instances of other interfaces', ()=> {
        interface ClockConstructor {
            new (hour : number, minute : number) : ClockInterface;
        }

        interface ClockInterface {
            tick() : void;
        }

        function createClock(ctor : ClockConstructor, hour : number, minute : number) : ClockInterface {
            return new ctor(hour, minute);
        }

        class DigitalClock implements ClockInterface {
            h : number;
            m : number;
            constructor(h: number, m : number) {
                this.h  = h;
                this.m = m;
            }
            tick() {
                expect(this.h).toBe(1);
                expect(this.m).toBe(30);
            }
        }

    
        class AnalogClock implements ClockInterface {
            h : number;
            m : number;
            constructor(h: number, m : number) {
                this.h  = h;
                this.m = m;
            }
            tick() {
                expect(this.h).toBe(1);
                expect(this.m).toBe(30);
            }
        }

        let digital = createClock(DigitalClock, 1, 30);
        let analog = createClock(AnalogClock, 1, 30);
    });

    it('explains how interfaces can be extended', ()=> {
        interface Shape {
            color : string
        }

        interface Square extends Shape {
            sideLength : number
        }

        let square = <Square>{};
        square.color = "blue";
        square.sideLength = 10;

        expect(square.color).toBe("blue");
        expect(square.sideLength).toBe(10);
    });

    it('explains another example of extending interfaces', ()=>{
        interface Shape {
            color : string;
        }

        interface PenStroke {
            penWidth : number;
        }

        interface Square extends Shape, PenStroke {
            sideLength : number;
        }

        let square = <Square>{};
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;

        expect(square.color).toBe("blue");
        expect(square.sideLength).toBe(10);
        expect(square.penWidth).toBe(5.0);
    });

    it('explains how interfaces can extend classes', ()=> {
        class Control {
            private state : any;
        }

        interface SelectableControl extends Control {
            select(): void;
        }

        class Button extends Control implements SelectableControl {
            select() {}
        }

        class Textbox extends Control {

        }

        // will not work since Image does not contain the state property
        // class Image implements SelectableControl {

        // }

        class Location {
            
        }
    });
    
    

    


});