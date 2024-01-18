let currentStep = 1;

function nextStep() {
    let step = document.querySelector(`.step[data-step="${currentStep}"]`);
    // 验证手机号
    let phone = document.getElementById('phone').value;
    if (phone === '') {
        alert('手机号必须填写！');
        return;
    }

    if (currentStep < 2) {
        step.style.display = 'none';
        currentStep++;
        const nextStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
        nextStepElement.style.display = 'block';

        // 将输入的手机号填充到第二步的手机号输入框
        const phoneStep2 = nextStepElement.querySelector('#phone-step2');
        if (phoneStep2) {
            phoneStep2.value = phone;
        }

        let loginHeader = document.querySelector('.login-header header');
        loginHeader.textContent = 'Enter your password';
    }
}

function enroll() {
    // Get the phone number and password from the input fields
    let phone = document.getElementById(currentStep === 1 ? 'phone' : 'phone-step2').value;
    let password = document.getElementById('password').value;

    // Define the account details
    let accounts = {
        "3200591741": "wutuobang001",
        "1214505041": "wutuobang002"

    };

    // Check if the entered phone number and password match one of the accounts
    if (accounts[phone] && password === accounts[phone]) {
        // Redirect to donate.html
        window.location.href = 'https://flying-chopiner.github.io/money2/';
    } else {
        // If the account does not exist or the password is wrong, show an alert
        alert('账号不存在');
    }
}
