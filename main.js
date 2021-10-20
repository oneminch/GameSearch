import "./style.css";
import "virtual:windi.css";
import Fuse from "fuse.js";
import Alpine from "alpinejs";

window.Alpine = Alpine;

class Query {
	constructor(name, value) {
		this[name] = value;
	}
}

const createSearchQuery = (query) => {
	let keywords = query.split(" "),
		queryList = [];

	keywords.forEach((keyword) => {
		queryList.push(new Query("title", keyword));
		queryList.push(new Query("short_description", keyword));
	});

	return queryList;
};

Alpine.store("darkMode", {
	on: false,

	toggle() {
		this.on = !this.on;
	},
});

Alpine.directive("src", (el, { expression }, { evaluate }) => {
	el.src = evaluate(expression);
});

Alpine.directive("href", (el, { expression }, { evaluate }) => {
	el.href = evaluate(expression);
});

Alpine.data("app", () => ({
	query: "daunt",
	results: [],
	allGames: [],
	// allGames: [
	// 	{
	// 		id: 1,
	// 		title: "Dauntless",
	// 		thumbnail: "https://www.freetogame.com/g/1/thumbnail.jpg",
	// 		short_description:
	// 			"A free-to-play, co-op action RPG with gameplay similar to Monster Hunter.",
	// 		game_url: "https://www.freetogame.com/open/dauntless",
	// 		genre: "MMORPG",
	// 		platform: "PC (Windows)",
	// 		publisher: "Phoenix Labs",
	// 		developer: "Phoenix Labs, Iron Galaxy",
	// 		release_date: "2019-05-21",
	// 		freetogame_profile_url: "https://www.freetogame.com/dauntless",
	// 	},
	// ],

	fetchGames() {
		const baseURL = "https://www.freetogame.com/api/games";
		const corsProxy = "https://api.allorigins.win/get?url=";

		fetch(`${corsProxy}${encodeURIComponent(baseURL)}`)
			.then((response) => response.json())
			.then((data) => {
				const jsonData = JSON.parse(data.contents);
				this.allGames = jsonData.slice();
			})
			.catch((err) => console.log(err));
	},

	search() {
		if (!this.query.trim()) {
			return;
		}
		const fuse = new Fuse(this.allGames, {
			threshold: 0.3,
			keys: ["title", "short_description"],
		});

		const results = fuse.search({
			$or: createSearchQuery(this.query),
		});

		this.results = results.map((el) => el.item);
		// console.log(JSON.parse(JSON.stringify(this.results)));
	},

	init() {
		this.fetchGames();

		setTimeout(() => {
			this.search();
		}, 2000);
	},
}));

Alpine.start();
