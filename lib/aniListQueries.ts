export const PopularAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort : POPULARITY_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					color
					medium
        			large
        			extraLarge
				}
				description
				episodes
				genres
				type
				seasonYear
				season
				averageScore
				popularity
				source
				
				
			}
		}
	}
`;

export const TrendingAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :TRENDING_DESC, type : ANIME){
				id
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					color
					medium
        			large
        			extraLarge
				}
				description
				episodes
				genres
				type
				seasonYear
				season
				averageScore
				popularity
				source
				
			}
		}
	}
`;

export const top100AnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :SCORE_DESC, type : ANIME){
				id
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					color
					medium
        			large
        			extraLarge
				}
				description
				episodes
				genres
				type
				seasonYear
				season
				averageScore
				popularity
				source

				
			}
		}
	}
`;

export const favouritesAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort: FAVOURITES_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					color
					medium
        			large
        			extraLarge
					
				}
				description
				episodes
				genres
				type
				seasonYear
				season
				averageScore
				popularity
				source
			}
		}
	}
`;

export const animeReviewsQuery = `
	query($perPage:Int,$page:Int,$type:MediaType){
		Page(page: $page, perPage: $perPage){
			pageInfo{
			total
			perPage
			currentPage
			lastPage
			hasNextPage
			}
			reviews(sort:ID_DESC,mediaType:$type){
				id
				summary
				body
				media{
					title {
						romaji
						english
						native
						userPreferred
					}
					coverImage{
						medium
						large
						extraLarge
					}
					bannerImage
				}
			
			}
		}
	}
	
`;
export const searchAnimeQuery = `
		query ($search: String) {
			Media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
			id
			idMal
			title {
				english
				native
				romaji
				userPreferred
			}
			tags {
				id
				name
				rank
				category
				description
				isAdult
			}
			favourites
			synonyms
			countryOfOrigin
			isLicensed
			isAdult
			externalLinks {
				url
				site
				icon
				color
				type
				language
			}
			coverImage {
				extraLarge
				large
				color
			}
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
			bannerImage
			season
			seasonYear
			description
			type
			format
			status(version: 2)
			episodes
			duration
			chapters
			volumes
			trailer {
				id
				site
				thumbnail
			}
			genres
			source
			averageScore
			popularity
			meanScore
			nextAiringEpisode {
				airingAt
				timeUntilAiring
				episode
			}
			characters(sort: ROLE) {
				edges {
				role
				node {
					id
					name {
					first
					middle
					last
					full
					native
					userPreferred
					}
					image {
					large
					medium
					}
				}
				voiceActors(sort: LANGUAGE) {
					id
					languageV2
					name {
					first
					middle
					last
					full
					native
					userPreferred
					}
					image {
					large
					medium
					}
				}
				}
			}
			recommendations {
				edges {
				node {
					id
					mediaRecommendation {
					id
					idMal
					title {
						romaji
						english
						native
						userPreferred
					}
					status
					episodes
					coverImage {
						extraLarge
						large
						medium
						color
					}
					bannerImage
					format
					chapters
					meanScore
					nextAiringEpisode {
						episode
						timeUntilAiring
						airingAt
					}
					}
				}
				}
			}
			relations {
				edges {
				id
				relationType
				node {
					id
					idMal
					status
					coverImage {
					extraLarge
					large
					medium
					color
					}
					type
					bannerImage
					title {
					romaji
					english
					native
					userPreferred
					}
					episodes
					chapters
					format
					nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
					}
					meanScore
				}
				}
			}
			studios{
				edges {
				isMain
				node {
					id
					name
				}
				}
			}
			staff{
				edges {
				  id
				  node {
					id
					name {
					  first
					  middle
					  last
					  full
					  native
					  userPreferred
					}
					image {
					  large
					  medium
					}
				  }
				  role
				}
			}
			streamingEpisodes{
				title
				thumbnail
				url
				site
			  }
			}
		}`;

export const releaseingAnimeQuery = `
		query Media($status: MediaStatus) {
		Page {
			media(status: $status) {
			title {
				english
				romaji
				native
				userPreferred
			}
			coverImage {
				color
				extraLarge
				large
				medium
			}
			status
			genres
			nextAiringEpisode {
				timeUntilAiring
				airingAt
				episode
			}
			description
			}
		}
	}
`;
