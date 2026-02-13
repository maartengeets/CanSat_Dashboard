function graphDraw(cnvs, data) {
    
    const ctx = cnvs.getContext('2d');
    ctx.clearRect(0, 0, cnvs.width, cnvs.height); // Wis de canvas

    // Marges rond de grafiek
    const width = cnvs.width;
    const height = cnvs.height;
    const padding = 40;

    // Bepaal de minimale en maximale waarden in de dataset
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    // Functie om X-coördinaat te berekenen op basis van de waarde          
    function getX(i) {
      const step = (width - 2 * padding) / (data.length - 1);
      return padding + i * step;
    }

    // Functie om Y-coördinaat te berekenen op basis van de waarde
    function getY(value) {
      const usableHeight = height - 2 * padding;
      const ratio = (value - minValue) / (maxValue - minValue || 1);
      return height - padding - (ratio * usableHeight);
    }

    // Achtergrond-aslijnen
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // x-as
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    // y-as
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Lijn tekenen
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = getX(i);
      const y = getY(value);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Punten tekenen
    ctx.fillStyle = '#007bff';
    data.forEach((value, i) => {
      const x = getX(i);
      const y = getY(value);
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    });

    // Optioneel: y-labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    [minValue, maxValue].forEach(v => {
      const y = getY(v);
      ctx.fillText(v, padding - 8, y);
    });
}