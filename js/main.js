/****************************************************************************************
 *   TreeHouse Techdegree Full Stack JavaScript                                         *
 *   Project 3: Build an Interactive Form                                               *
 *                                                                                      *
 *                       ***** AIMING FOR EXCEEDS EXPECTATIONS *****                    *
 *                                                                                      *
 * WHAT IT DOES:                                                                        *
 *   This JavaScript code is intended to provide interactivity to a web form when       *
 *   registering for a conference.                                                      *
 ****************************************************************************************/

/****************
 * PLACEHOLDERS *
 ****************/
$('#name').attr('placeholder', 'Name');
$('#mail').attr('placeholder', 'yourEmail@email.com');
$('#cc-num').attr('placeholder', '13 to 16 digits long');
$('#cvv').attr('placeholder', 'i.e. 123');
$('#zip').attr('placeholder', 'i.e. 12345');

/******************************************
 * FOCUS ON FISRT TEXT FIELD ON PAGE LOAD *
 ******************************************/
$('#name').focus();

/***********************************************
 * SHOW/HIDE USER DEFINED JOB-ROLE INPUT FIELD *
 ***********************************************/
$("#other-title").hide();
$("#title").change(() => {
    if ($("#title").val() === "other") {
        $("#other-title").fadeIn(500).focus();
    } else {
        $("#other-title").fadeOut(500);
    }
});

/*********************************************************************************
 * T-SHIRT SECTION: Color selection is filtered out based on the selected theme. * 
 * 'Theme - JS Puns'--> 'Cornflower Blue', 'Dark Slate Grey' and 'Gold'.         *
 * 'Theme - I ♥ JS'--> 'Tomato', 'Steel Blue' and 'Dim Grey'                     * 
 *********************************************************************************/
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

/**************************************************************************************************
 * REGISTER FOR ACTIVITIES SECTION. Some events are the same time as others. Activity             *
 * overlap is prevented by disabling the check-box and visually indicating that the workshop in   *
 * the conflicting time slot is not available. As a user selects activities, a running total      *
 * is displayed below the list of activities.                                                     *
 *************************************************************************************************/

/* GROUPING ACTIVITIES BY CONFLICTING GROUPS */
$('input[name="js-frameworks"]').addClass('conflicting-group-A');
$('input[name="express"]').addClass('conflicting-group-A');
$('input[name="js-libs"').addClass('conflicting-group-B');
$('input[name="node"]').addClass('conflicting-group-B');

/* CONFLICTING GROUP A, TUESDAY 9-12: js-frameworks and express */
$('.conflicting-group-A').change(() => {
    if ($('input[name="js-frameworks"]').prop('checked')) {
        $('input[name="express"]').attr('disabled', 'true');
        $('input[name="express"]').parent().css('color', '#c1deeb');
    } else if ($('input[name="express"]').prop('checked')) {
        $('input[name="js-frameworks"]').attr('disabled', 'true');
        $('input[name="js-frameworks"]').parent().css('color', '#c1deeb');
    } else {
        $('input[name="js-frameworks"]').removeAttr('disabled');
        $('input[name="js-frameworks"]').parent().css('color', '#000');
        $('input[name="express"]').removeAttr('disabled');
        $('input[name="express"]').parent().css('color', '#000');
    }
});

/* CONFLICTING GROUP B, TUESDAY 1-16: js-libs and node */
$('.conflicting-group-B').change(() => {
    if ($('input[name="js-libs"]').prop('checked')) {
        $('input[name="node"]').attr('disabled', 'true');
        $('input[name="node"]').parent().css('color', '#c1deeb');
    } else if ($('input[name="node"]').prop('checked')) {
        $('input[name="js-libs"]').attr('disabled', 'true');
        $('input[name="js-libs"]').parent().css('color', '#c1deeb');
    } else {
        $('input[name="js-libs"]').removeAttr('disabled');
        $('input[name="js-libs"]').parent().css('color', '#000');
        $('input[name="node"]').removeAttr('disabled');
        $('input[name="node"]').parent().css('color', '#000');
    }
});

/* ACTIVITY PRICE LIST */
let eventPriceList = [
    { activity: 'all', price: 200 },
    { activity: 'js-frameworks', price: 100 },
    { activity: 'js-libs', price: 100 },
    { activity: 'express', price: 100 },
    { activity: 'node', price: 100 },
    { activity: 'build-tools', price: 100 },
    { activity: 'npm', price: 100 }
];

/* PRICE TAG CALCULATOR */
let priceTag = document.createElement('h3');
$(priceTag).attr('id', 'price-tag');
$("#price-tag").hide();
$('.activities').append(priceTag);

$('.activities').change(() => {
    let activitySelection = $('.activities input:checked');
    let totalCost = 0;
    for (let i = 0; i < activitySelection.length; i++) {
        for (let j = 0; j < eventPriceList.length; j++) {
            if (activitySelection[i].name === eventPriceList[j].activity) {
                totalCost += eventPriceList[j].price;
            }
        }
    }
    priceTag.innerText = 'Total = $' + totalCost;
    if (activitySelection.length > 0) {
        $("#price-tag").fadeIn(500);
    } else {
        $("#price-tag").fadeOut(500);
    }
});

/************************************************************************************************
 * PAYMENT INFO SECTION: Payment sections are displayed based on the selected payment option.   *
 * Credit Card payment option is selected by default.                                           *
 ************************************************************************************************/

// const paymentFieldset = $('#payment').parent();
// console.log(paymentFieldset[0]);
$('#payment').change(() => {
    if ($('#payment').val() === 'paypal') {
        $('#payment-fieldset div:nth-last-child(2)').fadeIn();
        $('#credit-card').hide();
        $('#payment-fieldset div:nth-last-child(1)').hide();

    } else if ($('#payment').val() === 'credit_card' || $('#payment').val() === 'select_method') {
        $('#credit-card').fadeIn();
        $('#payment-fieldset div:nth-last-child(1)').hide();
        $('#payment-fieldset div:nth-last-child(2)').hide();

    } else if ($('#payment').val() === 'bitcoin') {
        $('#payment-fieldset div:nth-last-child(1)').fadeIn();
        $('#credit-card').hide();
        $('#payment-fieldset div:nth-last-child(2)').hide();
    }
});

/**************************************************************************************** 
 * FORM VALIDATION: if any of the following errors exists, the user will be prevented   *
 * from submitting the form.                                                            *
 * Restrictions:                                                                        *
 *      Name field can't be blank                                                       *
 *      Email must be a validly formatted email address.                                *
 *      At least one activity must be selected.                                         *
 *      If the selected payment option is credit card, the following must be provided:  *
 *          Credit card number (between 13 and 16 digits)                               *
 *          Zip code (5 digits)                                                         *
 *          CVV code (3 digits)                                                         *
 ****************************************************************************************/
const generateErrorMessage = (targetElement, errorMessage, customClassName) => {
    targetElement.after("<span class='error-message'>" + errorMessage + "</span>");
    $('.error-message').addClass(customClassName); // use this class for removing errors when fixed
    $('.error-message').css({marginBottom: 4, paddingTop: 2, paddingBottom: 2, paddingLeft: 15, border: '1px solid #f1a899', color: '#5f3f3f', display: 'block', background: '#fddfdf', borderRadius: 5, boxShadow: '5px 5px 10px grey'}).show();
}

/* NAME VALIDATION */
let nameCheck = (userName) => {
    let regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(userName);
}
/* Name errors tested: 
    CASE 1- Name field empty - class='name-error1'
    CASE 2- Name less than 2 characters - class='name-error2'
    CASE 3- Name longer than 30 characters - class='name-error3'
    CASE 4- Name contains numbers or special characters - class='name-error4'
*/
$('#name').focusout(() => {
    let $nameField = $('#name');
    let $nameFieldValue = $('#name').val();
    let userName = nameCheck($nameFieldValue);
    if ($nameFieldValue.length === 0 && userName === false) { //CASE 1
        if ($('.name-error1').length) {
            $('.name-error1').effect('shake');
        } else {
            generateErrorMessage($nameField, 'Oops! looks like you forgot to tell us your name.', 'name-error1');
            $('.name-error2').remove();
            $('.name-error3').remove();
            $('.name-error4').remove();
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }
    } else if ($nameFieldValue.length < 2 && userName === false) { // CASE 2
        if ($('.name-error2').length) {
            $('.name-error2').effect('shake');
        } else {
            generateErrorMessage($nameField, 'Sorry! we can only register names containing between 2 and 30 characters!', 'name-error2');
            $('.name-error1').remove();
            $('.name-error3').remove();
            $('.name-error4').remove();
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }
    } else if ($nameFieldValue.length > 30 && userName === false) { // CASE 3
        if ($('.name-error3').length) {
            $('.name-error3').effect('shake');
        } else {
            generateErrorMessage($nameField, 'Sorry! we are unable to register names longer than 30 characters.', 'name-error3');
            $('.name-error1').remove();
            $('.name-error2').remove();
            $('.name-error4').remove();
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }
    } else if (userName === false) { // CASE 4
        if ($('.name-error4').length) {
            $('.name-error4').effect('shake');
        } else {
            generateErrorMessage($nameField, 'Sorry! we cannot register names containing numbers or special characters (i.e. +, -, &, *, /, $, etc.).', 'name-error4');
            $('.name-error1').remove();
            $('.name-error2').remove();
            $('.name-error3').remove();
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }
    } else if (userName) { // VALIDATED
        $('.name-error1').remove();
        $('.name-error2').remove();
        $('.name-error3').remove();
        $('.name-error4').remove();
        $nameField.removeClass('hasError');
    }
});

/* EMAIL VALIDATION */
let emailCheck = ((email) => {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
});

$('#mail').keyup(() => {
    let $emailField = $('#mail');
    let $emailFieldValue = $('#mail').val();
    let userEmail = emailCheck($emailFieldValue);
    if (userEmail) {
        $('.email-error').remove();
        $emailField.removeClass('hasError');
    } else {
        if ($('.email-error').length) {

        } else {
            generateErrorMessage($emailField, 'Please enter your email in the following format: yourEmail@email.com.', 'email-error');
            $emailField.addClass('hasError');
        }
    }
});





/* STEP #6.1 --> FORM VALIDATION MESSAGES: Provide some kind of indication when there is a
validation error. For example, the field borders could turn red, or a message could appear near 
the field or at the top of the form. 
There should be an error indication for the Name field, Email field, Register for Activities 
check-boxes, credit card number, zip code and CVV.*/

/* STEP #7 --> When JavaScript is switched off or unavailable, the user should still have access
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