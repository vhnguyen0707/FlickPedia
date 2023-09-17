import User from "../src/models/User";
import Review from "../src/models/Review";
import Favorite from "../src/models/Favorite";

const testUser =  {
    username: 'johndoe123',
    displayName: 'John Doe',
    password: 'password'
}

const testReview = {
    //user to be added
    mediaId: '635910', 
    mediaTitle: 'The Last Voyage of the Demeter',
    mediaPoster: '/nrtbv6Cew7qC7k9GsYSf5uSmuKh.jpg',
    mediaType: 'movie'
}   

const testFavorite = {
    //user to be added
    mediaType: 'movie',
    mediaId: '12477',
    mediaTitle: 'Grave of the Fireflies',
    mediaPoster: '/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg',
    mediaRate: 8.454
}

const usersInDb = async () =>{
    const users  = await User.find({});
    return users;
}

const reviewsInDb = async () => {
    const reviews = await Review.find({});
    return reviews;
}

const favoritesInDb = async () => {
    const favorites = await Favorite.find({});
    return favorites;
}

//mock result from 3rd party api
const mockResolvedValue = {
        "page": 1,
        "results": [
          {
            "backdrop_path": "/m0bV3qBiJBBlpFaaKjwHo13MVjm.jpg",
            "first_air_date": "2005-01-03",
            "genre_ids": [
              35,
              10767
            ],
            "id": 14981,
            "name": "The Late Late Show with Craig Ferguson",
            "origin_country": [
              "US"
            ],
            "original_language": "en",
            "original_name": "The Late Late Show with Craig Ferguson",
            "overview": "The Late Late Show with Craig Ferguson is an American late-night talk show hosted by Scottish American comedian Craig Ferguson, who is the third regular host of the Late Late Show franchise. It follows Late Show with David Letterman in the CBS late-night lineup, airing weekdays in the US at 12:37 a.m. It is taped in front of a live studio audience from Monday to Friday at CBS Television City in Los Angeles, California, directly above the Bob Barker Studio. It is produced by David Letterman's production company Worldwide Pants Incorporated and CBS Television Studios.\n\nSince becoming host on January 3, 2005, after Craig Kilborn and Tom Snyder, Ferguson has achieved the highest ratings since the show's inception in 1995. While the majority of the episodes focus on comedy, Ferguson has also addressed difficult subject matter, such as the deaths of his parents, and undertaken serious interviews, such as one with Desmond Tutu, which earned the show a 2009 Peabody Award.",
            "popularity": 4863.179,
            "poster_path": "/gGC7zSDgG0FY0MbM1pjfhTCWQBI.jpg",
            "vote_average": 7.1,
            "vote_count": 76
          }
        ]
}

export default {
    testUser,
    testReview,
    testFavorite,
    usersInDb,
    reviewsInDb,
    favoritesInDb,
    mockResolvedValue
}
