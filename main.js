import "./style.css";
import "virtual:windi.css";
import Alpine from "alpinejs";
import axios from "axios";

window.Alpine = Alpine;

Alpine.store("results", []);

Alpine.store("darkMode", {
	on: false,

	toggle() {
		this.on = !this.on;
	},
});

Alpine.data("app", () => ({
	query: "recursion blake",
	results: [],

	search() {
		// Make the search here with axios
		// Use GraphQL to make efficient queries
		// Push structured results to array
		// Display them nicely with help from Windi CSS
		let appData = this;

		axios
			.get(`http://openlibrary.org/search.json?q=${this.query}`)
			.then((response) => {
				// handle success

				this.results = response.data.docs.slice();
			})
			.catch((error) => {
				// handle error
				console.log(error);
			})
			.then(() => {
				// always executed
				// for (let key in this.results) alert(key);
			});
	},
}));

Alpine.start();
