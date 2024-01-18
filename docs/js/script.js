const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekSlider = document.getElementById('seekSlider');
const durationDisplay = document.getElementById('duration');
const playbackRateSelector = document.getElementById('playbackRate');

// 上传音频文件
document.getElementById('audioUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    audioPlayer.src = url;
    // 不要立即显示暂停图标，保持播放图标
    playPauseBtn.querySelector('.fa-play').style.display = 'inline-block';
    playPauseBtn.querySelector('.fa-pause').style.display = 'none';
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('audioPlayer');
    var audioUpload = document.getElementById('audioUpload');
    var playPauseBtn = document.getElementById('playPauseBtn');
    var playIcon = playPauseBtn.querySelector('.fa-play');
    var pauseIcon = playPauseBtn.querySelector('.fa-pause');
    var textContainer = document.getElementById('text-container');

    // 文件上传事件
    audioUpload.addEventListener('change', function(event) {
        var files = event.target.files;
        if (files.length === 0) {
            return;
        }
        var mp3File = files[0];
        if (mp3File.type !== 'audio/mpeg') {
            alert('请选择 MP3 格式的文件。');
            return;
        }
        audio.src = URL.createObjectURL(mp3File);
        audio.load();
        audio.play();

        // 更新播放/暂停按钮的状态
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';

        // 插入音频播放器到文本容器
        textContainer.innerHTML = '<p>您的音频文件：</p>';
        textContainer.appendChild(audio);
    });

    // 播放和暂停按钮点击事件
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    // 监听音频播放完毕事件
    audio.addEventListener('ended', function() {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    });
});

// 更新滑块位置
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
    audioPlayer.playbackRate = this.value;
}, false);

// 格式化时间显示
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}
