/*
    TreeHouse Techdegree Full Stack JavaScript
    Project 3: Build an Interactive Form

                        ***** AIMING FOR EXCEEDS EXPECTATIONS *****

WHAT IT DOES:
    This JavaScript code is intended to provide interactivity to a web form when registering 
    for a conference. 
*/

/* STEP #1 --> FOCUS ON FISRT TEXT FIELD ON PAGE LOAD */
$('#name').focus();

/* STEP #2 --> SHOW/HIDE USER DEFINED JOB-ROLE INPUT FIELD */
$("#other-title").hide();
$("#title").change(() => {
    if ($("#title").val() === "other") {
        $("#other-title").fadeIn(500).focus();
    } else {
        $("#other-title").fadeOut(500);
    }
});

/* STEP #3 --> T-SHIRT SECTION. FILTER OUT COLORS BASED ON SELECTED THEME. 
'Theme - JS Puns'--> 'Cornflower Blue', 'Dark Slate Grey' and 'Gold'. 
'Theme - I ♥ JS'--> 'Tomato', 'Steel Blue' and 'Dim Grey'*/
$('#color').hide();
$('label[for="color"]').hide();
$('#design').change(() => {
    if ($('#design').val() === 'js puns') {
        $('#color').val('Select Color');
        $('#color').show();
        $('label[for="color"]').show();
        $('#color option[value="tomato"]').hide();
        $('#color option[value="steelblue"]').hide();
        $('#color option[value="dimgrey"]').hide();
        $('#color option[value="cornflowerblue"]').show();
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();
    } else if ($('#design').val() === 'heart js') {
        $('#color').val('Select Color');
        $('#color').show();
        $('label[for="color"]').show();
        $('#color option[value="tomato"]').show();
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();
        $('#color option[value="cornflowerblue"]').hide();
        $('#color option[value="darkslategrey"]').hide();
        $('#color option[value="gold"]').hide();
    } else {
        $('#color').fadeOut(500);
        $('label[for="color"]').fadeOut(500);
    }
});

/* STEP #4 --> REGISTER FOR ACTIVITIES SECTION. Some events are the same time as others. If the 
user selects a workshop, don't allow the selection of another workshop a the same date and time --
You should disable the check-box and visually indicate that the workshop in the competing time 
slot is not available.
When a user unchecks an activity, make sure that competing activities are no longer disabled.
As a user selects activities, a running total should display below the list of check-boxes. For 
example, if the user selects 'Main Conference', then Total = $200 should appear. If they add one 
workshop, the total should change to $300. */
$('.activities').change(() => {
    if ($('input[name="js-frameworks"').prop('checked')) {
        console.log('js-frameworks is checked');
        $('input[name|="express"]').attr('disabled', 'true');
    } else if ($('input[name|="express"]').prop('checked')) {
        console.log('express is checked');
        $('input[name|="js-frameworks"]').attr('disabled', 'true');
    } else {
        $('input[name|="express"]').removeAttr('disabled');
        $('input[name|="js-frameworks"]').removeAttr('disabled');
    }
});

/* PRICE CALCULATOR */
let eventPriceList = [
    { activity: 'all', price: 200 },
    { activity: 'js-frameworks', price: 100 },
    { activity: 'js-libs', price: 100 },
    { activity: 'express', price: 100 },
    { activity: 'node', price: 100 },
    { activity: 'build-tools', price: 100 },
    { activity: 'npm', price: 100 }
];

/* STEP #5 --> PAYMENT INFO SECTION: Display payment sections based on the payment option selected
Credit Card payment option should be selected by default. Display the #credit-card div and hide the
'Paypal' and 'Bitcoin' information. 
When Paypal payment option is selected, credit card and Bitcoin should be hidden. 
When Bitcoin is selected, credit card and Paypal should be hidden */

/* STEP #5 --> FORM VALIDATION: if any of the following errors exists, prevent the user from 
submitting the form:
 * Name field can't be blank
 * Email must be a validly formatted email address (no need to check if its real)
 * Must select at least one check-box under the 'Register for Activities' section
 * If the selected payment option is credit card, make sure the user has provided a credit card 
 number (between 13 and 16 numbers), a zip code (5 digits) and a CVV code (3 digits)*/

/* STEP #6 --> FORM VALIDATION MESSAGES: Provide some kind of indication when there is a
validation error. For example, the field borders could turn red, or a message could appear near 
the field or at the top of the form. 
There should be an error indication for the Name field, Email field, Register for Activities 
check-boxes, credit card number, zip code and CVV.*/

/* STEP #6 --> When JavaScript is switched off or unavailable, the user should still have access
to all form fields and payment information. For example, the 'Other' text field in the 'Jobs 
Role' menu should be visible on the page when JavaScript is switched off, and all the payment 
methods should be visible. */


/* *** EXCEEDS EXPECTATIONS: EXTRA STEPS ***

STEP #7 --> hide the 'Color' label and 'Select' menu until T-Shirt design has been selected from 
the 'Design' menu. ***DONE***

STEP #8 --> Program at least one of your error messages so that more information is provided 
depending on the error. For example, if the user hasn’t entered a credit card number and the field 
is completely blank, the error message reads “Please enter a credit card number.” If the field 
isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is 
between 13 and 16 digits long.

STEP #9 --> Program your form so that it provides a real-time validation error message for at 
least one text input field. Rather than providing an error message on submit, your form should 
check for errors and display messages as the user begins typing inside a text field. For example, 
if the user enters an invalid email address, the error appears as the user begins to type, and 
disappears as soon as the user has entered a complete and correctly formatted email address. 
Please accomplish this with your own JavaScript code. Do not rely on HTML5's built-in email 
validation.*/