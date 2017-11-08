describe('Generics', () => {
    it('should make generic functions by using a type symbol', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let output = identity<string>("mystring");
        expect(output).toBe("mystring");
    });

    it('should be supported on arrays', () => {
        function loggingIdentiy<T>(arg: Array<T>): Array<T> {
            return arg;
        }

        let identity: Array<string> = loggingIdentiy<string>(['some', 'nyx']);
        expect(identity).toContain("some");
        expect(identity).toContain("nyx");
    });

    it('should also be applied to interfaces', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentiy: <T>(arg: T) => T = identity;
    });

    it('should be able to use any symbol for the generic type', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentiy: <U>(arg: U) => U = identity;
    });

    it('should be able to use the generic type as a call signature', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: { <T>(arg: T): T } = identity;
    });

    it('should be able to use as an interface as a call signature', () => {
        interface GenericIdentiyFn {
            <T>(arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: GenericIdentiyFn = identity;
    });

    it('should also be applied to all parts of an interface', () => {
        interface GenericIdentityFn<T> {
            (arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: GenericIdentityFn<number> = identity;
    });

    it('should also be supported in classes', () => {
        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
        }

        let myGenericNumber = new GenericNumber<number>();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y };
    });

    it('context should be neutral to the ones implementing the generic', () => {
        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
        }

        let stringNumeric = new GenericNumber<string>();
        stringNumeric.zeroValue = "";
        stringNumeric.add = function (x, y) { return x + y }

        expect(stringNumeric.add(stringNumeric.zeroValue, "test")).toBe("test");
    });

    it('should be able to constraint parameters with properties expected from the type', ()=>{
        interface Lengthwise {
            length : number;
        }

        function loggingIdentity<T extends Lengthwise>(arg : T) : T {
            let some : number = arg.length; // any type that has length can be used
            return arg;
        }

        // loggingIdentity(3) // will not work because 3 has no length property
        loggingIdentity({length : 10, value : 3}); // will work because it has length
    });

    it('should support more than one generic type', ()=>{
        function getProperty<T, K extends keyof T>(obj : T, key : K) {
            return obj[key];
        }

        let x = {a : 1, b : 2, c : 3, d : 4};

        expect(getProperty(x, "a")).toBe(1);
        // getProperty(x, "m"); will not work since m is not a key of x
    });

    it('should support specifying a generic type for constructor functions', ()=>{
        function create<T>(c : {new() : T;}) : T {
            return new c();
        }
    });

    xit('should support constraining relationships between the constructor, function and the instance of the class', ()=>{
        class BeeKeeper {
            hasMask : boolean
        }

        class ZooKeeper {
            nametag : string
        }

        class Animal {
            numLegs : number
        }

        class Bee extends Animal {
            keeper : BeeKeeper;
        }

        class Lion extends Animal {
            keeper : ZooKeeper
        }

        function createInstance<A extends Animal>(c : new()=>A) : A {
            return new c();
        }

        createInstance(Lion).keeper.nametag;
        createInstance(Bee).keeper.hasMask;
    })
});