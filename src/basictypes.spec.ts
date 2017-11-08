describe("Types", () => {

    it("should be declared using let", () => {
        let isDone: boolean = false;
        expect(isDone).toBe(false);
    });

    it("should have support for numeric types", () => {
        let decimal: number = 6;
        let hex: number = 0xf00d;
        let binary: number = 0b1010;
        let octal: number = 0o744;

        expect(decimal).toEqual(6);
        expect(hex).toEqual(0xf00d);
        expect(binary).toEqual(0b1010);
        expect(octal).toEqual(0o744);
    });

    it('should have support for string types', () => {
        let color: string = 'blue';
        color = 'red';
    });

    it('should create strings with multiple lines using backticks', () => {
        let averylongtext =
            `The quick brown fox
jumps over the lazy dog`;
        expect(averylongtext).toEqual('The quick brown fox\njumps over the lazy dog');
    });

    it('should display variables inside a string using templates', () => {
        let fullName: string = `Bob Bobbington`;
        let age: number = 37;
        let sentence: string = `Hello, my name is ${fullName}.`;

        expect(sentence).toBe('Hello, my name is Bob Bobbington.');
    });

    it('should have support for arrays', () => {
        let list: number[] = [1, 2, 3];
        expect(list).toContain(1);
        expect(list).toContain(2);
        expect(list).toContain(3);
    });

    it('should support generic array types', () => {
        let list: Array<number> = [1, 2, 3];
        expect(1);
        expect(2);
        expect(3);
    });

    it('should support tuples', () => {
        let x: [string, number];
        x = ['hello', 10];
        expect(x[0]).toBe('hello');
        expect(x[1]).toBe(10);
    });

    it('should support enums', () => {
        enum Color { Red = 1, Green, Blue };
        let c: Color = Color.Green;
        let r: string = Color[2];

        expect(c).toEqual(Color.Green);
        expect(r).toEqual('Green');
    });

    it('should support dynamic types by using the type "any"', () => {
        let notSure: any = 4;
        notSure = "maybe a string instead";
        notSure = false;

        expect(notSure).toBe(false);
    });

    it('should support the type "any" in arrays', () => {
        let list: any[] = [1, true, 'free'];
        list[1] = 100;

        expect(list).toContain(1);
        expect(list).toContain(100);
        expect(list).toContain('free');
        expect(list).not.toContain(true);
    });

    it('should suppport void types', () => {
        function warnUser(): void {

        }
        let receiver: any = warnUser();

        expect(receiver).toBe(undefined);
    });

    it('should let null and undefined be seperate types', () => {
        let u: undefined = undefined;
        let n: null = null;

        expect(u).toBe(undefined);
        expect(n).toBe(null);
    });

    it('should support exceptions', () => {
        let error = (message: string) => {
            throw new Error(message);
        };

        let fail = () => {
            return error("Something failed");
        }

        expect(()=>{fail()}).toThrowError("Something failed");
    });

    xit('should support the use of "never" when indicating an endless loop', ()=> {
        function infinite() : never {
            while(true) {}
        }

        // expect(()=>{infinite()}).toBe(never);
    })

    it('should support type assertions like typecasting in Java', ()=>{
        let someValue : any = 'this is a string';
        let strLength : number = (<string>someValue).length;

        expect(strLength).toBe(16);
    });

    it('should support using "as" when asserting a type', ()=>{
        let someValue : any = 'this is a string';
        let strLength : number = (someValue as string).length;

        expect(strLength).toBe(16);
    });
});