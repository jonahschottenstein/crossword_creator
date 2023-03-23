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
