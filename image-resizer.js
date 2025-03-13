// ✅ Preview Original Image
function previewImage(event) {
  const input = event.target;
  const preview = document.getElementById('originalImage');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => preview.src = e.target.result;
    reader.readAsDataURL(file);
  }
}

// ✅ Resize Image Function
function resizeImage() {
  const originalImage = document.getElementById('originalImage');
  const widthInput = document.getElementById('widthInput').value;
  const heightInput = document.getElementById('heightInput').value;
  const resizedImage = document.getElementById('resizedImage');
  const downloadBtn = document.getElementById('downloadBtn');

  if (!originalImage.src) {
    alert("Please upload an image first!");
    return;
  }

  if (!widthInput || !heightInput) {
    alert("Please enter both width and height!");
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = widthInput;
  canvas.height = heightInput;

  const img = new Image();
  img.src = originalImage.src;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, widthInput, heightInput);
    const resizedDataUrl = canvas.toDataURL('image/png');

    resizedImage.src = resizedDataUrl;

    // ✅ Working Download Button
    downloadBtn.href = resizedDataUrl;
    downloadBtn.download = 'resized-image.png';
    downloadBtn.style.display = 'block';
  };
}
