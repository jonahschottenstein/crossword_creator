import { getWordObj } from "./words";
import { cellHasLetter } from "./helpers";

export const fetchWordList = async (selectedWordObj) => {
	const wordLength = selectedWordObj?.word.length;
	const resource = `./wordLists/${wordLength}-letter-words.json`;
	const response = await fetch(resource);
	const wordList = await response.json();

	return wordList;
};

const isAMatch = (lettersArray, wordString) =>
	lettersArray.every(
		(letter, index, array) =>
			array[index] === wordString[index] || array[index] === ""
	);

export const getWordMatches = async (selectedWordObj, sameLengthWords) => {
	const selectedWord = selectedWordObj?.word;
	if (!selectedWord) return;
	if (selectedWord.length < 3) return;
	const selectedWordLetters = selectedWord.map((cell) => cell.letter);
	const selectedWordMatches = sameLengthWords.filter((obj) => {
		const testWord = obj.word;
		if (isAMatch(selectedWordLetters, testWord)) return true;
		return false;
	});

	return selectedWordMatches;
};

export const isMatchable = (word) =>
	!word.every(cellHasLetter) && word.some(cellHasLetter);

export const areMatchesLeft = (wordList, currentLength) =>
	wordList.slice(currentLength).length > 0;

export const getFirst100Matches = (wordList) => wordList.slice(0, 100);

export const getNext100Matches = (wordMatches, tableLength) =>
	wordMatches.slice(tableLength, tableLength + 100);

export const getMatchesFromTable = () =>
	document.querySelectorAll(".match-table tbody tr");

export const fillWord = (e, direction, cells, setCells) => {
	if (!e.target.matches(".match-table > tbody tr")) return;

	const letters = e.target.querySelector("td.word-match-td").textContent;
	const { selectedWordObj } = getWordObj(direction, cells);
	const selectedWord = selectedWordObj?.word;

	for (let i = 0; i < selectedWord.length; i++) {
		setCells((prevState) => {
			const newState = prevState.map((cell) => {
				if (cell.index === selectedWord[i].index) {
					return { ...cell, letter: letters[i] };
				} else {
					return cell;
				}
			});

			return newState;
		});
	}
};

/* 
    Could try to make it so it gives an indication that a word would be a good match

    e.g.

    S _ _ _ _
    _ _ _ _ _
    P L A C E
    _ _ _ _ _

    Indicate when each letter of S- word can also make a down word with the letter from PLACE
    i.e., SQUID would not be a good option because there are no matches for Q _ L _ 

    This would probably take a long time. What you should probably do (even if you don't end up doing this) is load the first 500 words, then have a "Show More" button at the bottom of the list that loads the next 500 words

    How to:
        - If looking for matches for [ S _ _ _ _ ]:
            - Use the word list that already appears when you click on a word
            - In chronological order, get all of the first letters of matches for _ _ L _
                - if none of the first letters of matches for _ _ L _ === the second


            - Get all 2nd letters of [ S _ _ _ _ ]

            - For [S _ _ _ _]:
                - get all possibilities for 2nd, 3rd, 4th, 5th letters
            - For [ _ _ L _ ], [ _ _ A _ ], [ _ _ C _ ], [ _ _ E_ ]:
                - get all possibilities for 1st letter
            - Get arrays of all letters that are possibilities for both nth letter of [ S _ _ _ _ ] and 1st letter of nth down word
                - 


        - Can try to solve section
            - Section === whichever word is highlighted and all of the opposite direction words that cross it
*/
