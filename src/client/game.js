import pkg from 'boardgame.io/dist/cjs/core.js';
console.log(pkg);  // Log the imported object to see if Deck is available
const { Deck } = pkg;

// Here we are recreating the game Monopoly but using the boardgame.io package
const board = [
    { name: 'Go', type: 'start' },
    { name: 'Mediterranean Avenue', type: 'property', price: 60, rent: 2, owner: null },
    { name: 'Community Chest', type: 'community-chest' },
    { name: 'Baltic Avenue', type: 'property', price: 60, rent: 4, owner: null },
    { name: 'Income Tax', type: 'income-tax' },
    { name: 'Reading Railroad', type: 'property', price: 200, rent: 25, owner: null },
    { name: 'Oriental Avenue', type: 'property', price: 100, rent: 6, owner: null },
    { name: 'Chance', type: 'chance' },
    { name: 'Vermont Avenue', type: 'property', price: 100, rent: 6, owner: null },
    { name: 'Connecticut Avenue', type: 'property', price: 120, rent: 8, owner: null },
    { name: 'Jail', type: 'jail' },
    { name: 'St. Charles Place', type: 'property', price: 140, rent: 10, owner: null },
    { name: 'Electric Company', type: 'utility', price: 150, owner: null },
    { name: 'States Avenue', type: 'property', price: 140, rent: 10, owner: null },
    { name: 'Virginia Avenue', type: 'property', price: 160, rent: 12, owner: null },
    { name: 'Pennsylvania Railroad', type: 'property', price: 200, rent: 25, owner: null },
    { name: 'St. James Place', type: 'property', price: 180, rent: 14, owner: null },
    { name: 'Community Chest', type: 'community-chest' },
    { name: 'Tennessee Avenue', type: 'property', price: 180, rent: 14, owner: null },
    { name: 'New York Avenue', type: 'property', price: 200, rent: 16, owner: null },
    { name: 'Free Parking', type: 'free-parking' },
    { name: 'Kentucky Avenue', type: 'property', price: 220, rent: 18, owner: null },
    { name: 'Chance', type: 'chance' },
    { name: 'Indiana Avenue', type: 'property', price: 220, rent: 18, owner: null },
    { name: 'Illinois Avenue', type: 'property', price: 240, rent: 20, owner: null },
    { name: 'B. & O. Railroad', type: 'property', price: 200, rent: 25, owner: null },
    { name: 'Atlantic Avenue', type: 'property', price: 260, rent: 22, owner: null },
    { name: 'Ventnor Avenue', type: 'property', price: 260, rent: 22, owner: null },
    { name: 'Water Works', type: 'utility', price: 150, owner: null },
    { name: 'Marvin Gardens', type: 'property', price: 280, rent: 24, owner: null },
    { name: 'Go To Jail', type: 'go-to-jail' },
    { name: 'Pacific Avenue', type: 'property', price: 300, rent: 26, owner: null },
    { name: 'North Carolina Avenue', type: 'property', price: 300, rent: 26, owner: null },
    { name: 'Community Chest', type: 'community-chest' },
    { name: 'Pennsylvania Avenue', type: 'property', price: 320, rent: 28, owner: null },
    { name: 'Short Line Railroad', type: 'property', price: 200, rent: 25, owner: null },
    { name: 'Chance', type: 'chance' },
    { name: 'Park Place', type: 'property', price: 350, rent: 35, owner: null },
    { name: 'Luxury Tax', type: 'luxury-tax' },
    { name: 'Boardwalk', type: 'property', price: 400, rent: 50, owner: null },
  ];

// Define the chance and community chest decks
const chanceDeck = Deck([{ type: 'chance', text: 'Advance to Go' }, /* Add more cards as needed */]);
const communityChestDeck = Deck([{ type: 'community-chest', text: 'Bank error in your favor. Collect $200.' }, /* Add more cards as needed */]);

const MortgageBacked = Game({
  setup: (ctx) => ({
    board: [], // Define your MB board here
    players: {
      0: { position: 0, money: 1500, properties: [] },
      1: { position: 0, money: 1500, properties: [] },
      2: { position: 0, money: 1500, properties: [] },
      3: { position: 0, money: 1500, properties: [] },
      // Add more players as needed
    },
    currentPlayer: 0, // Initialize with player 0
    chanceCards: chanceDeck.shuffle(),
    communityChestCards: communityChestDeck.shuffle(),
    // Add other game variables like chance cards, community chest, etc.
  }),

  moves: {
    // Player rolls the dice and moves their token
    rollDice: (G, ctx) => {
      // Check if it's the current player's turn
      if (ctx.currentPlayer !== G.currentPlayer) {
        return;
      }

      // Simulate rolling two dice (each with values from 1 to 6)
      const die1 = D6();
      const die2 = D6();
      const totalRoll = die1 + die2;

      // Update the player's position
      G.players[G.currentPlayer].position += totalRoll;

      // Handle passing Go and earning $200
      if (G.players[G.currentPlayer].position >= G.board.length) {
        G.players[G.currentPlayer].position -= G.board.length;
        G.players[G.currentPlayer].money += 200;
      }

      // Implement logic for actions based on the space they land on
      const currentSpace = G.board[G.players[G.currentPlayer].position];
      switch (currentSpace.type) {
        case 'property':
          // Implement logic for buying or paying rent on a property
          break;
        case 'chance':
          // Draw a chance card and perform the action
          const chanceCard = G.chanceCards.draw();
          switch (chanceCard.type) {
            case 'advance-to-go':
              G.players[G.currentPlayer].position = 0;
              G.players[G.currentPlayer].money += 200;
              break;
            // Add more chance card actions as needed
          }
          G.chanceCards.discard(chanceCard);
          break;
        case 'community-chest':
          // Draw a community chest card and perform the action
          const communityChestCard = G.communityChestCards.draw();
          switch (communityChestCard.type) {
            case 'bank-error':
              G.players[G.currentPlayer].money += 200;
              break;
            // Add more community chest card actions as needed
          }
          G.communityChestCards.discard(communityChestCard);
          break;
        // Add more space types and their logic as needed
      }

      // End the player's turn
      ctx.events.endTurn();
    },

    // Player buys a property
    buyProperty: (G, ctx, propertyIndex) => {
      const currentPlayer = { ...G.players[G.currentPlayer] };
      const property = { ...G.board[propertyIndex] };

      // Check if the property is available for purchase
      if (property.owner !== null) {
        return;
      }

      // Check if the player has enough money to buy the property
      if (currentPlayer.money < property.price) {
        return;
      }

      // Deduct the property price from the player's money and set the property owner
      currentPlayer.money -= property.price;
      property.owner = G.currentPlayer;
      currentPlayer.properties.push(propertyIndex);

      // End the player's turn
      ctx.events.endTurn();
      G.players[G.currentPlayer] = currentPlayer;
      G.board[propertyIndex] = property;
    },

    // Player ends their turn
    endTurn: (G, ctx) => {
      // End the player's turn
      ctx.events.endTurn();
    },

    // Add other game moves here
  },

  endIf: (G, ctx) => {
    // Check if the players object is defined
    if (!G.players) {
      return;
    }

    // Check if any player has negative money
    const bankruptPlayers = Object.values(G.players).filter((p) => p.money < 0);

    // If there are any bankrupt players, end the game
    if (bankruptPlayers.length > 0) {
      return { winner: getWinner(G.players) };
    }

    // Check if any player has reached the maximum number of properties
    const maxPropertiesPlayers = Object.values(G.players).filter((p) => p.properties.length === MAX_PROPERTIES);

    // If there are any players with the maximum number of properties, end the game
    if (maxPropertiesPlayers.length > 0) {
      return { winner: getWinner(G.players) };
    }

    // Check if any player has reached the maximum number of houses
    const maxHousesPlayers = Object.values(G.players).filter((p) => {
      return p.properties.some((property) => property.houses === MAX_HOUSES);
    });

    // If there are any players with the maximum number of houses, end the game
    if (maxHousesPlayers.length > 0) {
      return { winner: getWinner(G.players) };
    }
  },
});

export default MortgageBacked;