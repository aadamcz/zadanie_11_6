$(function() {
	function randomString() {
		var chars =
			"0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
		var str = "";
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			// CREATING COMPONENTS OF COLUMNS
			var $column = $("<div>").addClass("column");
			var $columnTitle = $("<h2>")
				.addClass("column-title")
				.text(self.name);
			var $columnCardList = $("<ul>").addClass("column-card-list");
			var $columnDelete = $("<button>")
				.addClass("btn-delete")
				.text("x");
			var $columnAddCard = $("<button>")
				.addClass("add-card")
				.text("Add a card");

			// ADDING EVENTS
			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {
				var cardName = prompt("Enter the name of the card");

				if (cardName === null) {
					return;
				} else if (cardName.length <= 0) {
					self.addCard(new Card("Default"));
				} else if (cardName) {
					self.addCard(new Card(cardName));
				}
			});

			// CONSTRUCTION COLUMN ELEMENT
			$column
				.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);

			// RETURN OF CREATED COLUMN
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children("ul").append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			//Implementation of card creation
			var $card = $("<li>").addClass("card");

			var $cardDescription = $("<p>")
				.addClass("card-description")
				.text(self.description);

			var $cardDelete = $("<button>")
				.addClass("btn-delete")
				.text("x");

			//Binding to click event
			$cardDelete.click(function(event) {
				self.removeCard();
			});

			//Combining blocks and returning the card
			$card.append($cardDelete).append($cardDescription);
			return $card;
		}
		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		};
	}

	/*
	var board = {
		name: 'Kanban board',
		addColumn: function(column){
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('<div>').addClass('board');
	};
	*/
	//board -> Board

	function Board(name) {
		this.name = name;
		this.$element = $("<div>").addClass("board");
		$("body").append(this.$element);
	}

	Board.prototype = {
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		}
	};

	var board = new Board("Kanban board");

	function initSortable() {
		$("column-card-list")
			.sortable({
				connectWith: ".column-card-list",
				placeholder: "card-placeholder"
			})
			.disableSelection();
	}

	$(".create-column").click(function() {
		var name = prompt("Enter a column name");

		if (name === null) {
			return;
		} else if (name.length <= 0) {
			var column = new Column("Default");
			board.addColumn(column);
		} else if (name) {
			var column = new Column(name);
			board.addColumn(column);
		}
	});

	//Creating columns
	var todoColumn = new Column("To do");
	var doingColumn = new Column("Doing");
	var doneColumn = new Column("Done");

	//Adding columns to the board
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	//Creating cards
	var card1 = new Card("New task");
	var card2 = new Card("Create Kanban boards");

	//Adding cards to columns
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});

//Przenoszenie zadań między kolumnami
//Dodanie kartkom kolorów
//Ostylowanie
