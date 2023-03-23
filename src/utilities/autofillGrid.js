const cache = {};
const fetchWordListMemoized = async () => {
	return async (word) => {
		const wordLength = word.length;
		if (wordLength in cache) {
			return cache[wordLength];
		} else {
			const resource = `./wordLists/${wordLength}-letter-words.json`;
			const response = await fetch(resource);
			const wordList = await response.json();
			cache[wordLength] = wordList;

			return wordList;
		}
	};
};

const isAMatch = (lettersArray, wordString) =>
	lettersArray.every(
		(letter, index, array) =>
			array[index] === wordString[index] || array[index] === ""
	);

const getWordMatches = (word, sameLengthWords) => {
	if (!word) return;
	if (word.length < 3) return;
	const wordLetters = word.map((cell) => cell.letter);
	const wordMatches = sameLengthWords.filter((obj) => {
		const testWord = obj.word;
		if (isAMatch(wordLetters, testWord) && !/\d+/.test(testWord)) return true;
		return false;
	});

	return wordMatches;
};

const getWordsWithMatches = async (words) => {
	const getWordList = await fetchWordListMemoized();
	const wordsWithMatches = await Promise.all(
		words.map(async (word, index, array) => {
			const wordList = await getWordList(word);
			const wordMatches = getWordMatches(word, wordList);
			if (wordMatches.length < 1 && array[index].every(cellHasLetter)) {
				const wordMatches = [
					{
						word: array[index].map((cell) => cell.letter).join(""),
						score: "101",
					},
				];

				return { wordCells: word, wordMatches };
			} else {
				return { wordCells: word, wordMatches };
			}
		})
	);

	return wordsWithMatches;
};
