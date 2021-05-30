function Combo(combo, button, callback) {
    var selectionBox = null;
    var itemDivs = [];
    var selected = -1;
    var scrollPos = 0;
    var arrowClick = false;
    var itemList;
    var itemCount;
    var maxItems = 6;
    var itemHeight = 16;
    var previousSearch = " ";
    var ARROW_DOWN = 40;
    var ARROW_UP = 38;
    var RETURN = 13;

    function createSelection() {
        selectionBox = $("<div class ='combo_list'></div>");
        selectionBox.css({
            position: "absolute",
            top: combo.offset().top + combo.outerHeight() + 1,
            left: combo.offset().left + 1,
            width: combo.outerWidth() - 2,
            overflowY: "auto",
            height: 96
        });
        $("body").append(selectionBox);
    }

    function selectItem(selectedItem) {
        if (selectedItem === undefined) {
            callback(combo.val());
        } else {
            callback(selectedItem.text());
        }

        selectionBox = null;
    }

    function addSelections(items) {
        var shownItems;

        itemCount = 0;
        selection = -1;
        itemDivs = [];
        scrollPos = 0;
        selectionBox.empty();
        items.forEach(function (item) {
            var itemDiv = $("<div class='combo_item_unselected'>");

            itemDiv.text(item);
            selectionBox.append(itemDiv);
            itemCount++;
            itemDiv.click(function () {
                selectItem(itemDiv);
            });
            itemDivs.push(itemDiv);
        });
        shownItems = itemCount;
        if (shownItems > maxItems) {
            shownItems = maxItems;
        }
        if (shownItems === 0) {
            selectionBox.hide();
        } else {
            selectionBox.show();
        }
        selectionBox.height(shownItems * itemHeight);
    }

    function search() {
        var key = combo.val().toLowerCase();
        var filtered;
        if (key === previousSearch) {
            return;
        }
        if (arrowClick) {
            return;
        }
        previousSearch = key;
        if (selectionBox == null) {
            createSelection();
        }
        filtered = itemList.filter(function (item) {
            return item.toLowerCase().indexOf(key) > -1;
        });
        addSelections(filtered);
    }

    this.setItems = function (values) {
        itemList = values;
    }

    function selectListItem(newSelection) {
        if (selection >= 0 && selection < itemCount) {
            itemDivs[selection].removeClass("combo_item_selected");
            itemDivs[selection].addClass("combo_item_unselected");
        }
        if (newSelection < 0 || newSelection >= itemCount) {
            combo.val(previousSearch);
        }
        selection = newSelection;
        if (selection >= 0 && selection < itemCount) {
            itemDivs[selection].removeClass("combo_item_unselected");
            itemDivs[selection].addClass("combo_item_selected");
            combo.val(itemDivs[selection].text());
        }
        if (selection < scrollPos && selection >= 0) {
            scrollPos = selection;
            selectionBox.scrollTop(scrollPos * itemHeight);
        }
        if (selection > scrollPos + maxItems - 1) {
            scrollPos = selection - maxItems + 1;
            selectionBox.scrollTop(scrollPos * itemHeight);
        }
    }

    function keyPress(event) {
        if (event.keyCode === ARROW_DOWN) {
            arrowClick = true;
            if (selection < itemCount) {
                selectListItem(selection + 1);
            }
            return;
        } else if(event.keyCode === ARROW_UP) {
            arrowClick = true;
            if (selection >= 0) {
                selectListItem(selection - 1);
            }
            return;
        } else if(event.keyCode === RETURN) {
            if (selection >= 0 && selection < itemCount) {
                selectItem(itemDivs[selection]);
            } else {
                selectItem();
            }
            return;
        }
        arrowClick = false;
    }

    combo.keyup(search);
    combo.keydown(keyPress);
    button.click(function () {
        selectItem();
    });
}