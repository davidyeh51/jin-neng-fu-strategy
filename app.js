// JavaScript for 進能服 (6692) 三曲線三年成長計畫 (FY26~FY28) 董事會版網頁

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

  // Chart 1: Three-Curve Revenue Index Projections (FY26~FY28)
  const curveRevenueCtx = document.getElementById('threeCurveRevenueChart')?.getContext('2d');
  if (curveRevenueCtx) {
    new Chart(curveRevenueCtx, {
      type: 'bar',
      data: {
        labels: ['FY26 固本啟航 (示意)', 'FY27 資產放量 (示意)', 'FY28 閉環規模化 (示意)'],
        datasets: [
          {
            label: '第一曲線 (現金引擎: 光伏/儲能銷售/維運)',
            data: [100, 118, 125],
            backgroundColor: '#f59e0b',
            borderRadius: 6
          },
          {
            label: '第二曲線 (供給側: ATMOCE/維運1GW/建坤SPV)',
            data: [8, 40, 95],
            backgroundColor: '#10b981',
            borderRadius: 6
          },
          {
            label: '第三曲線 (需求側: CPO/售電業中樞/AIDC)',
            data: [0, 10, 50],
            backgroundColor: '#06b6d4',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#9ca3af' } },
          title: { display: true, text: '三曲線相對營收指數接力趨勢 (以 FY26 第一曲線 = 100 為基準)', color: '#9ca3af' }
        },
        scales: {
          x: { stacked: false, ticks: { color: '#9ca3af' } },
          y: { ticks: { color: '#9ca3af' }, title: { display: true, text: '相對指數', color: '#9ca3af' } }
        }
      }
    });
  }

  // Chart 2: O&M Regional Density (P0-P3)
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
          y: { ticks: { precision: 0, color: '#9ca3af' } },
          x: { ticks: { color: '#9ca3af' } }
        }
      }
    });
  }

  // Chart 3: Capital Structure & Off-Balance Sheet Protection
  const capCtx = document.getElementById('capitalStructureChart')?.getContext('2d');
  if (capCtx) {
    new Chart(capCtx, {
      type: 'doughnut',
      data: {
        labels: ['建坤 SPV (國泰 95.1% 表外資金)', 'ATMOCE 產品 (壽險/法人 AUM 募資)', 'AIDC 專案 (富邦能源合資)', '進能服自有 CapEx (維運擴張/團隊)'],
        datasets: [{
          data: [50, 20, 20, 10],
          backgroundColor: ['#f59e0b', '#10b981', '#06b6d4', '#8b5cf6']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { color: '#9ca3af' } },
          title: { display: true, text: '三曲線重資本出資來源規劃（極小化進能服自有 CapEx 壓力）', color: '#9ca3af' }
        }
      }
    });
  }
}
