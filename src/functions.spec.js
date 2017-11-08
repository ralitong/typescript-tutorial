"use strict";
describe('Functions', function () {
    it('should support typed parameters', function () {
        var add = function (x, y) {
            return x + y;
        };
        var myAdd = function (x, y) {
            return x + y;
        };
    });
    it('should support having a return type', function () {
        var myAdd = function (x, y) { return x + y; };
    });
    it('should support to label parameters with a different name', function () {
        var myAdd = function (x, y) { return x + y; };
    });
    it('should be able to infer its return type', function () {
        // myAdd has the full function type
        var myAdd = function (x, y) {
            return x + y;
        };
        // The parameters 'x' and 'y' have the type number
        var yourAdd = function (x, y) { return x + y; };
    });
    it('should support optional parameters', function () {
        function buildName(firstName, lastName) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }
        var result1 = buildName("Bob");
        // let result2 = buildName("Bob", "Adams", "Sr"); // will not work since function has only two paramters
        var result3 = buildName("Bob", "Adams");
        expect(result1).toBe("Bob");
        expect(result3).toBe("Bob Adams");
    });
    it('should be able to specify default values for parameter', function () {
        function buildName(firstName, lastName) {
            if (lastName === void 0) { lastName = "Smith"; }
            return firstName + " " + lastName;
        }
        var result1 = buildName("Bob");
        var result2 = buildName("Bob", undefined);
        // let result3 = buildName("Bob", "Adams", "Sr.") // too many parameters
        var result4 = buildName("Bob", "Adams");
        expect(result1).toBe("Bob Smith");
        expect(result2).toBe("Bob Smith");
        expect(result4).toBe("Bob Adams");
    });
    it('should support variable number of parameters as the variable rest', function () {
        function buildName(firstName) {
            var restOfName = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restOfName[_i - 1] = arguments[_i];
            }
            return firstName + " " + restOfName.join(" ");
        }
        var employeeName = buildName("Joseph", "Samuel", "Lucas", "Mackinzie");
        expect(employeeName).toBe("Joseph Samuel Lucas Mackinzie");
    });
    it('should support rest in specifying the function parameters', function () {
        function buildName(firstName) {
            var restOfName = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restOfName[_i - 1] = arguments[_i];
            }
            return firstName + " " + restOfName.join(" ");
        }
        var buildNameFun = buildName;
    });
    it('should scope the "this" pointer to the whole object even if it is called inside an anonymous function', function () {
        var deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker: function () {
                var _this = this;
                return function () {
                    var pickedCard = Math.floor(Math.random() * 52);
                    var pickedSuit = Math.floor(pickedCard / 13);
                    return {
                        suit: _this.suits[pickedSuit],
                        card: pickedCard % 13
                    };
                };
            }
        };
        var cardPicker = deck.createCardPicker();
        var pickedCard = cardPicker();
        expect(pickedCard.card).not.toBeUndefined();
        expect(pickedCard.suit).not.toBeUndefined();
    });
    it('should be able to use "this" pointer when it is passed as a parameter', function () {
        var deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // NOTE: The function now explicitly specifies that its callee must be of type Deck
            createCardPicker: function () {
                var _this = this;
                return function () {
                    var pickedCard = Math.floor(Math.random() * 52);
                    var pickedSuit = Math.floor(pickedCard / 13);
                    return {
                        suit: _this.suits[pickedSuit],
                        card: pickedCard % 13
                    };
                };
            }
        };
        var cardPicker = deck.createCardPicker();
        var pickedCard = cardPicker();
        expect(pickedCard.card).not.toBeUndefined();
        expect(pickedCard.suit).not.toBeUndefined();
    });
    it('should ignore "this" pointer when "this:void" is passed as a parameter', function () {
        var uiElement = {
            addClickListener: function (onclick) {
            }
        };
        var Handler = (function () {
            function Handler() {
                this.onClickGood = function (e) {
                    // this.info = e.message; // error
                };
            }
            return Handler;
        }());
        var h = new Handler();
        uiElement.addClickListener(h.onClickGood);
    });
    it('should support overloading functions', function () {
        var suits = ["hearts", "spades", "clubs", "diamonds"];
        function pickCard(x) {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x === "object") {
                var pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            else if (typeof (x) === "number") {
                var pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }
        var myDeck = [
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
        ];
        var pickedCard1 = myDeck[pickCard(myDeck)];
        expect(pickedCard1.card).not.toBeUndefined();
        expect(pickedCard1.suit).not.toBeUndefined();
        var pickedCard2 = pickCard(15);
        expect(pickedCard2.card).not.toBeUndefined();
        expect(pickedCard2.suit).not.toBeUndefined();
    });
    it('should support overloading functions but with different parameters', function () {
        var suits = ["hearts", "spades", "clubs", "diamonds"];
        function pickCard(x) {
            // Check to see if we're working with an object/array
            // If so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                var pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            else if (typeof x == "number") {
                var pickedSuit = Math.floor(x / 13);
                return {
                    suit: suits[pickedSuit],
                    card: x % 13
                };
            }
        }
        var myDeck = [{ suit: "diamonds", card: 2 },
            { suit: "spades", card: 10 },
            { suit: "hearts", card: 4 }];
        var pickedCard1 = myDeck[pickCard(myDeck)];
        expect(pickedCard1.card).not.toBeUndefined();
        expect(pickedCard1.suit).not.toBeUndefined();
        var pickedCard2 = pickCard(15);
        expect(pickedCard2.card).not.toBeUndefined();
        expect(pickedCard2.suit).not.toBeUndefined();
    });
});
