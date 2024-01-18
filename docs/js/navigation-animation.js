document.addEventListener('DOMContentLoaded', (event) => {
  const navItems = document.querySelectorAll('nav a');
  const highlight = document.querySelector('.navanim');

  // 设置滑块初始位置到第二个导航项
  if (navItems.length > 1) {
    const secondNavItem = navItems[1]; // 获取第二个导航项
    highlight.style.left = `${secondNavItem.offsetLeft}px`;
    highlight.style.width = `${secondNavItem.offsetWidth}px`;
    highlight.style.opacity = '1'; // 使滑块可见
  }

  navItems.forEach((item, index) => {
    item.addEventListener('mouseenter', (e) => {
      // 仅当不是第一个导航项时调整滑块位置
      if (index !== 0) {
        highlight.style.left = `${e.target.offsetLeft}px`;
        highlight.style.width = `${e.target.offsetWidth}px`;
        highlight.style.opacity = '1';
      }
    });

    item.addEventListener('mouseleave', (e) => {
      // 当鼠标离开非第一个导航项时，滑块回到第二个导航项位置
      if (index !== 0) {
        const secondNavItem = navItems[1];
        highlight.style.left = `${secondNavItem.offsetLeft}px`;
        highlight.style.width = `${secondNavItem.offsetWidth}px`;
      }
    });
  });
});