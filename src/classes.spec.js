"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
describe('This suite describes how classes are used in typescript', function () {
    it('describes how to create classes in typescript', function () {
        var Greeter = (function () {
            function Greeter(message) {
                this.greeting = message;
            }
            Greeter.prototype.greet = function () {
                return "Hello, " + this.greeting;
            };
            return Greeter;
        }());
        var greeter = new Greeter("world");
        expect(greeter.greet()).toBe("Hello, world");
    });
    it("describes how inheritance is done in typescript", function () {
        var Animal = (function () {
            function Animal(theName) {
                this.name = theName;
            }
            Animal.prototype.move = function (distanceInMeters) {
                if (distanceInMeters === void 0) { distanceInMeters = 0; }
                return this.name + " moved " + distanceInMeters + "m.";
            };
            return Animal;
        }());
        var Snake = (function (_super) {
            __extends(Snake, _super);
            function Snake(name) {
                return _super.call(this, name) || this;
            }
            Snake.prototype.move = function (distanceInMeters) {
                if (distanceInMeters === void 0) { distanceInMeters = 5; }
                return _super.prototype.move.call(this, distanceInMeters);
            };
            return Snake;
        }(Animal));
        var Horse = (function (_super) {
            __extends(Horse, _super);
            function Horse(name) {
                return _super.call(this, name) || this;
            }
            Horse.prototype.move = function (distanceInMeters) {
                if (distanceInMeters === void 0) { distanceInMeters = 45; }
                return _super.prototype.move.call(this, distanceInMeters);
            };
            return Horse;
        }(Animal));
        var sam = new Snake("Sammy the Python");
        var tom = new Horse("Tommy the Palomino");
        expect(sam.name).toBe("Sammy the Python");
        expect(sam.move()).toBe("Sammy the Python moved 5m.");
        expect(tom.name).toBe("Tommy the Palomino");
        expect(tom.move()).toBe("Tommy the Palomino moved 45m.");
    });
    it("explains that properties and methods are public by default", function () {
        var Animal = (function () {
            function Animal(theName) {
                this.name = theName;
            }
            Animal.prototype.move = function (distanceInMeters) {
                return this.name + " moved " + distanceInMeters + "m.";
            };
            return Animal;
        }());
        var dog = new Animal('dog');
        expect(dog.move(1)).toBe('dog moved 1m.');
    });
    it('explains how private keyword works', function () {
        var Animal = (function () {
            function Animal(theName) {
                this.name = theName;
            }
            return Animal;
        }());
        var cat = new Animal('cat');
        // cat.name; // Error: 'name' is private
    });
    it('explains how classes of one type could only be assigned by another with the same type', function () {
        var Animal = (function () {
            function Animal(theName) {
                this.name = theName;
            }
            return Animal;
        }());
        var Rhino = (function (_super) {
            __extends(Rhino, _super);
            function Rhino() {
                return _super.call(this, "Rhino") || this;
            }
            return Rhino;
        }(Animal));
        var Employee = (function () {
            function Employee(theName) {
                this.name = theName;
            }
            return Employee;
        }());
        var animal = new Animal("Goat");
        var rhino = new Rhino();
        var employee = new Employee("Bob");
        animal = rhino;
        // animal = employee; // Error: 'Animal' and 'Employee' are not compatible
    });
    it('explains how protected works in typescript', function () {
        var Person = (function () {
            function Person(name) {
                this.name = name;
            }
            return Person;
        }());
        var Employee = (function (_super) {
            __extends(Employee, _super);
            function Employee(name, department) {
                var _this = _super.call(this, name) || this;
                _this.department = department;
                return _this;
            }
            Employee.prototype.getElevatorPitch = function () {
                return "Hello, my name is " + this.name + " and I work in " + this.department;
            };
            return Employee;
        }(Person));
        var howard = new Employee("Howard", "Sales");
        expect(howard.getElevatorPitch()).toBe("Hello, my name is Howard and I work in Sales");
        // expect(howard.name); // error because name is protected
    });
    it('explains how constructors can also be protected', function () {
        var Person = (function () {
            function Person(theName) {
                this.name = theName;
            }
            return Person;
        }());
        var Employee = (function (_super) {
            __extends(Employee, _super);
            function Employee(name, department) {
                var _this = _super.call(this, name) || this;
                _this.department = department;
                return _this;
            }
            Employee.prototype.getElevatorPitch = function () {
                return "Hello, my name is " + this.name + " and I work in " + this.department;
            };
            return Employee;
        }(Person));
        var howard = new Employee("Howard", "Sales");
        // let john = new Person("John"); // not possible because constructor is protected
    });
    it('describes how properties are made readonly', function () {
        var Octopus = (function () {
            function Octopus(theName) {
                this.numberOfLegs = 8;
                this.name = theName;
            }
            return Octopus;
        }());
        var dad = new Octopus("Man with 8 strong legs");
        // dad.name = "Man with three piece suit" //Error: name is read only
    });
    it('describes that readonly parameters can be properties of a class', function () {
        var Octopus = (function () {
            function Octopus(name) {
                this.name = name;
                this.numberOfLegs = 8;
            }
            return Octopus;
        }());
        var octopus = new Octopus("octo");
        expect(octopus.name).toBe("octo");
        expect(octopus.numberOfLegs).toBe(8);
    });
    it('describes how to make accessors in typescript', function () {
        var passcode = "secret passcode";
        var Employee = (function () {
            function Employee() {
            }
            Object.defineProperty(Employee.prototype, "fullName", {
                get: function () {
                    return this._fullName;
                },
                set: function (newName) {
                    if (passcode && passcode == "secret passcode")
                        this._fullName = newName;
                    else
                        throw Error("Error: Unauthorized update of employee!");
                },
                enumerable: true,
                configurable: true
            });
            return Employee;
        }());
        var employee = new Employee();
        employee.fullName = "Bob Smith";
        expect(employee.fullName).toBe("Bob Smith");
    });
    it('can also declare static properties', function () {
        var Grid = (function () {
            function Grid(scale) {
                this.scale = scale;
            }
            Grid.prototype.calculateDistanceFromOrigin = function (point) {
                var xDist = point.x - Grid.origin.x;
                var yDist = point.y - Grid.origin.y;
                var xSquared = Math.pow(xDist, 2);
                var ySquared = Math.pow(yDist, 2);
                return Math.sqrt(xSquared + ySquared) / this.scale;
            };
            Grid.origin = { x: 0, y: 0 };
            return Grid;
        }());
        var grid1 = new Grid(1.0);
        var grid2 = new Grid(5.0);
        var grid1Distance = grid1.calculateDistanceFromOrigin({ x: 10, y: 10 });
        var grid2Distance = grid2.calculateDistanceFromOrigin({ x: 10, y: 10 });
        expect(grid1Distance).toEqual(14.142135623730951);
        expect(grid2Distance).toEqual(2.8284271247461903);
    });
    it('has also support for abstract classes', function () {
        var Department = (function () {
            function Department(name) {
                this.name = name;
            }
            Department.prototype.printName = function () {
                return "Department name: " + this.name;
            };
            return Department;
        }());
        var AccountingDepartment = (function (_super) {
            __extends(AccountingDepartment, _super);
            function AccountingDepartment() {
                return _super.call(this, "Accounting and Auditing") || this;
            }
            AccountingDepartment.prototype.printMeeting = function () {
                return "The Accounting Department meets each Monday at 10am.";
            };
            AccountingDepartment.prototype.generateReports = function () {
                return "Generating accounting reports...";
            };
            return AccountingDepartment;
        }(Department));
        var department;
        // department = new Department(); // not possible because Department is an abstract class
        department = new AccountingDepartment();
        expect(department.name).toBe("Accounting and Auditing");
        // expect(department.generateReports()); // not possible because method was not declared on Department abstract class
    });
    it('describes how constructor functions can be used to instantiate classes', function () {
        var Greeter = (function () {
            function Greeter() {
            }
            Greeter.prototype.greet = function () {
                if (this.greeting)
                    return "Hello, " + this.greeting;
                else
                    return Greeter.standardGreeting;
            };
            Greeter.standardGreeting = "Hello, there";
            return Greeter;
        }());
        var greeter1;
        greeter1 = new Greeter();
        expect(greeter1.greet()).toBe(Greeter.standardGreeting);
        var greeterMaker = Greeter;
        greeterMaker.standardGreeting = "Hey there!";
        var greeter2 = new greeterMaker();
        expect(greeter2.greet()).toBe("Hey there!");
    });
    it('explains how classes can be used as an interface', function () {
        var Point = (function () {
            function Point() {
            }
            return Point;
        }());
        var point3d = { x: 1, y: 2, z: 3 };
        expect(point3d.x).toBe(1);
        expect(point3d.y).toBe(2);
        expect(point3d.z).toBe(3);
    });
});
