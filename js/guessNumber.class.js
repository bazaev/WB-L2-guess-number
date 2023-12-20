import range from "./range.js";

class GuessNumber {

	#counter = 0;
	#number;
	#min = 1;
	#max = 100;

	constructor() {
		
	}

	start (min, max) {
		// Задаём диапазон чисел
		this.#min = min;
		this.#max = max;
		// Генерируем случайное число в диапазоне
		this.#number = range(this.#min, this.#max);
	}
	
	reset () {
		// Сбрасываем счетчик
		return this.#counter = 0;
	}
	
	guess (number) {
		let status;
	
		// Получаем текущий статус игры
		if (number < this.#min || number > this.#max) {
			status = "outOfRange"
		}else if (this.#number === number) {
			status = "win";
		}else{
			if (number > this.#number) {
				status = "less";
			} else {
				status = "more";
			}
		}

		// Возвращаем
		return {
			counter: ++this.#counter,
			number: this.#number,
			status
		}
	}
}

export default GuessNumber;