export function qrImageUrl(value) {
  const encoded = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="white"/><path fill="black" d="M12 12h62v62H12zM22 22h42v42H22zM34 34h18v18H34zM166 12h62v62h-62zM176 22h42v42h-42zM188 34h18v18h-18zM12 166h62v62H12zM22 176h42v42H22zM34 188h18v18H34zM92 12h12v12H92zM116 12h12v24h-12zM92 44h24v12H92zM128 48h12v24h-12zM92 80h12v24H92zM116 80h36v12h-36zM164 88h12v24h-12zM188 84h12v36h-12zM212 92h16v12h-16zM80 116h24v12H80zM116 104h12v36h-12zM140 116h36v12h-36zM200 128h28v12h-28zM80 140h12v24H80zM104 148h24v12h-24zM140 144h12v24h-12zM164 152h24v12h-24zM200 152h12v24h-12zM92 184h12v36H92zM116 176h24v12h-24zM128 200h36v12h-36zM176 184h12v36h-12zM200 192h28v12h-28z"/><text x="120" y="238" text-anchor="middle" font-size="7" font-family="sans-serif">${encoded}</text></svg>`)}`;
}
export function checkpointUrl(locationId) {
  return `${location.origin}${location.pathname.replace(/[^/]*$/, '')}checkpoint.html?location=${encodeURIComponent(locationId)}`;
}
export function printQrCards(container) {
  const cards = container.querySelectorAll('.qr-card');
  cards.forEach((card) => card.classList.add('print-ready'));
  window.print();
  cards.forEach((card) => card.classList.remove('print-ready'));
}
