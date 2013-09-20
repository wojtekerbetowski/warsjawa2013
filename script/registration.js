var allWorkshops;
function getDropdown(dropdownId) {
    return $('select#' + dropdownId);
}

function disableDropdown(dropdownId) {
    $(getDropdown(dropdownId)).attr('disabled', 'disabled');
}

function dropdownIdAtIndex(index) {
    return "workshops" + index;
}

function enableDropdown(dropdownId) {
    getDropdown(dropdownId).removeAttr('disabled');
}

function addWorkshop(dropdown, workshop) {
    var workshopElement = $("<option></option>")
        .attr("value", workshop.title)
        .text(titleToDisplay(workshop));
    getDropdown(dropdown).append(workshopElement);
    return workshopElement;
}

function clearDropdown(dropdown) {
    getDropdown(dropdown).html('');
}

function loadWorkshops() {
    allWorkshops = [
        [
            {title: "some workshop", length: 1},
            {title: "other workshop 2", length: 2},
            {title: "other workshop 3", length: 3}
        ],
        [
            {title: "workshop 2", length: 2},
            {title: "different workshop", length: 1},
            {title: "different workshop 1", length: 1}
        ],
        [
            {title: "workshop 5", length: 1},
            {title: "different www", length: 1},
            {title: "different wwwaaa", length: 1}
        ]
    ];
}

function titleToDisplay(workshop) {
    return workshop.title + " (" + workshop.length + (workshop.length == 1 ? " slot)" : " sloty)");
}

function fillDropdown(dropdown, workshops) {
    clearDropdown(dropdown);

    var selectMessage = $("<option></option>")
        .attr("value", "Wybierz warsztat...")
        .text("Wybierz warsztat...").attr('selected', 'selected');
    getDropdown(dropdown).append(selectMessage);
    dropdown.workshops = workshops;
    $.each(workshops, function (index, workshop) {
        addWorkshop(dropdown, workshop);
    });
    enableDropdown(dropdown);
}
function fillDropdowns() {
    $.each(allWorkshops, function (index, workshops) {
    });
}
function forceWorkshopSelection(dropdownId, workshop) {
    clearDropdown(dropdownId);
    addWorkshop(dropdownId, workshop).attr('selected', 'selected');
    disableDropdown(dropdownId);
}
$(document).ready(function () {
    loadWorkshops();
    $.each($('select'), function (index, dropdown) {
        fillDropdown(dropdownIdAtIndex(index), allWorkshops[index]);
        $(dropdown).change(function () {
            var selectedWorkshop = allWorkshops[index][this.selectedIndex - 1];
            var second = index + 1;
            var third = index + 2;
            switch(selectedWorkshop.length) {
                case 1:
                    fillDropdown(dropdownIdAtIndex(second), allWorkshops[second]);
                    fillDropdown(dropdownIdAtIndex(third), allWorkshops[second]);
                    break;
                case 2:
                    forceWorkshopSelection(dropdownIdAtIndex(second), selectedWorkshop);
                    fillDropdown(dropdownIdAtIndex(third), allWorkshops[third]);
                    break;
                case 3:
                    forceWorkshopSelection(dropdownIdAtIndex(second), selectedWorkshop);
                    forceWorkshopSelection(dropdownIdAtIndex(third), selectedWorkshop);
            }
        });
    });
});