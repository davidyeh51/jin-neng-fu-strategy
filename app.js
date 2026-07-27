// JavaScript for 進能服 (6692) 成長戰略 v5

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
  btn.innerHTML = theme === 'dark' ? '☀️ 淺色模式' : '🌙 深色模式';
}

// 2. Navigation ScrollSpy
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
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
        card.style.display = (targetDivision === 'all' || card.getAttribute('data-division') === targetDivision) ? 'block' : 'none';
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

      row.style.display = (matchesSearch && matchesPriority) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', filterItems);
  priorityFilter.addEventListener('change', filterItems);
}

// 5. Chart.js Visualizations
function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart 1: Serialized Priority & Cash Flow Timeline
  const priorityCtx = document.getElementById('priorityTimelineChart')?.getContext('2d');
  if (priorityCtx) {
    new Chart(priorityCtx, {
      type: 'bar',
      data: {
        labels: ['P0 建坤 SPV (FY26)', 'P0 維運 50MW (FY26)', 'P1 售電業 (FY27)', 'P1 ATMOCE 儲能 (FY27)', 'P2 AIDC 算力 (FY28)', 'P3 CPO (主動延後)'],
        datasets: [
          {
            label: '自身資本消耗強度 (高/中/低)',
            data: [1, 2, 4, 3, 1, 5],
            backgroundColor: '#06b6d4',
            borderRadius: 6
          },
          {
            label: '管理注意力需求強度 (高/中/低)',
            data: [3, 5, 3, 3, 5, 3],
            backgroundColor: '#f59e0b',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#9ca3af' } },
          title: { display: true, text: '六大事業部資本 vs 管理注意力雙軸評估 (強度分數)', color: '#9ca3af' }
        },
        scales: {
          y: { ticks: { color: '#9ca3af' }, title: { display: true, text: '相對強度 (1=極低, 5=極高)', color: '#9ca3af' } },
          x: { ticks: { color: '#9ca3af' } }
        }
      }
    });
  }

  // Chart 2: Divide & Conquer Factor Breakdown
  const factorCtx = document.getElementById('factorCategoryChart')?.getContext('2d');
  if (factorCtx) {
    new Chart(factorCtx, {
      type: 'pie',
      data: {
        labels: ['可控因素 (100% 資源投入)', '半可控因素 (持有電廠/策略施力)', '不可控因素 (情境準備/不讓卡住)'],
        datasets: [{
          data: [10, 3, 6],
          backgroundColor: ['#10b981', '#06b6d4', '#f43f5e']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { color: '#9ca3af' } },
          title: { display: true, text: '分而治之 (Divide & Conquer) 因素類型比例', color: '#9ca3af' }
        }
      }
    });
  }

  // Chart 3: HQ 3-Stage Evolution
  const hqCtx = document.getElementById('hqStageChart')?.getContext('2d');
  if (hqCtx) {
    new Chart(hqCtx, {
      type: 'doughnut',
      data: {
        labels: ['階段一 (FY26): 投資併購職能', '階段二 (FY27): 數據平台 (監控/鑑價)', '階段三 (FY28): 技術中台 (EMS/SOFC)'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { color: '#9ca3af' } },
          title: { display: true, text: '強中央 (Strong HQ) 三階段職能發展權重', color: '#9ca3af' }
        }
      }
    });
  }
}
