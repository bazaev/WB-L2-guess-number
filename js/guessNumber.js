import GuessNumberEngine from "./guessNumber.class.js";
import $ from "./elements.js";

class GuessNumber extends GuessNumberEngine {
	constructor() {
		super();
		this.#attachEvents();
		this.#startButtonHandler();
	}

	#attachEvents() {
		$.startButton.addEventListener("click", this.#startButtonHandler.bind(this));
		$.guess.addEventListener("click", this.#guessHandler.bind(this));
		$.reset.addEventListener("click", this.#resetHandler.bind(this));
		$.startInput.addEventListener("blur", this.#startInputBlurHandler.bind(this));
		$.endInput.addEventListener("blur", this.#endInputBlurHandler.bind(this));
		window.addEventListener("keypress", this.#keyPressHandler.bind(this))
	}

	#startButtonHandler () {
		const min = parseInt($.startInput.value);
		const max = parseInt($.endInput.value);
		this.start(min, max);

		$.guessInput.setAttribute("placeholder", `${min} - ${max}`);
		$.guessInput.focus();
		$.guessNumber.classList.add("play");
	}
	
	#resetHandler () {
		this.reset();

		$.startInput.focus();
		$.guessNumber.classList.remove("play");

		setTimeout(()=>{
			$.guessInput.disabled = false;
			$.guess.disabled = false;
			$.guessInput.value = "";
			$.counterValue.textContent = 0;
			$.message.innerText = "";
		}, 300)
	}
	
	#guessHandler () {
		const num = parseInt($.guessInput.value);
	
		if (isNaN(num)) {
			$.guessInput.focus();
			return;
		}
		
		const {
			counter,
			number,
			status
		} = this.guess(num);

		const messages = [];
	
		$.counterValue.textContent = counter;

		switch(status) {
			case "win":
				messages.push("Поздравляю, вы угадали!");
				$.guessInput.disabled = true;
				$.guess.disabled = true;
			break;
			case "outOfRange":
				messages.push("Ответ вне диапозона загаданного числа!");
			break;
			case "less":
				messages.push("Загаданное число меньше");
			break;
			case "more":
				messages.push("Загаданное число больше");
			break;
		}

		if (counter % 3 === 0) {
			messages.push(number % 2 === 0 ? "Загадано четное число" : "Загадано нечетное число");
		}
	
		if (number !== num) {
			$.guessInput.value = "";
			$.guessInput.focus();
		}
	
		$.message.innerText = messages.join("\n");
	}
	
	#startInputBlurHandler ({ target }) {
		const value = parseInt(target.value);
		$.endInput.min = value;

		if ($.endInput.value < value) {
			$.endInput.value = value;
		}
	}
	
	#endInputBlurHandler ({ target }) {
		const value = parseInt(target.value);
		$.startInput.max = value;
		
		if ($.startInput.value > value) {
			$.startInput.value = value;
		}
	}
	
	#keyPressHandler ({ key }) {
		if (!$.guessInput.disabled && key === "Enter") {
			this.#guessHandler();
		}
	}
}

export default GuessNumber;