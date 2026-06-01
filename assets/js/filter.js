document.querySelectorAll('.filter').forEach(function(btn) {
  btn.addEventListener('click', function() {
    // update active state
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
    this.classList.add('active');

    var filter = this.dataset.filter;

    document.querySelectorAll('.row[data-category]').forEach(function(row) {
      if (filter === 'all' || row.dataset.category === filter) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
});