describe("Interfaces", ()=>{
    it('should be implemented using functions', ()=>{
        function printLabel(labelledObj : {label : string}) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }

        let myObj = {size : 10, label : "Size 10 Object"}
        printLabel(myObj);
    });

    it('should be created using the interface keyword', ()=>{
        interface LabelledValue {
            label : string
        }

        function printLabel(labelledObj : LabelledValue) {
            expect(labelledObj.label).toBe("Size 10 Object");
        }

        let myObj = {size : 10, label : "Size 10 Object"};
        printLabel(myObj);
    });

    it('should support optional properties', ()=>{
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

    it('should support readonly properties', ()=>{
        interface Point {
            readonly x : number,
            readonly y : number
        }

        let p1 : Point = {x : 10, y : 20};
        // p1.x = 5; // this will not work
    });

    it('should support readonly arrays using ReadonlyArray generic type', ()=>{
        let a : number[] = [1, 2, 3, 4];
        let ro : ReadonlyArray<number> = a;
        // ro[0] = 12; // error
        // ro.push(5); // error
        // ro.length = 100; // error
        // a = ro // error
        a = ro as number[]; // works because readonly array has been converted to an ordinary number[] array
    });

    it('should also support implementation in functions', ()=>{
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

    it('should be indexable arrays', ()=>{
        interface StringArray {
            [index : number] : string
        }

        let myArray : StringArray;
        myArray = ["Bob", "Fred"];

        expect(myArray[0]).toBe("Bob");
    });

    it('using multi-indexers; the second index type should be the sub-type of the first indexer', ()=>{
        class Animal {
            name : string
        }

        class Dog extends Animal {
            breed : number
        }

        interface NotOkay {
            // [x : number] : Animal; // will not work since number is not a sub type of string
            [x : string] : Dog;
        }
    });

    it('properties should be the sub-type of the return type of the indexer', ()=>{
        interface NumberDictionary {
            [index : string] : number;
            length  : number // ok, length is a number
            // name : string // error, the type of 'name' is not a subtype of the indexer
        }
    });

    it('should support readonly indexers', ()=>{
        interface ReadonlyStringArray {
            readonly [index : number] : string
        }

        let myArray : ReadonlyStringArray = ["Alice", "Bob"];
        // myArray[2] = "Mallory"; // error
    });

    it('should support implementation using the keyword implement', ()=>{
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

    it('should support methods without a body', ()=>{
        interface ClockInterface {
            currentTime : Date;
            setTime(d : Date) : void;
        }

        class Clock implements ClockInterface {
            currentTime : Date;
            setTime(d : Date)  {
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

    it('implementing classes should not be able to use constructor interfaces directly', ()=> {
        // interface ClockConstructor {
        //     new (hour : number, minute : number);
        // } 

        // class Clock implements ClockConstructor {
        //     currentTime : Date;
        //     constructor(h : number, m : number);
        // }
    });

    it('should be created with a constructor function only if that constructor function is used by creator or factory function', ()=> {
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

    it('should support extension', ()=> {
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

    it('should be able to extend using other interfaces', ()=>{
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

    it('should be able to extend using classes', ()=> {
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