// JavaScript for 進能服 (6692) 雙曲線成長戰略網頁

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollSpy();
  initOKRTabs();
  initPendingItemsFilter();
  initCharts();
});

// 1. Theme Toggle (Dark / Light)
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleBtnText(toggleBtn, currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleBtnText(toggleBtn, newTheme);
  });
}

function updateToggleBtnText(btn, theme) {
  btn.innerHTML = theme === 'dark' 
    ? '☀️ 淺色模式' 
    : '🌙 深色模式';
}

// 2. Navigation ScrollSpy
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 3. OKR Tabs Filtering
function initOKRTabs() {
  const tabBtns = document.querySelectorAll('.okr-tab-btn');
  const okrCards = document.querySelectorAll('.okr-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetDivision = btn.getAttribute('data-division');
      okrCards.forEach(card => {
        if (targetDivision === 'all' || card.getAttribute('data-division') === targetDivision) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. Pending Items Search & Filter
function initPendingItemsFilter() {
  const searchInput = document.getElementById('pendingSearchInput');
  const priorityFilter = document.getElementById('priorityFilter');
  const rows = document.querySelectorAll('.pending-item-row');

  if (!searchInput || !priorityFilter) return;

  function filterItems() {
    const query = searchInput.value.toLowerCase();
    const selectedPriority = priorityFilter.value;

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const priority = row.getAttribute('data-priority');

      const matchesSearch = text.includes(query);
      const matchesPriority = selectedPriority === 'all' || priority === selectedPriority;

      if (matchesSearch && matchesPriority) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterItems);
  priorityFilter.addEventListener('change', filterItems);
}

// 5. Chart.js Visualizations
function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart 1: O&M Regional Density (MW / Priority)
  const omCtx = document.getElementById('omCoverageChart')?.getContext('2d');
  if (omCtx) {
    new Chart(omCtx, {
      type: 'bar',
      data: {
        labels: ['台南/高雄/屏東 (P0)', '彰化/雲林/嘉義 (P1)', '桃園/新竹/苗栗 (P2)', '東部/離島 (P3)'],
        datasets: [{
          label: '預計營運據點數 (站)',
          data: [3, 2, 1, 0],
          backgroundColor: ['#10b981', '#06b6d4', '#3b82f6', '#9ca3af'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: '維運事業區域據點佈局規劃 (據點數)', color: '#9ca3af' }
        },
        scales: {
          y: { ticks: { precision: 0 } }
        }
      }
    });
  }

  // Chart 2: Synergy Radar / Distribution
  const synergyCtx = document.getElementById('synergyChart')?.getContext('2d');
  if (synergyCtx) {
    new Chart(synergyCtx, {
      type: 'doughnut',
      data: {
        labels: ['ATMOCE (利基產品)', '維運事業 (存量1GW)', '建坤 (SPV電廠)', 'CPO (充電服務)', '綠電售電業 (通路)', 'AIDC (算力統包)'],
        datasets: [{
          data: [15, 20, 20, 15, 15, 15],
          backgroundColor: ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { color: '#9ca3af' } },
          title: { display: true, text: '六大事業部資源與價值鏈佔比', color: '#9ca3af' }
        }
      }
    });
  }
}
