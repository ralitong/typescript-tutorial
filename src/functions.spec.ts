describe('Functions', () => {
    it('should support typed parameters', () => {
        let add = (x: number, y: number) : number => {
            return x + y;
        }

        let myAdd = (x: number, y: number): number => {
            return x + y;
        }
    });

    it('should support having a return type', () => {
        let myAdd: (x: number, y: number) => number =
            function (x: number, y: number): number { return x + y; };
    });

    it('should support to label parameters with a different name', () => {
        let myAdd: (baseValue: number, increment: number) => number =
            function (x: number, y: number): number { return x + y };

            
    });

    it('should be able to infer its return type', () => {
        // myAdd has the full function type
        let myAdd = function (x: number, y: number): number {
            return x + y;
        }

        // The parameters 'x' and 'y' have the type number
        let yourAdd: (baseValue: number, increment: number) => number =
            function (x, y) { return x + y };
    });

    it('should support optional parameters', () => {
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

    it('should be able to specify default values for parameter', () => {
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

    it('should support variable number of parameters as the variable rest', () => {
        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + " " + restOfName.join(" ");
        }

        let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mackinzie");
        expect(employeeName).toBe("Joseph Samuel Lucas Mackinzie");
    });

    it('should support rest in specifying the function parameters', () => {
        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + " " + restOfName.join(" ");
        }

        let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
    });

    it('should scope the "this" pointer to the whole object even if it is called inside an anonymous function', () => {
        let deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker: function () {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return {
                        suit: this.suits[pickedSuit],
                        card: pickedCard % 13
                    };
                }
            }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        expect(pickedCard.card).not.toBeUndefined();
        expect(pickedCard.suit).not.toBeUndefined();
    });


    it('should be able to use "this" pointer when it is passed as a parameter', () => {
        interface Card {
            suit: string,
            card: number
        }

        interface Deck {
            suits: string[],
            cards: number[],
            createCardPicker(this: Deck): () => Card;
        }

        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // NOTE: The function now explicitly specifies that its callee must be of type Deck
            createCardPicker: function (this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return {
                        suit: this.suits[pickedSuit],
                        card: pickedCard % 13
                    }
                }
            }
        }
        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        expect(pickedCard.card).not.toBeUndefined();
        expect(pickedCard.suit).not.toBeUndefined();
    });

    it('should ignore "this" pointer when "this:void" is passed as a parameter', () => {
        interface UIElement {
            addClickListener(onclick: (this: void, e: Event) => void): void;
        }
        let uiElement: UIElement = {
            addClickListener: function (onclick: (this: void, e: Event) => void): void {

            }
        }

        class Handler {
            info: string;
            onClickGood = (e: Event) => {
                // this.info = e.message; // error
            }
        }
        let h = new Handler();
        uiElement.addClickListener(h.onClickGood)
    });

    it('should support overloading functions', () => {
        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: any): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card

            if (typeof x === "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof (x) === "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 }
            }
        }

        let myDeck = [
            {
                suit: "diamonds",
                card: 2
            },
            {
                suit: "spades",
                card: 10
            },
            {
                suit: "hearts",
                card: 4
            }
        ]

        let pickedCard1 = myDeck[pickCard(myDeck)];
        expect(pickedCard1.card).not.toBeUndefined();
        expect(pickedCard1.suit).not.toBeUndefined();

        let pickedCard2 = pickCard(15);
        expect(pickedCard2.card).not.toBeUndefined();
        expect(pickedCard2.suit).not.toBeUndefined();
    });

    it('should support overloading functions but with different parameters', () => {
        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: { suit: string, card: number }[]): number;
        function pickCard(x: number): { suit: string; card: number; };
        function pickCard(x: any): any {
            // Check to see if we're working with an object/array
            // If so, they gave us the deck and we'll pick the card

            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return {
                    suit: suits[pickedSuit],
                    card: x % 13
                }
            }
        }
        let myDeck = [{ suit: "diamonds", card: 2 },
        { suit: "spades", card: 10 },
        { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];

        expect(pickedCard1.card).not.toBeUndefined();
        expect(pickedCard1.suit).not.toBeUndefined();

        let pickedCard2 = pickCard(15);

        expect(pickedCard2.card).not.toBeUndefined();
        expect(pickedCard2.suit).not.toBeUndefined();
    });


})