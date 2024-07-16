import "./styles.css";

document.addEventListener('DOMContentLoaded', () => {
  const fetchData = async () => {
    try {
      const response = await fetch('/data');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.values;
    } catch (error) {
      console.error('Error fetching data:', error);
      displayError('Failed to fetch data. Please try again later.');
      return null;
    }
  };

  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContent = document.getElementById('tab-content');
  const tabSelect = document.getElementById('places');

  tabSelect.addEventListener('change', async (e) => {
    const category = e.target.value;
    tabButtons.forEach(btn => {
      btn.getAttribute('data-tab') === category ?
        btn.classList.add('active') :
        btn.classList.remove('active');
    });

    const values = await fetchData();
    if (values) {
      const filteredData = values.filter(row => row[0] === category);
      renderTabContent(filteredData);
    }
    window.scrollTo(0,0)
  });

  tabButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const category = button.getAttribute('data-tab');
      tabSelect.value = category;
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const values = await fetchData();
      if (values) {
        const filteredData = values.filter(row => row[0] === category);
        renderTabContent(filteredData);
      }
      window.scrollTo(0,0)
    });
  });

  const renderTabContent = (items) => {
    tabContent.innerHTML = '';
    items.forEach(item => {
      if (!item[1]) return;
      const card = document.createElement('div');
      card.className = 'card';
      const link = item[3] ? `<a href="${item[3]}" target="_blank">Daha fazla bilgi</a>` : '';
      card.innerHTML = `
                <h3>${item[1] ?? ''}</h3>
                <p><strong>Adres:</strong> ${item[2] ?? ''}</p>
                <p><strong>Kısa Bilgi:</strong> ${item[4] ?? ''}</p>
                <p><strong>Açıklama:</strong> ${item[5] ?? ''}</p>
                ${link}
            `;
      tabContent.appendChild(card);
    });
  };

  const displayError = (message) => {
    tabContent.innerHTML = `<div class="error">${message}</div>`;
  };

  // Initially render the first category
  if (tabButtons.length > 0) {
    tabButtons[0].click();
  }
});
