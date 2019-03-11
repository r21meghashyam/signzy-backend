# Search school backend

## Installation

```
    git clone https://github.com/r21meghashyam/signzy-backend-assigment.git singzy-backend-assignment
    cd singzy-backend-assignment
    npm install
```
## Usage

    npm start

Sample request:

|   POST http://localhost:3000/api
```
    {
        "search":{
            "area":"bangalore",
            "gender":"co-ed",
            "medium_of_inst": "kannada"
        },
        "sort":["schoolname","desc"],
        "filter":["cluster","block","schoolname","schoolid","landmark","pincode"]
    }
```

Postman link:
    https://www.getpostman.com/collections/10c97643e4c93d65b545

## Contact
    Phone: 8660852458
    Email: r21meghashyam@gmail.com
