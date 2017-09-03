describe('This suite describes how classes are used in typescript', () => {

    it('describes how to create classes in typescript', () => {
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }

            greet() {
                return "Hello, " + this.greeting;
            }
        }

        let greeter = new Greeter("world");

        expect(greeter.greet()).toBe("Hello, world");
    });

    it("describes how inheritance is done in typescript", () => {
        class Animal {
            name: string;
            constructor(theName: string) {
                this.name = theName;
            }

            move(distanceInMeters: number = 0) {
                return `${this.name} moved ${distanceInMeters}m.`;
            }
        }

        class Snake extends Animal {
            constructor(name: string) {
                super(name);
            }

            move(distanceInMeters = 5) {
                return super.move(distanceInMeters);
            }
        }

        class Horse extends Animal {
            constructor(name: string) {
                super(name);
            }

            move(distanceInMeters: number = 45) {
                return super.move(distanceInMeters);
            }
        }

        let sam = new Snake("Sammy the Python");
        let tom = new Horse("Tommy the Palomino");

        expect(sam.name).toBe("Sammy the Python");
        expect(sam.move()).toBe("Sammy the Python moved 5m.")

        expect(tom.name).toBe("Tommy the Palomino");
        expect(tom.move()).toBe("Tommy the Palomino moved 45m.")
    });

    it("explains that properties and methods are public by default", () => {
        class Animal {
            name: string;
            constructor(theName: string) {
                this.name = theName;
            }

            move(distanceInMeters: number) {
                return `${this.name} moved ${distanceInMeters}m.`;
            }
        }

        let dog = new Animal('dog');
        expect(dog.move(1)).toBe('dog moved 1m.')
    });

    it('explains how private keyword works', () => {
        class Animal {
            private name: string;
            constructor(theName: string) {
                this.name = theName;
            }
        }

        let cat: Animal = new Animal('cat');
        // cat.name; // Error: 'name' is private
    });

    it('explains how classes of one type could only be assigned by another with the same type', () => {
        class Animal {
            private name: string;
            constructor(theName: string) {
                this.name = theName;
            }
        }

        class Rhino extends Animal {
            constructor() {
                super("Rhino");
            }
        }

        class Employee {
            private name: string;
            constructor(theName: string) {
                this.name = theName;
            }
        }

        let animal = new Animal("Goat");
        let rhino = new Rhino();
        let employee = new Employee("Bob");

        animal = rhino;
        // animal = employee; // Error: 'Animal' and 'Employee' are not compatible
    });

    it('explains how protected works in typescript', () => {
        class Person {
            protected name: string;
            constructor(name: string) {
                this.name = name;
            }
        }

        class Employee extends Person {
            private department: string;

            constructor(name: string, department: string) {
                super(name);
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}`;
            }
        }

        let howard = new Employee("Howard", "Sales");
        expect(howard.getElevatorPitch()).toBe("Hello, my name is Howard and I work in Sales");
        // expect(howard.name); // error because name is protected
    });

    it('explains how constructors can also be protected', () => {
        class Person {
            protected name: string;
            protected constructor(theName: string) {
                this.name = theName;
            }
        }

        class Employee extends Person {
            private department: string;

            constructor(name: string, department: string) {
                super(name);
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}`;
            }
        }

        let howard = new Employee("Howard", "Sales");
        // let john = new Person("John"); // not possible because constructor is protected
    });

    it('describes how properties are made readonly', () => {

        class Octopus {
            readonly name: string;
            readonly numberOfLegs: number = 8;

            constructor(theName: string) {
                this.name = theName;
            }
        }

        let dad = new Octopus("Man with 8 strong legs");
        // dad.name = "Man with three piece suit" //Error: name is read only
    });

    it('describes that readonly parameters can be properties of a class', () => {
        class Octopus {
            readonly numberOfLegs: number = 8;
            constructor(readonly name: string) {

            }
        }

        let octopus = new Octopus("octo");
        expect(octopus.name).toBe("octo");
        expect(octopus.numberOfLegs).toBe(8);
    });

    it('describes how to make accessors in typescript', () => {
        let passcode = "secret passcode";

        class Employee {
            private _fullName: string;

            get fullName(): string {
                return this._fullName;
            }

            set fullName(newName: string) {
                if (passcode && passcode == "secret passcode")
                    this._fullName = newName;
                else
                    throw Error("Error: Unauthorized update of employee!");
            }
        }

        let employee = new Employee();
        employee.fullName = "Bob Smith";
        expect(employee.fullName).toBe("Bob Smith");
    });

    it('can also declare static properties', () => {
        class Grid {
            static origin = { x: 0, y: 0 };
            calculateDistanceFromOrigin(point: { x: number, y: number }) {
                let xDist = point.x - Grid.origin.x;
                let yDist = point.y - Grid.origin.y;
                let xSquared = Math.pow(xDist, 2);
                let ySquared = Math.pow(yDist, 2);
                return Math.sqrt(xSquared + ySquared) / this.scale;
            }

            constructor(public scale: number) {

            }
        }

        let grid1 = new Grid(1.0);
        let grid2 = new Grid(5.0);

        let grid1Distance = grid1.calculateDistanceFromOrigin({ x: 10, y: 10 });
        let grid2Distance = grid2.calculateDistanceFromOrigin({ x: 10, y: 10 });
        expect(grid1Distance).toEqual(14.142135623730951);
        expect(grid2Distance).toEqual(2.8284271247461903);
    });


    it('has also support for abstract classes', () => {
        abstract class Department {
            constructor(public name: string) {

            }

            printName(): string {
                return `Department name: ${this.name}`;
            }

            abstract printMeeting(): string;
        }

        class AccountingDepartment extends Department {
            constructor() {
                super("Accounting and Auditing"); // constructors in derived classes must call super
            }

            printMeeting(): string {
                return "The Accounting Department meets each Monday at 10am.";
            }

            generateReports(): string {
                return "Generating accounting reports...";
            }
        }

        let department: Department;
        // department = new Department(); // not possible because Department is an abstract class
        department = new AccountingDepartment();

        expect(department.name).toBe("Accounting and Auditing");
        // expect(department.generateReports()); // not possible because method was not declared on Department abstract class
    });


    it('describes how constructor functions can be used to instantiate classes', () => {
        class Greeter {
            static standardGreeting = "Hello, there";
            greeting: string;
            greet() {
                if (this.greeting)
                    return "Hello, " + this.greeting;
                else
                    return Greeter.standardGreeting;
            }
        }

        let greeter1: Greeter;
        greeter1 = new Greeter();
        expect(greeter1.greet()).toBe(Greeter.standardGreeting);

        let greeterMaker: typeof Greeter = Greeter;
        greeterMaker.standardGreeting = "Hey there!";

        let greeter2: Greeter = new greeterMaker();
        expect(greeter2.greet()).toBe("Hey there!");
    });

    it('explains how classes can be used as an interface', () => {
        class Point {
            x: number;
            y: number;
        }

        interface Point3d extends Point {
            z: number;
        }

        let point3d: Point3d = { x: 1, y: 2, z: 3 };
        expect(point3d.x).toBe(1);
        expect(point3d.y).toBe(2);
        expect(point3d.z).toBe(3);
    });
});