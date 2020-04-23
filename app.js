// Submit form
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // hide results
    document.querySelector('#results').style.display = 'none';

    // Show Loader
    document.querySelector('#loading').style.display = 'block';

    // Set Time to calculate results
    setTimeout(calculateResult, 2000);

    e.preventDefault();
});

// function for calculateResult
function calculateResult (e) {
    
    // UI Vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Compute for monthly Payments
    const x  = Math.pow(1 + calculatedInterest, calculatedPayment);  
    const monthly = (principal*x*calculatedInterest) / (x-1);


    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        // show results
        document.querySelector('#results').style.display = 'block';

        // hide loader
        document.querySelector('#loading').style.display = 'none';
    } else {
        // alert('Please Check your numbers');
        showError('Please Check your numbers!');

        // hide loader
        document.querySelector('#loading').style.display = 'none';
    }

    // Clear Text Field after
    function clearTextField () {
        amount.value = '';
        interest.value = '';
        years.value = '';
    }

    clearTextField();
}

function showError (error) {
    // Get Elements to insert
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // insert Error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 1s
    setTimeout(clearError, 1000);
}

function clearError () {
    document.querySelector('.alert').remove();
}