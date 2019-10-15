class User {
    constructor(name, lastname, username, password, id) {
        this.userCRM = [];
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.password = password,
            this.username = username;
    }
    getUserName() {
        const welcomeName = document.querySelector("#user");
        welcomeName.innerHTML = "Welcome  " + this.name;
    }
}

let dummyUser = [
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Luca",
            "last": "Silveira"
        },
        "location": {
            "street": {
                "number": 1476,
                "name": "Rua Belo Horizonte "
            },
            "city": "Ananindeua",
            "state": "Acre",
            "country": "Brazil",
            "postcode": 82104,
            "coordinates": {
                "latitude": "-76.6903",
                "longitude": "-56.8768"
            },
            "timezone": {
                "offset": "-3:00",
                "description": "Brazil, Buenos Aires, Georgetown"
            }
        },
        "email": "luca.silveira@example.com",
        "login": {
            "uuid": "9e52200c-1664-4a7a-9338-412217b99cc6",
            "username": "blueleopard339",
            "password": "cezer121",
            "salt": "fzApQDO1",
            "md5": "169163c9cf8a224395a1bb15e897f1db",
            "sha1": "55940bcb0a63da933e62a59e8ba33a94a042d4ed",
            "sha256": "e01f497b8fec5a424439d86f8a83ee90c438e6d0c93a8ab4bf90d6959fcd1792"
        },
        "dob": {
            "date": "1951-03-31T13:04:26.250Z",
            "age": 68
        },
        "registered": {
            "date": "2004-06-23T20:02:40.901Z",
            "age": 15
        },
        "phone": "(04) 7557-7339",
        "cell": "(86) 0923-9768",
        "id": {
            "name": "",
            "value": null
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/15.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/15.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/15.jpg"
        },
        "nat": "BR"
    }
]
