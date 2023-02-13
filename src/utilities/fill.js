import { getWordObj, getWords } from "./words";
import { cellHasLetter, getNextDirection } from "./helpers";

export const fetchWordList = async (word) => {
	const wordLength = word.length;
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

export const getWordMatches = async (word, sameLengthWords) => {
	if (!word) return;
	if (word.length < 3) return;
	const wordLetters = word.map((cell) => cell.letter);
	const wordMatches = sameLengthWords.filter((obj) => {
		const testWord = obj.word;
		if (isAMatch(wordLetters, testWord)) return true;
		return false;
	});

	return wordMatches;
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

export const getCrossObjs = (direction, cells) => {
	const { selectedWordObj } = getWordObj(direction, cells);
	const selectedWord = selectedWordObj?.word;
	const nextDirection = getNextDirection(direction, cells);
	const words = getWords(nextDirection, cells);
	const crossObjs = selectedWord.map((cell) => {
		const crossingWord = words
			.filter((word) => word.find((cell2) => cell2.id === cell.id))
			.flat();
		const cellIndex = crossingWord.findIndex((cell3) => cell3.id === cell.id);

		return { crossingWord, cellIndex };
	});

	return crossObjs;
};

const getCrossingWords = (direction, cells) =>
	getCrossObjs(direction, cells).map((obj) => obj.crossingWord);

const getCrossingWordLists = async (direction, cells) => {
	const crossingWords = getCrossingWords(direction, cells);
	const crossingWordLists = await Promise.all(
		crossingWords.map(async (word, index, array) => {
			const crossingWordList = await fetchWordList(word);
			const crossingWordMatches = await getWordMatches(word, crossingWordList);
			if (crossingWordMatches.length < 1 && array[index].every(cellHasLetter)) {
				return [
					{
						word: array[index].map((cell) => cell.letter).join(""),
						score: "100",
					},
				];
			}

			return crossingWordMatches;
		})
	);

	return crossingWordLists;
};

const getCrossOptionsLists = async (direction, cells) => {
	const crossingWordLists = await getCrossingWordLists(direction, cells);
	const crossOptionsLists = crossingWordLists.map((list, index) => {
		const cellIdx = getCrossObjs(direction, cells)[index]["cellIndex"];
		const letterList = list.map((obj) => obj.word[cellIdx]);

		return [...new Set(letterList)];
	});

	return crossOptionsLists;
};

const getCurrentOptionsLists = (currentWordList, direction, cells) => {
	const { selectedWordObj } = getWordObj(direction, cells);
	const currentOptionsLists = [];

	for (let i = 0; i < selectedWordObj?.word.length; i++) {
		const currentLetterList = currentWordList.map(({ word }) => word[i]);
		currentOptionsLists.push([...new Set(currentLetterList)]);
	}

	return currentOptionsLists;
};

const getMutualOptions = async (currentWordList, direction, cells) => {
	const { selectedWordObj } = getWordObj(direction, cells);
	const crossOptionsLists = await getCrossOptionsLists(direction, cells);
	const currentOptionsLists = getCurrentOptionsLists(
		currentWordList,
		direction,
		cells
	);
	const mutualOptions = [];

	for (let i = 0; i < selectedWordObj?.word.length; i++) {
		mutualOptions.push(
			currentOptionsLists[i].filter((letter) =>
				crossOptionsLists[i].includes(letter)
			)
		);
	}

	return mutualOptions;
};

const getMatchRegExp = async (currentWordList, direction, cells) => {
	const mutualOptions = await getMutualOptions(
		currentWordList,
		direction,
		cells
	);
	const formattedOptions = mutualOptions
		.map((list) => list.join(""))
		.map((letterBlock) => "[".concat(letterBlock, "]"))
		.join("");
	const matchRegExp = new RegExp(`${formattedOptions}`);

	return matchRegExp;
};

export const getTopMatches = async (currentWordList, direction, cells) => {
	const matchRegExp = await getMatchRegExp(currentWordList, direction, cells);
	const topMatches = currentWordList.filter((obj) =>
		matchRegExp.test(obj.word)
	);

	return topMatches;
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
