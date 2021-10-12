import "./style.css";
import "virtual:windi.css";
import Alpine from "alpinejs";
import axios from "axios";

window.Alpine = Alpine;

const fetchGames = () => {
	axios
		.get("https://cors.bridged.cc/https://www.freetogame.com/api/games")
		.then((response) => {
			this.allGames = response.data.slice();
		})
		.catch((error) => {
			console.log(error);
		});
};

Alpine.store("darkMode", {
	on: false,

	toggle() {
		this.on = !this.on;
	},
});

Alpine.directive("href", (el, { expression }, { evaluate }) => {
	el.href = `https://openlibrary.org${evaluate(expression)}`;
});

Alpine.data("app", () => ({
	query: "fishing",
	results: [],
	allGames: [],

	search() {
		// Write search algo here
		this.allGames;
	},
	init() {
		fetchGames();
	},
}));

Alpine.start();
