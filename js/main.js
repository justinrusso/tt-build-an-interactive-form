'use strict';

// Job Role
var $title = $('#title');
var $otherJobRole = $('<label for="title_other">Your Job Role:</label>' +
    '<input type="text" id="title_other" name="user_title_other">');

// T-Shirt
var $design = $('#design');
var $color = $('#color');
var $colorPlaceholder = $('<option>Please select a T-shirt theme</option>');
var colorOptions = {
    heart_js: [],
    js_puns: []
};

var jobRoleSelected = function () {
    // Add otherJobRole text input when "other" is selected as the job role's value
    // Otherwise, remove it
    if (this.value === 'other') {
        $title.after($otherJobRole);
    } else {
        $otherJobRole.remove();
    }
};

var designSelected = function() {
    var $colorDiv = $('#colors-js-puns').show();
    switch (this.value) {
        case 'js puns':
        case 'heart js':
            // displayColorOptions(this.value);
            // Empty selection and append options for design (this.value) only
            $color.empty();
            $color.append(colorOptions[this.value.replace(' ', '_')]);
            $colorDiv.show();
            break;
        default:
            // No design selected
            // Hide colors
            hideColorOptions();
            $colorDiv.hide();
            break;
    }
};

// Hide color options and display placeholder option.
var hideColorOptions = function() {
    $color.empty();
    $color.append($colorPlaceholder);
};

// Populate color options for each design
var populateColorOptions = function() {
    var colorOptionArray = $color.find('option');
    // Loop through colorOptions
    for (var i = 0; i < colorOptionArray.length; i++) {
        // Get raw color option text
        var optionText = colorOptionArray[i].text.toLowerCase();
        // Clean up the color's text
        colorOptionArray[i].text = colorOptionArray[i].text.replace(/\(.*shirt only\)/gi, '').trim();

        // Add color option to proper design
        // for heart design, since the wording in the text is different
        if (optionText.indexOf('i ♥ js') > -1) {
            colorOptions.heart_js.push(colorOptionArray[i]);
        } else if (optionText.indexOf('js puns') > -1) {
            colorOptions.js_puns.push(colorOptionArray[i]);
        } else {
            console.log('color option not found ' + optionText);
        }
    }
};

// When job role selection is changed, run jobRoleSelected
$title.on('change', jobRoleSelected);

// When the t-shirt design option is changed, run designSelected
$design.on('change', designSelected);

// Hide color div initially
$('#colors-js-puns').hide();

window.onload = function() {
    // Focus Name field
    $('#name').focus();

    populateColorOptions();
};