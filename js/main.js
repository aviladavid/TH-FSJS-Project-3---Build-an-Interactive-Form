/****************************************************************************************
 *   TreeHouse Techdegree Full Stack JavaScript                                         *
 *   Project 3: Build an Interactive Form                                               *
 *                                                                                      *
 *                       ***** AIMING FOR EXCEEDS EXPECTATIONS *****                    *
 *                                                                                      *
 * WHAT IT DOES:                                                                        *
 *   This JavaScript code is intended to provide interactivity to a web form.           *
 ****************************************************************************************/

/*************
 * SELECTORS *
 *************/
const $form = $('#registration');
const $nameField = $('#name');
const $emailField = $('#mail');
const $creditCardField = $('#cc-num');
const $zipField = $('#zip');
const $cvvField = $('#cvv');
const $submitBtn = $('#submit-button');
const $bitcoinPayment = $('#payment-fieldset div:nth-last-child(1)');
const $paypalPayment = $('#payment-fieldset div:nth-last-child(2)');

/***************************
 * INITIAL FORM FORMATTING *
 ***************************/
$nameField.focus();
$nameField.attr('placeholder', 'i.e. Jon Snow');
$emailField.attr('placeholder', 'yourEmail@email.com');
$creditCardField.attr('placeholder', 'Must be 13 to 16 digits long');
$cvvField.attr('placeholder', 'i.e. 123');
$zipField.attr('placeholder', 'i.e. 12345');
$submitBtn.after('<div id="error-div" class="errorStyle"><ul id="error-list" ></list></div>');
$('#error-div').hide();
$bitcoinPayment.hide();
$paypalPayment.hide();

$(document).ready(() => {
    appendToErrorList('nameError', 'Name');
    appendToErrorList('emailError', 'Email');
    appendToErrorList('activityError', 'Register for Activities');
    appendToErrorList('ccError', 'Credit Card Number');
    appendToErrorList('zipError', 'ZIP code');
    appendToErrorList('cvvError', 'CVV number');
});

/******************
 * FORM BEHAVIOUR *
 ******************/
$form.submit((e) => {
    if (!validateForm()) {
        e.preventDefault();
        $('#error-div').show();
        if ('.nameError') {
            console.log('nameError exists');
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }
        if ('.emailError') {
            console.log('emailError exists');
            if ($emailField.hasClass('hasError') === false) {
                $emailField.addClass('hasError');
            }
        }
        if ('.activityError') {
            console.log('activityError exists');
            if (!$('.activity-error').length && $('.activities input:checked').length < 1) {
                generateErrorMessage($priceTagElement, 'Please select at least one activity to be able to register.', 'activity-error');
                $('.activity-error').show();
            }

        }
        if ('.ccError') {
            console.log('ccError exists');
            if ($creditCardField.hasClass('hasError') === false) {
                $creditCardField.addClass('hasError');
            }
        }
        if ('.cvvError') {
            console.log('cvvError exists');
            if ($cvvField.hasClass('hasError') === false) {
                $cvvField.addClass('hasError');
            }
        }
        if ('.zipError') {
            console.log('zipError exists');
            if ($zipField.hasClass('hasError') === false) {
                $zipField.addClass('hasError');
            }
        }
    } else {
        console.log('The form has been submitted successfully: ');
    }
});

$form.keyup(() => {
    if (!$('#error-list li')[0]) {
        $('#error-div').hide();
    }
});

/*************
 * FUNCTIONS *
 *************/
const generateErrorMessage = (errorTargetElement, errorMessage, customClassName) => {
    errorTargetElement.after("<span class='errorStyle " + customClassName + "'>" + errorMessage + "</span>");
};

const appendToErrorList = (genericErrorClass, fieldName) => {
    const $errorList = $('#error-list');
    $errorList.append('<li class="' + genericErrorClass + '">"' + fieldName + '" information missing or contains an error!</li>');
};

const nameCheck = (userName) => {
    const regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(userName);
};

const emailCheck = (userEmail) => {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(userEmail);
};

const creditCardNumberCheck = (creditCardNumber) => {
    const regex = /^[0-9]{13,16}$/;
    return regex.test(creditCardNumber);
};

const zipCheck = (zipNumber) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(zipNumber);
};


const cvvCheck = (zipNumber) => {
    const regex = /^[0-9]{3}$/;
    return regex.test(zipNumber);
};

const validateBasicInfo = () => {
    let isBasicInfoValid = false;
    let userName = nameCheck($nameField.val());
    let userEmail = emailCheck($emailField.val());
    if (userName && userEmail && $('.activities input:checked').length > 0) {
        isBasicInfoValid = true;
    }
    return isBasicInfoValid;
};

const validatePaymentInfo = () => {
    let isPaymentInfoValid = false;
    let userCC = creditCardNumberCheck($creditCardField.val());
    let userZip = zipCheck($zipField.val());
    let userCvv = cvvCheck($cvvField.val());
    if ($('#payment').val() === 'credit_card') {
        if (userCC && userZip && userCvv) {
            isPaymentInfoValid = true;
        }
    } else {
        isPaymentInfoValid = true;
    }
    return isPaymentInfoValid;
};

const validateForm = () => {
    let formValid = false;
    let userBasicInfo = validateBasicInfo();
    let userPaymentInfo = validatePaymentInfo();
    //Form validity
    if (userBasicInfo && userPaymentInfo) {
        formValid = true;
    }
    return formValid;
};


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
        $('#select-theme').hide();
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
const eventPriceList = [
    { activity: 'all', price: 200 },
    { activity: 'js-frameworks', price: 100 },
    { activity: 'js-libs', price: 100 },
    { activity: 'express', price: 100 },
    { activity: 'node', price: 100 },
    { activity: 'build-tools', price: 100 },
    { activity: 'npm', price: 100 }
];

/* PRICE TAG CALCULATOR */
const priceTag = document.createElement('h3');
$(priceTag).attr('id', 'price-tag');
$('.activities').append(priceTag);
$("#price-tag").hide();
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
        $("#price-tag").show();
    } else {
        $("#price-tag").hide();
    }
});

/*********************************************************************************************
 * PAYMENT INFO SECTION: Payment sections are displayed based on the selected payment option *
 * Credit Card payment option is selected by default.                                        *
 *********************************************************************************************/
$('#payment').change(() => {
    if ($('#payment').val() === 'paypal') {
        $('#payment-fieldset div:nth-last-child(2)').fadeIn();
        $('#credit-card').hide();
        $('#payment-fieldset div:nth-last-child(1)').hide();
        $('.ccError').remove();
        $('.zipError').remove();
        $('.cvvError').remove();

    } else if ($('#payment').val() === 'credit_card') {
        $('#credit-card').fadeIn();
        $('#payment-fieldset div:nth-last-child(1)').hide();
        $('#payment-fieldset div:nth-last-child(2)').hide();
        appendToErrorList('ccError', 'Credit Card Number');
        appendToErrorList('zipError', 'ZIP code');
        appendToErrorList('cvvError', 'CVV number');

    } else if ($('#payment').val() === 'bitcoin') {
        $('#payment-fieldset div:nth-last-child(1)').fadeIn();
        $('#credit-card').hide();
        $('#payment-fieldset div:nth-last-child(2)').hide();
        $('.ccError').remove();
        $('.zipError').remove();
        $('.cvvError').remove();
    }
});

/********************************************************************************************
 * FORM VALIDATION: if any of the below errors exists, the user is be prevented             *
 * from submitting the form, a generic error is added below the "Register" button and a     *
 * specific error added below the corresponding field.                                      *
 * Restrictions:                                                                            *
 *    - Name field can't be blank, names cant contain numbers or special characters and     *
 *      cannot have less than 2 character or more than 30.                                  *
 *    - Email must be a validly formatted email address.                                    *
 *    - At least one activity must be selected.                                             *
 *    - If the selected payment option is credit card, the following must be provided:      *
 *          Credit card number (between 13 and 16 digits, no letters or special characters) *
 *          Zip code (5 digits, no letters or special characters)                           *
 *          CVV code (3 digits, no letters or special characters)                           *
 ********************************************************************************************/

/* NAME VALIDATION */
/* Name errors tested: 
    CASE 1- Name field empty - class='name-error1'
    CASE 2- Name less than 2 characters - class='name-error2'
    CASE 3- Name longer than 30 characters - class='name-error3'
    CASE 4- Name contains numbers or special characters - class='name-error4'
*/
$nameField.focusout(() => {
    const $nameFieldValue = $nameField.val();
    const userName = nameCheck($nameFieldValue);

    if ($nameFieldValue.length === 0 && userName === false) { //CASE 1
        if (!$('.nameError').length) {
            appendToErrorList('nameError', 'Name');
        }
        if (!$('.name-error1').length) {
            generateErrorMessage($nameField, 'Don\'t forget to tell us your name.', 'name-error1');
            $('.name-error2').remove();
            $('.name-error3').remove();
            $('.name-error4').remove();
            $nameField.removeClass('validated');
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }

    } else if ($nameFieldValue.length < 2 && userName === false) { // CASE 2
        if (!$('.nameError').length) {
            appendToErrorList('nameError', 'Name');
        }
        if (!$('.name-error2').length) {
            generateErrorMessage($nameField, 'We can only register names containing between 2 and 30 characters!', 'name-error2');
            $('.name-error1').remove();
            $('.name-error3').remove();
            $('.name-error4').remove();
            $nameField.removeClass('validated');
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }

    } else if ($nameFieldValue.length > 30 && userName === false) { // CASE 3
        if (!$('.nameError').length) {
            appendToErrorList('nameError', 'Name');
        }
        if (!$('.name-error3').length) {
            generateErrorMessage($nameField, 'We are unable to register names longer than 30 characters.', 'name-error3');
            $('.name-error1').remove();
            $('.name-error2').remove();
            $('.name-error4').remove();
            $nameField.removeClass('validated');
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }

    } else if (!userName) { // CASE 4
        if (!$('.nameError').length) {
            appendToErrorList('nameError', 'Name');
        }
        if (!$('.name-error4').length) {
            generateErrorMessage($nameField, 'We cannot register names containing numbers or special characters (i.e. +, -, &, *, /, $, etc.).', 'name-error4');
            $('.name-error1').remove();
            $('.name-error2').remove();
            $('.name-error3').remove();
            $nameField.removeClass('validated');
            if ($nameField.hasClass('hasError') === false) {
                $nameField.addClass('hasError');
            }
        }

    } else if (userName) { // VALIDATED
        $('.name-error1').remove();
        $('.name-error2').remove();
        $('.name-error3').remove();
        $('.name-error4').remove();
        $('.nameError').remove();
        $nameField.removeClass('hasError');
        $nameField.addClass('validated');
    }
});

/* EMAIL VALIDATION */
$emailField.keyup(() => {
    const $emailFieldValue = $('#mail').val();
    const userEmail = emailCheck($emailFieldValue);
    if (userEmail) {
        $('.email-error').remove();
        $('.emailError').remove();
        $emailField.removeClass('hasError');
        $emailField.addClass('validated');
    } else {
        if (!$('.emailError').length) {
            appendToErrorList('emailError', 'Email');
        }

        if (!$('.email-error').length) {
            generateErrorMessage($emailField, 'Please enter your email in the following format: yourEmail@email.com', 'email-error');
            $emailField.addClass('hasError');
            $emailField.removeClass('validated');
        }
    }
});

/* ACTIVITIES VALIDATION */
/* Error message is attached to the price tag element */
const $priceTagElement = $('#price-tag');

$('.activities input').click(() => {
    if ($('.activities input:checked').length < 1) {
        if (!$('.activity-error').length) {
            generateErrorMessage($priceTagElement, 'Please select at least one activity to be able to register.', 'activity-error');
        }
        $('.activity-error').show();
        appendToErrorList('activityError', 'Activity Selection');
    } else {
        $('.activity-error').remove();
        $('.activityError').remove();
    }
});


/* CREDIT CARD VALIDATION */
/* CC number errors tested: 
    CASE 1- CC field empty - class='cc-error1'
    CASE 2- CC number less than 13 characters - class='cc-error2'
    CASE 3- CC number longer than 16 characters - class='cc-error3'
    CASE 4- CC number contains characters other than numbers - class='cc-error4'
*/
$creditCardField.keyup(() => {
    const $creditCardFieldValue = $creditCardField.val();
    const userCreditCardNumber = creditCardNumberCheck($creditCardFieldValue);
    if ($creditCardFieldValue.length === 0 && userCreditCardNumber === false) { //CASE 1
        if (!$('.ccError').length) {
            appendToErrorList('ccError', 'Credit Card Number');
        }
        if (!$('.cc-error1').length) {
            generateErrorMessage($creditCardField, 'Oops! looks like you forgot to tell us your credit card number.', 'cc-error1');
            $('.cc-error2').remove();
            $('.cc-error3').remove();
            $('.cc-error4').remove();
            $creditCardField.removeClass('validated');
            if ($creditCardField.hasClass('hasError') === false) {
                $creditCardField.addClass('hasError');
            }
        }

    } else if ($creditCardFieldValue.length < 13 && userCreditCardNumber === false) { // CASE 2
        if (!$('.ccError').length) {
            appendToErrorList('ccError', 'Credit Card Number');
        }
        if (!$('.cc-error2').length) {
            generateErrorMessage($creditCardField, 'Your credit card number must contain at least 13 digits.', 'cc-error2');
            $('.cc-error1').remove();
            $('.cc-error3').remove();
            $('.cc-error4').remove();
            $creditCardField.removeClass('validated');
            if ($creditCardField.hasClass('hasError') === false) {
                $creditCardField.addClass('hasError');
            }
        }

    } else if ($creditCardFieldValue.length > 16 && userCreditCardNumber === false) { // CASE 3
        if (!$('.ccError').length) {
            appendToErrorList('ccError', 'Credit Card Number');
        }
        if (!$('.cc-error3').length) {
            generateErrorMessage($creditCardField, 'Your credit card number cannot contain more than 16 digits.', 'cc-error3');
            $('.cc-error1').remove();
            $('.cc-error2').remove();
            $('.cc-error4').remove();
            $creditCardField.removeClass('validated');
            if ($creditCardField.hasClass('hasError') === false) {
                $creditCardField.addClass('hasError');
            }
        }

    } else if (userCreditCardNumber === false) { // CASE 4
        if (!$('.ccError').length) {
            appendToErrorList('ccError', 'Credit Card Number');
        }
        if (!$('.cc-error4').length) {
            generateErrorMessage($creditCardField, 'Your credit card number cannot contain letters or special characters (i.e. +, -, &, *, /, $, etc.).', 'cc-error4');
            $('.cc-error1').remove();
            $('.cc-error2').remove();
            $('.cc-error3').remove();
            $creditCardField.removeClass('validated');
            if ($creditCardField.hasClass('hasError') === false) {
                $creditCardField.addClass('hasError');
            }
        }

    } else if (userCreditCardNumber) { // VALIDATED
        $('.cc-error1').remove();
        $('.cc-error2').remove();
        $('.cc-error3').remove();
        $('.cc-error4').remove();
        $('.ccError').remove();
        $creditCardField.removeClass('hasError');
        $creditCardField.addClass('validated');
    }
});

/* ZIP CODE VALIDATION */
/* Zip number errors tested: 
    CASE 1- Zip field empty - class='zip-error1'
    CASE 2- zipCheck === false - class='zip-error2'
*/
$zipField.keyup(() => {
    const $zipFieldValue = $zipField.val();
    const userZip = zipCheck($zipFieldValue);

    if ($zipFieldValue.length === 0 && userZip === false) { //CASE 1
        if (!$('.zipError').length) {
            appendToErrorList('zipError', 'Zip Number');
        }
        if (!$('.zip-error1').length) {
            generateErrorMessage($zipField, 'Please enter your ZIP code.', 'zip-error1');
            $('.zip-error2').remove();
            $zipField.removeClass('validated');
            if ($zipField.hasClass('hasError') === false) {
                $zipField.addClass('hasError');
            }
        }

    } else if (userZip === false) { // CASE 2
        if (!$('.zipError').length) {
            appendToErrorList('zipError', 'Zip Number');
        }
        if (!$('.zip-error2').length) {
            generateErrorMessage($zipField, 'ZIP codes contain exactly 5 digits. No letters or special characters are allowed.', 'zip-error2');
            $('.zip-error1').remove();
            $zipField.removeClass('validated');
            if ($zipField.hasClass('hasError') === false) {
                $zipField.addClass('hasError');
            }
        }

    } else if (userZip) { // VALIDATED
        $('.zip-error1').remove();
        $('.zip-error2').remove();
        $('.zipError').remove();
        $zipField.removeClass('hasError');
        $zipField.addClass('validated');
    }
});

/* CVV VALIDATION */
/* CVV errors tested: 
    CASE 1- CVV field empty - class='cvv-error1'
    CASE 2- cvvCheck === false - class='cvv-error2'
*/
$cvvField.keyup(() => {
    const $cvvFieldValue = $cvvField.val();
    const userCvvNumber = cvvCheck($cvvFieldValue);
    if ($cvvFieldValue.length === 0 && userCvvNumber === false) { //CASE 1
        if (!$('.cvvError').length) {
            appendToErrorList('cvvError', 'CVV Number');
        }
        if (!$('.cvv-error1').length) {
            generateErrorMessage($cvvField, 'Please enter your CVV code.', 'cvv-error1');
            $('.cvv-error2').remove();
            $cvvField.removeClass('validated');
            if ($cvvField.hasClass('hasError') === false) {
                $cvvField.addClass('hasError');
            }
        }
    } else if (userCvvNumber === false) { // CASE 2
        if (!$('.cvvError').length) {
            appendToErrorList('cvvError', 'CVV Number');
            console.log('CVV regex-error added correctly!');
        }
        if (!$('.cvv-error2').length) {
            generateErrorMessage($cvvField, 'CVV codes contain exactly 3 digits. No letters or special characters are allowed.', 'cvv-error2');
            $('.cvv-error1').remove();
            $cvvField.removeClass('validated');
            if ($cvvField.hasClass('hasError') === false) {
                $cvvField.addClass('hasError');
            }
        }
    } else if (userCvvNumber) { // VALIDATED
        $('.cvv-error1').remove();
        $('.cvv-error2').remove();
        $('.cvvError').remove();
        $cvvField.removeClass('hasError');
        $cvvField.addClass('validated');
    }
});