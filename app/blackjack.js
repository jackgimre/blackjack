

export const suits = ['♠', '♥', '♦', '♣'];
export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck(deckCount) {
  let deck = [];
  for(let i=0;i<deckCount;i++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank });
      }
    }
  }
  
  deck = shuffleDeck(deck); 
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.rank === 'A') {
      aces += 1;
      value += 11; // Initially count Aces as 11
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
      value += 10; // Face cards are worth 10
    } else {
      value += parseInt(card.rank, 10); // Numeric cards are worth their value
    }
  }

  // Adjust for Aces if value exceeds 21
  while (value > 21 && aces > 0) {
    value -= 10; // Count Ace as 1 instead of 11
    aces -= 1;
  }
  return value;
}

export function getCardValue(card) {
  const rank = card.rank; // assuming your cards are like { suit: '♠', rank: 'A' }

  if (['2', '3', '4', '5', '6'].includes(rank)) {
    return 1;
  } else if (['10', 'J', 'Q', 'K', 'A'].includes(rank)) {
    return -1;
  } else {
    return 0;
  }
}