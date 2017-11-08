describe('Enums', () => {
    it('should support operators when assigning values to elements', () => {
        enum FileAccess {
            None,
            Read = 1 << 1,
            Write = 1 << 2,
            ReadWrite = Read | Write,
            G = "123".length
        }

        expect(FileAccess.None).toBe(0);
        expect(FileAccess.Read).toBe(2);
        expect(FileAccess.Write).toBe(4);
        expect(FileAccess.G).toBe(3);
    });

    it('should support reverse mapping of enum values to enum names', () =>{
        enum Enum {
            A
        }

        let a = Enum.A;
        expect(Enum[a]).toBe("A");
    });

    it('can be constant', ()=> {
        const enum Directions {
            Up,
            Down,
            Left,
            Right
        }

        let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    });

    it('can have ambient enums whose members can be uninitialized', ()=>{
        // declare enum Enum {
        //     A = 1,
        //     B,
        //     C = 2
        // }
    });
});