function host(endpoint) {
    return `http://api.backendless.com/816FEF6B-E790-E7A4-FF23-C88FDF2D8200/86F598A4-E405-4CEC-A298-1E61EB9BE9EC/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
};
async function register(username, password) {
   

    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    

    return result;
}

async function login(username, password) {
    

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

  

    return result;
}

async function logout() {
  

    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');

    const result = fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

   

    return result;
}

// get all movies
async function getMovies(search) {
    

    const token = localStorage.getItem('userToken');

    let result;

    if (!search) {
        result = (await fetch(host(endpoints.MOVIES), {
            headers: {
                'user-token': token
            }
        })).json();
    } else {
        result = (await fetch(host(endpoints.MOVIES + `?where=${escape(`genres LIKE '%${search}%'`)}`), {
            headers: {
                'user-token': token
            }
        })).json();
    }


    return result;
}

// get movie by ID
async function getMovieById(id) {


    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

 

    return result;
}

// create movie
async function createMovie(movie) {
   

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

   
    return result;
}

// edit movie
async function updateMovie(id, updatedProps) {
    

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

 

    return result;
}

// delete movie
async function deleteMovie(id) {
    

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

   

    return result;
}

// get movies by user ID
async function getMovieByOwner() {
   

    const token = localStorage.getItem('userToken');
    const ownerId = localStorage.getItem('userId');

    const result = (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    

    return result;
}

// buy ticket
async function buyTicket(movie) {
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTickets });
}