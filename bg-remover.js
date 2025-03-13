// 🎯 Preview Original Image
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

// ✅ Remove Background Using API
async function removeBackground() {
  const fileInput = document.getElementById('uploadImage');
  const formatSelect = document.getElementById('formatSelect').value;
  const removedBGImage = document.getElementById('removedBGImage');
  const downloadBtn = document.getElementById('downloadBtn');

  if (!fileInput.files.length) {
    alert("Please upload an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("image_file", fileInput.files[0]);
  formData.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "HiXtxum1B4MEoirJnTQxsV3j"
    },
    body: formData
  });

  const blobData = await response.blob();

  // 🎯 Convert Blob to Image File
  const reader = new FileReader();
  reader.readAsDataURL(blobData);
  reader.onloadend = () => {
    const base64data = reader.result;

    // ✅ Show After Preview
    removedBGImage.src = base64data;

    // 🎯 Download Option
    downloadBtn.href = base64data;
    downloadBtn.download = `bg-removed.${formatSelect}`;
    downloadBtn.style.display = 'block';
  };
}
