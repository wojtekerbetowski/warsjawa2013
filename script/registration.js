var allWorkshops;
var DEFAULT_OPTION = "Wybierz warsztat...";
var NONE_OPTION = "Żaden"
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
        .attr("value", workshop.id)
        .text(titleToDisplay(workshop));
    if(workshop.disabled) {
        workshopElement.attr("disabled", "disabled");
    }
    getDropdown(dropdown).append(workshopElement);
    return workshopElement;
}

function clearDropdown(dropdown) {
    getDropdown(dropdown).html('');
}

function loadWorkshops() {
    $.ajax("http://46.105.25.37:8181/workshops")
        .success(function (data) {
            allWorkshops = data;
            fillDropdowns();
        })
        .fail(function (errMsg) {
            alert("Nie udało się załadować dostępnych warsztatów. Spróbuj później.");
        });
}

function titleToDisplay(workshop) {
    return workshop.title + " (" + workshop.length + (workshop.length == 1 ? " slot)" : " sloty)");
}

function fillDropdown(dropdown, workshops) {
    clearDropdown(dropdown);

    var selectMessage = $("<option></option>")
        .attr("value", -1)
        .text(DEFAULT_OPTION).attr('selected', 'selected');
    getDropdown(dropdown).append(selectMessage);
    dropdown.workshops = workshops;
    $.each(workshops, function (index, workshop) {
        addWorkshop(dropdown, workshop);
    });
    var noneOption = $("<option></option>")
        .attr("value", -2)
        .text(NONE_OPTION);
    getDropdown(dropdown).append(noneOption);
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
function getWorkshopIdAtIndex(index) {
    return $('form').find("#workshops" + index).val();
}
function getWorkshopNameAtIndex(index) {
    return $('form').find("#workshops" + index + " :selected").text();
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
                    if (isDropdownDisabled(second)) {
                        fillDropdown(dropdownIdAtIndex(second), allWorkshops[second]);
                        if (isDropdownDisabled(third)) {
                            fillDropdown(dropdownIdAtIndex(third), allWorkshops[third]);
                        }
                    }
                    break;
                case 2:
                    forceWorkshopSelection(dropdownIdAtIndex(second), selectedWorkshop);
                    if (isDropdownDisabled(third)) {
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
            var workshop1Id = getWorkshopIdAtIndex(0);
            var workshop1Name = getWorkshopNameAtIndex(0);
            var workshop2Id = getWorkshopIdAtIndex(1);
            var workshop2Name = getWorkshopNameAtIndex(1);
            var workshop3Id = getWorkshopIdAtIndex(2);
            var workshop3Name = getWorkshopNameAtIndex(2);

            var message = name + ",\nZostałeś zarejestrowany na:";

            function appendWorkshopToMessage(workshop) {
                if (workshop != DEFAULT_OPTION && workshop != NONE_OPTION)
                    message += "\n- " + workshop;
            }

            var workshopsURI = "http://46.105.25.37:8181/book/" + encodeURIComponent(email) + "/" + encodeURIComponent(name) + "/";

            function appendWorkshopToURI(sep, workshop) {
                if (workshop >= 0)
                    workshopsURI += sep + workshop;
            }
            appendWorkshopToURI("", workshop1Id);
            appendWorkshopToMessage(workshop1Name);
            if (workshop2Id != workshop1Id) {
                appendWorkshopToMessage(workshop2Name);
                appendWorkshopToURI(",", workshop2Id);
            }
            if (workshop3Id != workshop2Id) {
                appendWorkshopToMessage(workshop3Name);
                appendWorkshopToURI(",", workshop3Id);
            }

            message += "\n\nNiedługo dostaniesz maila na adres " + email;

            $.ajax(workshopsURI)
                .success(function (data) {
                    alert(message);
                    loadWorkshops();
                    fillDropdowns();
                })
                .fail(function (errMsg) {
                    alert("Nieoczekiwany błąd! Spróbuj jeszcze raz później lub skontkatuj się z kapitułą Warsjawy.\n" +
                          "(tip: być może w międzyczasie skończyły się miejsca na Twój warsztat)");
                    loadWorkshops();
                    fillDropdowns();
                });
        }
    });
});
