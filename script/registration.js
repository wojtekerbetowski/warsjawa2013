var allWorkshops;
var DEFAULT_OPTION = "Wybierz warsztat...";
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
    $.ajax("http://localhost:8080/register/workshops")
        .done(function (data) {
            allWorkshops = data;
            fillDropdowns();
        });
}

function titleToDisplay(workshop) {
    return workshop.title + " (" + workshop.length + (workshop.length == 1 ? " slot)" : " sloty)");
}

function fillDropdown(dropdown, workshops) {
    clearDropdown(dropdown);

    var selectMessage = $("<option></option>")
        .attr("value", DEFAULT_OPTION)
        .text(DEFAULT_OPTION).attr('selected', 'selected');
    getDropdown(dropdown).append(selectMessage);
    dropdown.workshops = workshops;
    $.each(workshops, function (index, workshop) {
        addWorkshop(dropdown, workshop);
    });
    enableDropdown(dropdown);
}
function fillDropdowns() {
    $.each(allWorkshops, function (index, workshops) {
        fillDropdown(dropdownIdAtIndex(index), allWorkshops[index]);
    });
}
function forceWorkshopSelection(dropdownId, workshop) {
    clearDropdown(dropdownId);
    addWorkshop(dropdownId, workshop).attr('selected', 'selected');
    disableDropdown(dropdownId);
}
function getWorkshopAtIndex(index) {
    return $('form').find("#workshops" + index).val();
}

function isDropdownDisabled(dropdownIndex) {
    return !(getDropdown(dropdownIdAtIndex(dropdownIndex)).attr("disabled") === undefined);
}
$(document).ready(function () {
    loadWorkshops();
    $.each($('select'), function (index, dropdown) {
        $(dropdown).change(function () {
            var selectedWorkshop = allWorkshops[index][this.selectedIndex - 1];
            var second = index + 1;
            var third = index + 2;
            switch (selectedWorkshop.length) {
                case 1:
                    if(isDropdownDisabled(second)) {
                        fillDropdown(dropdownIdAtIndex(second), allWorkshops[second]);
                        if(isDropdownDisabled(third)) {
                            fillDropdown(dropdownIdAtIndex(third), allWorkshops[third]);
                        }
                    }
                    break;
                case 2:
                    forceWorkshopSelection(dropdownIdAtIndex(second), selectedWorkshop);
                    if(isDropdownDisabled(third)) {
                        fillDropdown(dropdownIdAtIndex(third), allWorkshops[third]);
                    }
                    break;
                case 3:
                    forceWorkshopSelection(dropdownIdAtIndex(second), selectedWorkshop);
                    forceWorkshopSelection(dropdownIdAtIndex(third), selectedWorkshop);
            }
        });
    });

    var formSelector = 'form';
    $(formSelector).validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "WpIsz swojE ImIĘ I nazwIsKo",
            email: {
                required: "Podaj swój aDREs EmaIl",
                email: "nIEpoprawny format EmaIla"
            }
        },
        submitHandler: function () {
            var form = $(formSelector);
            var name = form.find("#name").val();
            var email = form.find("#email").val();
            var workshop1 = getWorkshopAtIndex(0);
            var workshop2 = getWorkshopAtIndex(1);
            var workshop3 = getWorkshopAtIndex(2);

            var message = name + ",\nZostałeś zarejestrowany na:";

            function appendWorkshopToMessage(workshop) {
                if (workshop != DEFAULT_OPTION)
                    message += "\n- " + workshop;
            }

            appendWorkshopToMessage(workshop1);
            if (workshop2 != workshop1) {
                appendWorkshopToMessage(workshop2);
            }
            if (workshop3 != workshop2) {
                appendWorkshopToMessage(workshop3);
            }

            message += "\n\nNiedługo dostaniesz maila na adres " + email;
            alert(message);
        }
    });
});