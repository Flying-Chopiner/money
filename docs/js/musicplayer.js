document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekSlider = document.getElementById('seekSlider');
    const durationDisplay = document.getElementById('duration');
    const playbackRateSelector = document.getElementById('playbackRate');
    const playIcon = playPauseBtn.querySelector('.fa-play');
    const pauseIcon = playPauseBtn.querySelector('.fa-pause');
    const textContainer = document.getElementById('editor'); // 确保HTML中有这个ID的元素

    // 更新滑块位置和时间显示
    audioPlayer.addEventListener('timeupdate', function() {
        seekSlider.value = audioPlayer.currentTime;
        durationDisplay.textContent = formatTime(audioPlayer.currentTime) + ' / ' + formatTime(audioPlayer.duration);
    }, false);

    // 当加载音频元数据时设置滑块最大值
    audioPlayer.addEventListener('loadedmetadata', function() {
        seekSlider.max = audioPlayer.duration;
    });

    // 滑块控制音频播放位置
    seekSlider.addEventListener('input', function() {
        audioPlayer.currentTime = seekSlider.value;
    }, false);

    // 播放速率选择
    playbackRateSelector.addEventListener('change', function() {
        audioPlayer.playbackRate = parseFloat(this.value);
    }, false);

    // 格式化时间显示
    function formatTime(seconds) {
        seconds = Math.floor(seconds);
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
    }

    // 上传音频文件并播放
    document.getElementById('audioUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);

        audioPlayer.src = url;
        audioPlayer.load();
        audioPlayer.play();

        // 更新播放/暂停按钮的状态
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';

        // 插入音频播放器到文本容器
        if (textContainer) {
            textContainer.innerHTML = '<p>您的音频文件：</p>';
            textContainer.appendChild(audioPlayer);
        }
    }, false);

    // 播放和暂停按钮点击事件
    playPauseBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    // 监听音频播放完毕事件
    audioPlayer.addEventListener('ended', function() {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        seekSlider.value = 0; // Reset the seek slider
        durationDisplay.textContent = formatTime(0) + ' / ' + formatTime(audioPlayer.duration); // Reset time display
    });
});