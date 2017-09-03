describe('This suite describes the ways to declare variables in typescript', () => {
    it('can declare variables using var just like in javascript', () => {
        var message = 'Hello, World!';
        expect(message).toBe('Hello, World!');
    });

    it('can declare functions within functions', () => {
        function f() {
            var a = 10;
            return function g() {
                var b = a + 1;
                return b;
            }
        }

        var g = f();
        expect(g()).toEqual(11);
    });

    it('has another sample for declaring functions within functions', () => {
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

    it('explains the odd scoping rules of var declarations', () => {
        // function f(shouldInitialize : boolean) {
        //     if(shouldInitialize)
        //         var x = 10;

        //     return x;
        // }

        // expect(f(true)).toBe(10);
        // expect(f(false)).toBe(undefined);
    });

    it('explains another example of odd scoping rules of var', () => {
        function sumMatrix(matrix: number[][]) {
            var sum = 0;
            for (var i = 0; i < matrix.length; i++) {
                var currentRow = matrix[i];
                for (var i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }

            return sum;
        }

        let matrix: number[][] = [
            [1, 2, 3],
            [1, 2, 3]
        ];

        expect(sumMatrix(matrix)).toBe(6);
    });

    it('also explains this weird behavior of var in a for-loop', () => {

        // for(var i = 0; i < 10; i++) {
        //     setTimeout(function(){console.log(i);}, 100 * i);
        // }
    });

    it('explains how let block scoping solves the problem of var', () => {
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

    it('explains how variables cannot be used when they are not declared yet', () => {
        // a++;
        // let a;
    });

    it('explains how some variables can still be used in another scope', () => {
        // function foo() {
        //     // okat to capture 'a'
        //     return a;
        // }

        // illegal call 'foo' before 'a' is declared
        // runtimes should thrown an error here
        // foo();

        // let a;
    });

    it('explains how var can be redeclared multiple times', () => {
        function f(x: any) {
            var x;
            var x;

            if (true)
                var x;
        }
    });

    it('explains how let will not declare the same variable multiple times', () => {
        // let x = 10;
        // let x = 20;
    });

    it('explains how variables declared with var cannot be declared again with let', () => {
        // function f(x : any) {
        //     let x = 100;
        // }

        // function g() {
        //     let x = 100;
        //     var x = 100;
        // }
    });

    it('explains that blocked-scoped variable with the same names can be declared in distinct separate blocks', () => {
        function f(condition: boolean, x: number) {
            if (condition) {
                let x = 100;
                return x;
            }

            return x;
        }

        expect(f(false, 0)).toBe(0);
        expect(f(true, 0)).toBe(100);
    });

    it('explains how a block scoped variable can be captured from a finished scope', () => {
        function theCityThatAlwaysSleeps() {
            let getCity;

            if (true) {
                let city = "Seattle";
                getCity = function () {
                    return city;
                }
            }

            return getCity();
        }


        expect(theCityThatAlwaysSleeps()).toBe('Seattle');
    });


    it('has support immutable types by using the keyword const', () => {
        const numLivesForCat = 9;
        const kitty = {
            name: 'Aurora',
            numLives: numLivesForCat
        }

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

    it('has also support for destructuring', () => {
        let input = [1, 2];
        let [first, second] = input;
        expect(first).toBe(1);
        expect(second).toBe(2);
    });

    it('explains how destructuring can be placed inside a function', () => {
        function f([first, second]: [number, number]) {
            expect(first).toBe(1);
            expect(second).toBe(2);
        }

        f([1, 2]);
    });


    it('explains how destructuring can be used to refer to remaining items in a list', () => {
        let [first, ...rest] = [1, 2, 3, 4];
        expect(first).toBe(1);
        expect(rest).toContain(2);
        expect(rest).toContain(3);
        expect(rest).toContain(4);
    });

    it('has support for object destructuring', () => {
        let o = {
            a: "foo",
            b: 12,
            c: "bar"
        };

        let { a, b } = o;
        expect(a).toBe("foo");
        expect(b).toBe(12);
    });

    it('explains how object destructuring can assign an array to refer to the methods and properties of the object', () => {
        let o = {
            a: 1,
            b: 3,
            c: [1, 2, 3],
            d: 10
        };

        let { a, ...passthrough } = o;
        let total = a + passthrough.c.length;

        expect(total).toEqual(4);
    });

    it('explains how properties can be renamed', () => {
        let o = {
            a: 1,
            b: 2
        };

        let { a: newName1, b: newName2 } = o;

        expect(newName1).toBe(1);
        expect(newName2).toBe(2);
    });

    it('explains how properties with type can also be renamed', () => {
        let o = {
            a: "something",
            b: 2
        }
        let { a, b }: { a: string, b: number } = o;

        expect(typeof (a)).toBe("string");
        expect(typeof (b)).toBe("number");
    });

    it('explains how default values can be assigned if parameters are undefined', () => {
        function keepWholeObject(wholeObject: { a: string, b?: number }) {
            let { a, b = 1001 } = wholeObject;

            expect(a).toBe("something");
            expect(b).toBe(1001);
        }

        keepWholeObject({
            a: "something",
            b: undefined
        });
    });

    it('explains how destructuring can be used in function parameters', () => {
        type C = { a: string, b?: number };
        function f({ a, b }: C): void {
            expect(a).toBe("something");
            expect(b).toBe(1);
        }

        f({ a: "something", b: 1 });
    });

    it('explains how spread is opposite to destructuring', () => {
        let first = [1, 2];
        let second = [3, 4];
        let bothPlus = [0, ...first, ...second];
        expect(bothPlus).toContain(0);
        expect(bothPlus).toContain(1);
        expect(bothPlus).toContain(2);
        expect(bothPlus).toContain(3);
        expect(bothPlus).toContain(4);
    });

    it('explains how objects can also be spread', ()=>{
        let defaults = { food : "spicy", price : "$$", ambiance : "noisy"};
        let search = {...defaults, food : "rich"};

        expect(search.ambiance).toBe("noisy");
        expect(search.price).toBe("$$");
        expect(search.food).toBe("rich");
    });

    it('explains how spread will not support methods of an object', ()=>{
        class C {
            p = 12;
            m () {

            }
        }

        let c = new C();
        let clone = {...c};

        expect(clone.p).toBe(12);
        // expect(clone.m()) this will not compile
    });
});