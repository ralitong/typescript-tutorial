"use strict";
describe('Enums in typescript', function () {
    it('should support operators when assigning values to elements', function () {
        var FileAccess;
        (function (FileAccess) {
            FileAccess[FileAccess["None"] = 0] = "None";
            FileAccess[FileAccess["Read"] = 2] = "Read";
            FileAccess[FileAccess["Write"] = 4] = "Write";
            FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
            FileAccess[FileAccess["G"] = "123".length] = "G";
        })(FileAccess || (FileAccess = {}));
        expect(FileAccess.None).toBe(0);
        expect(FileAccess.Read).toBe(2);
        expect(FileAccess.Write).toBe(4);
        expect(FileAccess.G).toBe(3);
    });
    it('should support reverse mapping of enum values to enum names', function () {
        var Enum;
        (function (Enum) {
            Enum[Enum["A"] = 0] = "A";
        })(Enum || (Enum = {}));
        var a = Enum.A;
        expect(Enum[a]).toBe("A");
    });
    it('can be constant', function () {
        var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    });
    it('can have ambient enums whose members can be uninitialized', function () {
        // declare enum Enum {
        //     A = 1,
        //     B,
        //     C = 2
        // }
    });
});
