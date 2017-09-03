describe('This suite describes how functions are used in typescript', () => {
    it('describes how functions can have types', () => {
        let add = (x: number, y: number): number => {
            return x + y;
        }

        let myAdd = (x: number, y: number): number => {
            return x + y;
        }
    });

    it('explains how to write the function type of the function', () => {
        let myAdd: (x: number, y: number) => number =
            function (x: number, y: number): number { return x + y; };
    });

    it('explains how to aid readability by giving parameters name', () => {
        let myAdd: (baseValue: number, increment: number) => number =
            function (x: number, y: number): number { return x + y };
    });

    it('explains how types are inferred in functions', () => {
        // myAdd has the full function type
        let myAdd = function (x: number, y: number): number {
            return x + y;
        }

        // The parameters 'x' and 'y' have the type number
        let yourAdd: (baseValue: number, increment: number) => number =
            function (x, y) { return x + y };
    });

    it('has also support for optional parameters', () => {
        function buildName(firstName: string, lastName?: string) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }

        let result1 = buildName("Bob");
        // let result2 = buildName("Bob", "Adams", "Sr"); // will not work since function has only two paramters
        let result3 = buildName("Bob", "Adams");

        expect(result1).toBe("Bob");
        expect(result3).toBe("Bob Adams");
    });

    it('it has also support for default values for parameters', () => {
        function buildName(firstName: string, lastName = "Smith") {
            return firstName + " " + lastName;
        }

        let result1 = buildName("Bob");
        let result2 = buildName("Bob", undefined);
        // let result3 = buildName("Bob", "Adams", "Sr.") // too many parameters
        let result4 = buildName("Bob", "Adams");

        expect(result1).toBe("Bob Smith");
        expect(result2).toBe("Bob Smith");
        expect(result4).toBe("Bob Adams");
    });

    it('has support for variable number of parameters called rest', ()=>{
        function buildName(firstName : string , ...restOfName : string[]) {
            return firstName + " " + restOfName.join(" ");
        }

        let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mackinzie");
        expect(employeeName).toBe("Joseph Samuel Lucas Mackinzie");
    })


})