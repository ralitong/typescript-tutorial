describe('Variables', () => {
    it('can be declared using var just like in javascript', () => {
        var message = 'Hello, World!';
        expect(message).toBe('Hello, World!');
    });

    it('should be able to contain functions within functions', () => {
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

    it('functions can be declared before it is used', () => {
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

    it('using var can be called outside its scope', () => {
        // function f(shouldInitialize : boolean) {
        //     if(shouldInitialize)
        //         var x = 10;

        //     return x;
        // }

        // expect(f(true)).toBe(10);
        // expect(f(false)).toBe(undefined);
    });

    it('using var can have unexpected effects inside nested loops', () => {
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

    it('using var can have unexpected effects when used in asynchronous functions', () => {

        // for(var i = 0; i < 10; i++) {
        //     setTimeout(function(){console.log(i);}, 100 * i);
        // }
    });

    it('using let should be properly scoped', () => {
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

    it('using let cannot be used when they are not declared yet', () => {
        // a++;
        // let a;
    });

    it('using let cannot be used inside a function when they are not declared', () => {
        // function foo() {
        //     // okat to capture 'a'
        //     return a;
        // }

        // illegal call 'foo' before 'a' is declared
        // runtimes should thrown an error here
        // foo();

        // let a;
    });

    it('using var can be declared multiple times', () => {
        function f(x: any) {
            var x;
            var x;

            if (true)
                var x;
        }
    });

    it('using let cannot be declared multiple times', () => {
        // let x = 10;
        // let x = 20;
    });

    it('using var cannot be declared again using let', () => {
        // function f(x : any) {
        //     let x = 100;
        // }

        // function g() {
        //     let x = 100;
        //     var x = 100;
        // }
    });

    it('using let can be redeclared only if they are not in the same scope', () => {
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

    it('inside a conditional statement can be captured only if that conditional statement has only one execution flow', () => {
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


    it('should support immutable types using the keyword const', () => {
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

    it('should support destructuring', () => {
        let input = [1, 2];
        let [first, second] = input;
        expect(first).toBe(1);
        expect(second).toBe(2);
    });

    it('should support destructuring in functions', () => {
        function f([first, second]: [number, number]) {
            expect(first).toBe(1);
            expect(second).toBe(2);
        }

        f([1, 2]);
    });


    it('should be able to refer to multiple parameter as a destructured rest parameter', () => {
        let [first, ...rest] = [1, 2, 3, 4];
        expect(first).toBe(1);
        expect(rest).toContain(2);
        expect(rest).toContain(3);
        expect(rest).toContain(4);
    });

    it('should support destructuring objects', () => {
        let o = {
            a: "foo",
            b: 12,
            c: "bar"
        };
        

        let { a, b } = o;
        expect(a).toBe("foo");
        expect(b).toBe(12);
    });

    it('should support destructuring methods and properties in an object', () => {
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

    it('should support destructuring properties into different names', () => {
        let o = {
            a: 1,
            b: 2
        };

        let { a: newName1, b: newName2 } = o;

        expect(newName1).toBe(1);
        expect(newName2).toBe(2);
    });

    it('should support destructuring object properties wih a type', () => {
        let o = {
            a: "something",
            b: 2
        }
        let { a, b }: { a: string, b: number } = o;

        expect(typeof (a)).toBe("string");
        expect(typeof (b)).toBe("number");
    });

    it('should be able to assign default values to parameters', () => {
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

    it('should support destructuring function parameters', () => {
        type C = { a: string, b?: number };
        function f({ a, b }: C): void {
            expect(a).toBe("something");
            expect(b).toBe(1);
        }

        f({ a: "something", b: 1 });
    });

    it('should be able to spread', () => {
        let first = [1, 2];
        let second = [3, 4];
        let bothPlus = [0, ...first, ...second];
        expect(bothPlus).toContain(0);
        expect(bothPlus).toContain(1);
        expect(bothPlus).toContain(2);
        expect(bothPlus).toContain(3);
        expect(bothPlus).toContain(4);
    });

    it('should be able to spread objects', ()=>{
        let defaults = { food : "spicy", price : "$$", ambiance : "noisy"};
        let search = {...defaults, food : "rich"};

        expect(search.ambiance).toBe("noisy");
        expect(search.price).toBe("$$");
        expect(search.food).toBe("rich");
    });

    it('should not be able to spread object methods', ()=>{
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