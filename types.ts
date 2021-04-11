export interface PackageGroup {
	name: string;
	title: string;
	description: string;
	selection_text: string;
	save_text: string;
	display_type: number;
	is_recurring_subscription: string;
	subs: [
		{
			packageid: number;
			percent_savings_text: string;
			percent_savings: number;
			option_text: string;
			option_description: string;
			can_get_free_license: string;
			is_free_license: boolean;
			price_in_cents_with_discount: number;
		}
	];
}

export interface GameDetail {
	type: string;
	name: string;
	steam_appid: number;
	required_age: number;
	is_free: false;
	controller_support: string;
	dlc: number[];
	detailed_description: string;
	about_the_game: string;
	short_description: string;
	supported_languages: string;
	reviews: string;
	header_image: string;
	website: string;
	pc_requirements: {
		minimum: string;
	};
	mac_requirements: {
		minimum: string;
	};
	linux_requirements: {
		minimum: string;
		recommended: string;
	};
	legal_notice: string;
	developers: string[];
	publishers: string[];
	price_overview: {
		currency: string;
		initial: number;
		final: number;
		discount_percent: number;
		initial_formatted: string;
		final_formatted: string;
	};
	packages: number[];
	package_groups: PackageGroup[];
	platforms: { windows: true; mac: true; linux: true };
	categories: Array<{ id: number; description: string }>;
	genres: Array<{ id: string; description: string }>;
	screenshots: Array<{
		id: number;
		path_thumbnail: string;
		path_full: string;
	}>;
	movies: [
		Array<{
			id: number;
			name: string;
			thumbnail: string;
			webm: {
				'480': string;
				max: string;
			};
			mp4: {
				'480': string;
				max: string;
			};
			highlight: true;
		}>
	];
	recommendations: { total: number };
	achievements: {
		total: number;
		highlighted: Array<{
			name: string;
			path: string;
		}>;
	};
	release_date: { coming_soon: boolean; date: string };
	support_info: {
		url: string;
		email: string;
	};
	background: string;
	content_descriptors: { ids: []; notes: null };
}

export type GameDescriptor = {
	gameId: number;
	subGameId?: number;
};

export type WinnerResponse = {
	winner: null | GameDescriptor;
};

export type MyVoteResponse = {
	vote: null | GameDescriptor;
	time?: number;
};
