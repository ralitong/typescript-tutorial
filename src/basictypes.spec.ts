describe("this suite describes the basic types of typescript", () => {

    it("uses let to declare variables", () => {
        let isDone: boolean = false;
        expect(isDone).toBe(false);
    });

    it("has support for numeric types", () => {
        let decimal: number = 6;
        let hex: number = 0xf00d;
        let binary: number = 0b1010;
        let octal: number = 0o744;

        expect(decimal).toEqual(6);
        expect(hex).toEqual(0xf00d);
        expect(binary).toEqual(0b1010);
        expect(octal).toEqual(0o744);
    });

    it('has support for string types', () => {
        let color: string = 'blue';
        color = 'red';
    });

    it('uses backticks to create strings with multiple lines', () => {
        let averylongtext =
            `The quick brown fox
jumps over the lazy dog`;
        expect(averylongtext).toEqual('The quick brown fox\njumps over the lazy dog');
    });

    it('uses backticks to create templates inside the string', () => {
        let fullName: string = `Bob Bobbington`;
        let age: number = 37;
        let sentence: string = `Hello, my name is ${fullName}.`;

        expect(sentence).toBe('Hello, my name is Bob Bobbington.');
    });

    it('has support for arrays', () => {
        let list: number[] = [1, 2, 3];
        expect(list).toContain(1);
        expect(list).toContain(2);
        expect(list).toContain(3);
    });

    it('has support for generic array types', () => {
        let list: Array<number> = [1, 2, 3];
        expect(1);
        expect(2);
        expect(3);
    });

    it('has support for tuples', () => {
        let x: [string, number];
        x = ['hello', 10];
        expect(x[0]).toBe('hello');
        expect(x[1]).toBe(10);
    });

    it('has support for enums', () => {
        enum Color { Red = 1, Green, Blue };
        let c: Color = Color.Green;
        let r: string = Color[2];

        expect(c).toEqual(Color.Green);
        expect(r).toEqual('Green');
    });

    it('has support for dynamic types called any', () => {
        let notSure: any = 4;
        notSure = "maybe a string instead";
        notSure = false;

        expect(notSure).toBe(false);
    });

    it('can use any in arrays', () => {
        let list: any[] = [1, true, 'free'];
        list[1] = 100;

        expect(list).toContain(1);
        expect(list).toContain(100);
        expect(list).toContain('free');
        expect(list).not.toContain(true);
    });

    it('has also support for void types', () => {
        function warnUser(): void {

        }
        let receiver: any = warnUser();

        expect(receiver).toBe(undefined);
    });

    it('defines that null and undefined have their own types', () => {
        let u: undefined = undefined;
        let n: null = null;

        expect(u).toBe(undefined);
        expect(n).toBe(null);
    });

    it('it has support for exceptions', () => {
        let error = (message: string) => {
            throw new Error(message);
        };

        let fail = () => {
            return error("Something failed");
        }

        expect(()=>{fail()}).toThrowError("Something failed");
    });

    xit('uses never for infinite loops', ()=> {
        function infinite() : never {
            while(true) {}
        }

        // expect(()=>{infinite()}).toBe(never);
    })

    it('has support for type assertions', ()=>{
        let someValue : any = 'this is a string';
        let strLength : number = (<string>someValue).length;

        expect(strLength).toBe(16);
    });

    it('can also as for type assertions', ()=>{
        let someValue : any = 'this is a string';
        let strLength : number = (someValue as string).length;

        expect(strLength).toBe(16);
    });
});