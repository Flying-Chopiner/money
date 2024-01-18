let currentStep = 1;

document.addEventListener('DOMContentLoaded', function() {
    // 处理<select>的变化
    var select = document.getElementById('gender');
    var label = select.previousElementSibling; // 获取<select>前的<label>

    select.addEventListener('change', function() {
        // 当<select>有值时，改变<label>的样式
        if (this.value) {
            label.style.position = 'absolute';
            label.style.top = '-8px';
            label.style.left = '12px';
            label.style.fontSize = '12px';
            label.style.color = '#7931F5';
            label.style.background = '#fff';
            label.style.padding = '0 5px';
            label.style.transition = '0.3s all ease';
            label.style.pointerEvents = 'none';
        } else {
            // 重置样式到默认值
            label.style.position = '';
            label.style.top = '';
            label.style.left = '';
            label.style.fontSize = '';
            label.style.color = '';
            label.style.background = '';
            label.style.padding = '';
            label.style.transition = '';
            label.style.pointerEvents = '';
        }
    });

    // 当用户有输入内容时，背景变化为浅蓝色

    // 处理输入框的内容变化
    // var inputs = document.querySelectorAll('.input-field');
    // inputs.forEach(function(input) {
        // input.addEventListener('input', function() {
            // 当输入框有内容时，添加浅蓝色背景类
            // if (input.value.trim() !== '') {
            //    input.classList.add('input-filled');
            // } else {
                // 如果输入框为空，移除背景类
                // input.classList.remove('input-filled');
            // }
       // });
    // });

    // 定义浅蓝色背景类CSS样式
    // var styleSheet = document.createElement('style');
    // styleSheet.type = 'text/css';
    // styleSheet.innerText = '.input-filled { background-color: #e6f7ff; }'; // 浅蓝色背景
    // document.head.appendChild(styleSheet);
});

// 函数用于计算字符串长度，中文字符计为2
function getLength(str) {
    let realLength = 0;
    let charCode;
    for (let i = 0; i < str.length; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        } else {
            // 中文字符计为2
            realLength += 2;
        }
    }
    return realLength;
}

function updateHeader(step) {
    const headerElement = document.querySelector('.login-header header');
    const headers = {
        2: 'Gender and Age',
        3: 'Contact Details',
        4: 'Set Your Password'
    };

    headerElement.textContent = headers[step] || 'Welcome';
}

// 调用api检测名称
function checkNicknameForToxicity(nickname) {
    return fetch('/path-to-your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nickname: nickname})
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.attributeScores && data.attributeScores.TOXICITY) {
            const toxicityScore = data.attributeScores.TOXICITY.summaryScore.value;
            return toxicityScore > 0.7; // 检测度为0.7
        }
        return false; // 假设昵称没有分数，就认为它的toxic为0
    });
}

// 假设currentStep是全局变量
function nextStep() {
    let step = document.querySelector(`.step[data-step="${currentStep}"]`);
    let isStepValid = true;

    // 验证步骤1的昵称
    if (currentStep === 1) {
        let nickname = document.getElementById('nickname').value;
        if (nickname === '') {
            alert('名称必须填写！');
            isStepValid = false;
        } else if (getLength(nickname) < 1 || getLength(nickname) > 20) {
            alert('名称长度必须在1到20个字符之间！');
            isStepValid = false;
        } else {
            let specialCharPattern = /[^\w\u4e00-\u9fa5]/gi;
            if (specialCharPattern.test(nickname)) {
            alert('名称仅支持中英文与下划线');
            isStepValid = false;
            }
        }
    }

    // 验证步骤3的手机号
    if (currentStep === 3) {
        let phone = document.getElementById('phone').value;
        if (phone === '') {
            alert('手机号必须填写！');
            isStepValid = false;
        } else if (phone.length !== 11) {
            alert('手机号必须为11位！');
            isStepValid = false;
        }
    }

    // 如果当前步骤的验证通过，则显示下一个步骤
    if (isStepValid && currentStep < 4) {
        step.style.display = 'none';
        currentStep++;
        let nextStepDiv = document.querySelector(`.step[data-step="${currentStep}"]`);
        nextStepDiv.style.display = 'block';

        // 更新标题
        updateHeader(currentStep);
    }
}

function register() {
    // 验证密码
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm_password').value;

    if (password === '') {
            alert('密码必须填写！');
            return;
        }

    if (password !== confirmPassword) {
        alert('两次输入的密码不一致！');
        return;
    }

    // 收集数据
    let data = {
        name: document.getElementById('name').value,
        nickname: document.getElementById('nickname').value,
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
       phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: password
    };

    // 发送数据到后端
    sendData(data);
}

function sendData(data) {
    // 请将 PORT 替换为您的实际端口号，假设是 3000
    const apiUrl = 'http://localhost:3000/api/register';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('注册成功！');
            // 注册成功后跳转到登录页面
            window.location.href = '/login.html';
        } else {
            alert(data.message);
            // 如果注册不成功，显示服务器返回的消息
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        // 捕获任何在请求过程中发生的错误
    });
}