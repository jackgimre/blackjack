import { createContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { calculateHandValue, createDeck } from './blackjack';

export const SettingsContext = createContext();

const GameScreen = () => {
    const [deck, setDeck] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const [howResult, setHowResult] = useState(null);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const newDeck = createDeck();
        setDeck(newDeck);
        // Deal initial hands
        const playerInitialHand = newDeck.slice(0, 2);
        const dealerInitialHand = newDeck.slice(2, 3);
        
        setPlayerHand(playerInitialHand);
        setDealerHand(dealerInitialHand);
        // Remove dealt cards from the deck
        setDeck(newDeck.slice(4));
        if(calculateHandValue(playerInitialHand) === 21) {
            setGameResult("You Won!");
            setHowResult("Blackjack! :)");
        }
    }, []);
  return (
    <View style={styles.container}>
        {gameResult && (
            <View style={styles.overlay}>
                <Text style={styles.overlayTitle}>{gameResult}</Text>
                <Text style={styles.overlayText}>{howResult}</Text>
                <TouchableOpacity style={styles.overlayButton} onPress={() => {
                    setGameResult(null);
                    setHowResult(null);
                    const newDeck = createDeck();
                    setDeck(newDeck);
                    const playerInitialHand = newDeck.slice(0, 2);
                    const dealerInitialHand = newDeck.slice(2, 3);
                    setPlayerHand(playerInitialHand);
                    setDealerHand(dealerInitialHand);
                    setDeck(newDeck.slice(4));
                }}>
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>
            </View>
        )}
        <View style={styles.dealerBox}>
            <View style={styles.dealerHand}>
                <Text style={styles.title}>Dealer's Hand</Text>
                {dealerHand.map((card, index) => (
                    <Text key={index} style={styles.card}>{card.rank} of {card.suit}</Text>
                ))}
                {isDrawing && <Text style={styles.card}>Dealer is drawing...</Text>}
            </View>
            <View style={styles.footer}>
                <Text style={styles.totalValue}>Dealer's Total: {calculateHandValue(dealerHand)}</Text>
            </View>
        </View>
        <View style={styles.playerBox}>
            <View style={styles.playerHand}>
                <Text style={styles.title}>Your Hand</Text>
                {playerHand.map((card, index) => (
                    <Text key={index} style={styles.card}>{card.rank} of {card.suit}</Text>
                ))}
            </View>
            <Text style={styles.totalValue}>Your Total: {calculateHandValue(playerHand)}</Text>
            <View style={styles.playerButtons}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (deck.length > 0) {
                    const newCard = deck[0];
                    const updatedHand = [...playerHand, newCard];
                    setPlayerHand(updatedHand);
                    setDeck(deck.slice(1));

                    const newValue = calculateHandValue(updatedHand);

                    if (newValue > 21) {
                        setGameResult("You Lost!");
                        setHowResult("You exceeded 21");
                    } else if (newValue === 21) {
                        setGameResult("You Won!");
                        setHowResult("Blackjack! :)");
                    }
                    }
                }}
                >
                <Text style={styles.buttonText}>Hit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        let updatedDealerHand = [...dealerHand];
                        let updatedDeck = [...deck];

                        setIsDrawing(true);
                        while (
                        calculateHandValue(updatedDealerHand) < 17 &&
                        updatedDeck.length > 0
                        ) {
                        await sleep(1000);

                        const newCard = updatedDeck.shift();
                        updatedDealerHand.push(newCard);

                        setDealerHand([...updatedDealerHand]);
                        setDeck([...updatedDeck]);
                        }
                        setIsDrawing(false);

                        const dealerValue = calculateHandValue(updatedDealerHand);
                        const playerValue = calculateHandValue(playerHand);

                        if (dealerValue > 21) {
                        setGameResult("You Won!");
                        setHowResult("Dealer exceeded 21");
                        } else if (dealerValue >= playerValue) {
                        setGameResult("You Lost!");
                        setHowResult("Dealer's total is higher or equal");
                        } else {
                        setGameResult("You Won!");
                        setHowResult("Your total is higher than dealer's");
                        }
                    }}>
                    <Text style={styles.buttonText}>Stand</Text>
                    </TouchableOpacity>

            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: "#fff",
  },
  dealerBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    height: 4,
    backgroundColor: '#333',
  },
  playerBox: {
    flex: 1,
    backgroundColor: '#c0c0c0',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  totalValue: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#033d1d",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  playerButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerHand: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
    dealerHand: {
    alignItems: 'center',
  },
  card: {
    fontSize: 16,
    color: '#000',
    marginVertical: 1,
  },

  footer: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 1,
    width: '80%',
    height: '25%',
    borderRadius: 10,
    top: '15%',
    left: '10%',
    padding: '5%',
  },
  overlayText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    marginBottom: 10,
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  overlayButton: {
    backgroundColor: "#033d1d",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   
    marginHorizontal: 20,
  },
});

export default GameScreen;