var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    loadProducts();
});

function loadProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptCustomerForItem(res);
    });
}

function promptCustomerForItem(inventory) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "choice",
                message: "What is the ID of the item you would like to purchase [Q to quit]",
                validate: function(val) {
                    return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val) {
            checkIfShouldExit(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);

            if (product) {
                promptCustomerForQuantity(product);
            }
            else {
                //why is there "\n"???
                console.log("\nThat item is not in the inventory");
                loadProducts();
            }
        });
}

function promptCustomerForQuantity(product) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "quantity",
            message: "how many do you want? [Q to Quit]",
            validate: function(val) {
                return val > 0 || val.toLowerCase() === "q";
            }
        }
    ])
    .then(function(val))
}