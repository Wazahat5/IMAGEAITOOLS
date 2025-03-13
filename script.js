// Image Preview Before Removing BG
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
  
  // 🔥 Remove Background Using API (with Fixed CORS Issue)
  async function removeBackground() {
    const fileInput = document.getElementById('uploadImage');
    const removedBGImage = document.getElementById('removedBGImage');
  
    if (!fileInput.files.length) {
      alert("Please upload an image first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("image_file", fileInput.files[0]);
    formData.append("size", "auto");
  
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "uMQRzqGqxx62hxuopjEGsdAi"
      },
      body: formData
    });
  
    const data = await response.blob();
  
    // ✅ Show the Image After Removing Background
    const imageURL = URL.createObjectURL(data);
    removedBGImage.src = imageURL;
  }
  