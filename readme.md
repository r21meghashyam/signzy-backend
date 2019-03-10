# Search school backend

## Installation

```
    cd [project directory]
    npm install
```
## Usage
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


## Contact
    Phone: 8660852458
    Email: r21meghashyam@gmail.com