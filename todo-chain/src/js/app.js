App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load pets.
        console.log("Starting to do the thing ...");
        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('Todo.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var TodoArtifact = data;
            App.contracts.Todo = TruffleContract(TodoArtifact);
            // Set the provider for our contract
            App.contracts.Todo.setProvider(App.web3Provider);
            // Use our contract to retrieve and mark the adopted pets
            var todoInstance;
            App.contracts.Todo.deployed().then(function (instance) {
                todoInstance = instance;
                return todoInstance.getTodo.call();
            }).then(function (todos) {
                $("#todos").html("Things");
                $("#todos").append("<br/>");
                for (let i = 0; i < todos.length; i++) {
                    $("#todos").append(web3.toAscii(todos[i]));
                    $("#todos").append("<br/>");
                }
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    handler: function () {
        const value = $('#todo').val().trim();
        if (value.length > 0) {
            App.contracts.Todo.deployed().then(function (instance) {
                todoInstance = instance;
                return todoInstance.setTodo(value);
            }).then((data) => {
                $('#info').slideDown();
                $('#info').html("Please refesh the page to see the change ...");
            }).catch((err) => {
                console.log(err);
            });
        } else {
            alert("How funny error. And guess what? It's your fault.");
        }
    }
};

$(function () {
    $(window).load(function () {
        $("#info").hide();
        App.init();
    });
    $('#todoButton').on('click', () => {
        console.log("Clicked");
        App.handler();
    });
});
