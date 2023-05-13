import { getWordObj, getWords } from "./words";
import { cellHasLetter, getNextDirection } from "./helpers";
import { fetchWordListMemoized } from "./autofillGrid";

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

const getMatchFilterInput = (matchFilterInput) => {
	try {
		const matchRegExp = new RegExp(matchFilterInput, "i");
		return matchRegExp;
	} catch (error) {
		console.log(error);
		return /\w+/;
	}
};

export const getFilteredMatches = (matchFilterInput, matches) => {
	const matchRegExp = getMatchFilterInput(matchFilterInput);
	const filteredMatches = matches.filter(({ word }) => matchRegExp.test(word));

	return filteredMatches;
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
	const getWordList = await fetchWordListMemoized();
	const crossingWordLists = await Promise.all(
		crossingWords.map(async (word, index, array) => {
			const crossingWordList = await getWordList(word);
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
