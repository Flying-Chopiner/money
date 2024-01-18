document.addEventListener('DOMContentLoaded', (event) => {
    // Get the button by its ID
    var loginButton = document.getElementById('loginbtn');
    var regButton   = document.getElementById('regbtn');

    // Add a click event listener to the button
    loginButton.addEventListener('click', function() {
        // Navigate to enroll.html
        window.location.href = 'enroll.html';
    });

    // Add another click event listener to other button
    regButton.addEventListener('click', function() {
        // Navigate to enroll.html
        window.location.href = 'register.html';
    });
});