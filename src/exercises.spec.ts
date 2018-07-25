describe("Exercises", () => {
    it(`construct a 5 line sentence using backtick, 1 point`, () => {

    });

    it(`construct a sentence using backtick and a variable inside 1 point`, () => {
        let name = "name";
        // expect(sentence).toBe("My name is " + name);
    });

    it(`implement interfaces using shapes, uncomment and make the test pass, 2 points`, () => {

        // let circle: Shape = new Circle(2);
        // let square: Shape = new Square(2);
        // let triangle: Shape = new triangle(2, 4);
        // let cylinder: Shape = new Cylinder(2,2)


        // expect(circle.area()).toBe(12.57);
        // expect(square.area()).toBe(4);
        // expect(triangle.area()).toBe(4);
        // expect(cylinder.area()).toBe(50.27);
    });

    it('create an enum of planets, uncomment and make the test pass, 1 point', () => {

        // expect(Planet.MERCURY.toString()).toBe("mercury");
        // expect(Planet.VENUS.toString()).toBe("venus");
        // expect(Planet.EARTH.toString()).toBe("earth");
        // expect(Planet.MARS.toString()).toBe("mars");
        // expect(Planet.JUPITER.toString()).toBe("jupiter");
        // expect(Planet.SATURN.toString()).toBe("saturn");
        // expect(Planet.URANUS.toString()).toBe("uranus");
        // expect(Planet.NEPTUNE.toString()).toBe("neptune");
        // expect(Planet.PLUTO.toString()).toBe("pluto");
    });

    it('create a person object with optional parameters, uncomment and make the test pass, 2 points', () => {
        //  let person = new Person();

        // expect(person.firstname).toBe("Jane");
        // expect(person.lastname).toBe("Doe");

        // person = new Person(undefined, "Lastname");
        // expect(person.firstname).toBe("Jane");
        // expect(person.lastname).toBe("Lastname");

        // person = new Person("Harry", "Potter");
        // expect(person.firstname).toBe("Harry");
        // expect(person.lastname).toBe("Potter");
    });

    it('create a broadcaster and listener objects, uncomment and make the test pass, 2 points', () => {

        // let broadcaster : BroadCaster = new BroadCaster();
        // let listenerA  : Listener = new Listener();
        // let listenerB : Listener = new Listener();
        // let listenerC : Listener = new Listener();

        // broadcaster.addSubscriber(listenerA);
        // broadcaster.addSubscriber(listenerB);
        // broadcaster.addSubscribe(listenerC);

        // broadcaster.broadcast('Lemons');
        // expect(listenerA.getBroadcasted()).toBe('Lemons');
        // expect(listenerB.getBroadcasted()).toBe('Lemons');
        // expect(listenerC.getBroadcasted()).toBe('Lemons');

        // broadcaster.broadcast('Peaches');
        // expect(listenerA.getBroadcasted()).toBe('Peaches');
        // expect(listenerB.getBroadcasted()).toBe('Peaches');
        // expect(listenerC.getBroadcasted()).toBe('Peaches');
    });

    it('deconstruct an array with first and second and the rest the elements as rest, 1 point', () => {
        // expect(first).toBe('Red');
        // expect(second).toBe('Blue');
        // expect(rest).toEqual(['Yellow','Orange','Green']);
    });

    it('create a generic stack, uncomment and make the test pass, 2 points', () => {
        //  let stack = new Stack<string>();

        // stack.push("a");
        // stack.push("b");
        // stack.push("c");
        // expect(stack.pop()).toBe("c");
        // expect(stack.peek()).toBe("b");
        // expect(stack.pop()).toBe("b");
        // expect(stack.pop()).toBe("a");
        // expect(stack.pop()).toBe(undefined);
    });








})