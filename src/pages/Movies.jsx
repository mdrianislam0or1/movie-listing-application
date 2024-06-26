import { useState, useEffect } from "react";
import MovieListing from "./MovieListing";
import MovieDetails from "./MovieDetails";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Movies = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        const storedFavorites = JSON.parse(
            localStorage.getItem(`favorites-${storedEmail}`)
        );

        if (storedEmail) setUserEmail(storedEmail);
        if (storedFavorites) setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        if (userEmail) {
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem(`favorites-${userEmail}`, JSON.stringify(favorites));
        }
    }, [userEmail, favorites]);

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const toggleFavorite = (movie) => {
        const isFavorite = favorites.some((fav) => fav.id === movie.id);
        if (isFavorite) {
            setFavorites(favorites.filter((fav) => fav.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    const handleLogin = (email) => {
        setUserEmail(email);
    };

    const handleLogout = () => {
        setUserEmail(null);
        setFavorites([]);
        localStorage.removeItem("userEmail");
        localStorage.removeItem(`favorites-${userEmail}`);
        navigate('/');
    };

    const movies = [
        {
            id: 1,
            title: "Inception",
            cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
            category: "Action",
            releaseDate: "July 16, 2010",
            budget: "$160 million"
        },
        {
            id: 2,
            title: "The Shawshank Redemption",
            cast: ["Tim Robbins", "Morgan Freeman"],
            category: "Drama",
            releaseDate: "September 23, 1994",
            budget: "$25 million"
        },
        {
            id: 3,
            title: "The Godfather",
            cast: ["Marlon Brando", "Al Pacino", "James Caan"],
            category: "Crime",
            releaseDate: "March 24, 1972",
            budget: "$6-7 million"
        },
        {
            id: 4,
            title: "Pulp Fiction",
            cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
            category: "Crime",
            releaseDate: "October 14, 1994",
            budget: "$8-8.5 million"
        },
    ];

    return (
        <>
            <Navbar />
            <div className="container px-10 mx-auto">
                <div className="flex">
                    <div className="w-2/3 p-4">
                        <MovieListing
                            movies={movies}
                            onMovieSelect={handleMovieSelect}
                            onToggleFavorite={toggleFavorite}
                            favorites={favorites}
                            userEmail={userEmail}
                            onLogin={handleLogin}
                            onLogout={handleLogout}
                        />
                    </div>
                    <div className="w-1/3 p-4">
                        {selectedMovie && <MovieDetails movie={selectedMovie} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movies;
