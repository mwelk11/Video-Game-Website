app.service('gamesService', function($http, $q) {

    this.getGames = function(formData) {
        return $http.post('http://localhost:8081/games', formData)
            .then(function(response) {
                if(typeof response.data === 'object') {
                    return response.data;
                } else {
                    console.log('>>> Invalid searchResults response');
                    return $q.reject(response.data);
                }
            }, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
    };

    this.insertGame = function(formData) {
        console.log('formData = ', formData);
        return $http.post('http://localhost:8081/insertGame', formData)
        .then(function(response) {
            if(response.status == 200) {
                return response.data;
            } else {
                console.log('>>> Invalid insertGame response');
                return $q.reject(response.data);
            }
        }, function(response) {
            return $q.reject(response.data);
        });
    };

    this.deleteGame = function(formData) {
        return $http({
            method : 'POST',
            url : 'http://localhost:8081/deleteGame',
            data : game,
            headers : {'Content-Type': 'application/json'}
        })
        .then(function(response) {
            if(response.status == 200) {
                return response.data;
            } else {
                return $q.reject(response.data);
            }
        }, function(response) {
            return $q.reject(response.data);
        });
    };
});
