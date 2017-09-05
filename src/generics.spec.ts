describe('This suite of tests describe generics in typescript', () => {
    it('describes how to use a type variable to describe a generic object', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let output = identity<string>("mystring");
        expect(output).toBe("mystring");
    });

    it('describes how arrays can be used with type variable', () => {
        function loggingIdentiy<T>(arg: Array<T>): Array<T> {
            return arg;
        }

        let identity: Array<string> = loggingIdentiy<string>(['some', 'nyx']);
        expect(identity).toContain("some");
        expect(identity).toContain("nyx");
    });

    it('demonstrates how to make an interface with a generic type', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentiy: <T>(arg: T) => T = identity;
    });

    it('demonstrates how different name can be used for the generic type', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentiy: <U>(arg: U) => U = identity;
    });

    it('demonstrates how the generic type can be used as a call signature', () => {
        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: { <T>(arg: T): T } = identity;
    });

    it('demonstrates using an interface instead of a call signature', () => {
        interface GenericIdentiyFn {
            <T>(arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: GenericIdentiyFn = identity;
    });

    it('demonstrates that the type variable can be used in the whole interface', () => {
        interface GenericIdentityFn<T> {
            (arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: GenericIdentityFn<number> = identity;
    });

    it('demonstrates how to use types in classes', () => {
        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
        }

        let myGenericNumber = new GenericNumber<number>();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y };
    });

    it('demonstrates how the type used in a class can be different than the context of the class', () => {
        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
        }

        let stringNumeric = new GenericNumber<string>();
        stringNumeric.zeroValue = "";
        stringNumeric.add = function (x, y) { return x + y }

        expect(stringNumeric.add(stringNumeric.zeroValue, "test")).toBe("test");
    });

    it('demonstrates how to constrain types with a property', ()=>{
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

    it('demonstrates how type can be used to constrain generic parameters', ()=>{
        function getProperty<T, K extends keyof T>(obj : T, key : K) {
            return obj[key];
        }

        let x = {a : 1, b : 2, c : 3, d : 4};

        expect(getProperty(x, "a")).toBe(1);
        // getProperty(x, "m"); will not work since m is not a key of x
    });

    it('demonstrates how a constructor can refer to a type when creating generic factories', ()=>{
        function create<T>(c : {new() : T;}) : T {
            return new c();
        }
    });

    xit('demonstrates how generics can constrain relationships between the constructor, function and the instance of the class', ()=>{
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