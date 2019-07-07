let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    //not sure if this is correct, i copied it from node's website
    let createProducts = `create table if not exists todos(
        item_id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(45) NULL,
        department_name VARCHAR(45) NULL,
        price INTEGER NOT NULL,
        stock_quantity INTEGER NOT NULL,
        PRIMARY KEY (id)
                        )`;

    connection.query(createProducts, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    connection.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
    });
});