function displayChatbotList() {
    const chatbotList = JSON.parse(localStorage.getItem("chatbots")) || [];
    const chatbotListElement = document.getElementById("chatbotList");
    chatbotListElement.innerHTML = "";
  
    chatbotList.forEach((chatbot, index) => {
        const capitalizedChatbotName = chatbot.name
          .split(" - ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" - ");
      
        const chatbotElement = document.createElement("div");
        chatbotElement.className = "chatbot-box";
      
        const chatbotItem = document.createElement("div");
        chatbotItem.className = "chatbot-item";
        chatbotItem.innerHTML = `
          <h2>${capitalizedChatbotName}</h2>
        `;
        chatbotElement.appendChild(chatbotItem);

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const openButton = document.createElement("button");
        openButton.textContent = "Open";
        openButton.onclick = () => openChatbot(index);
        buttonContainer.appendChild(openButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        removeButton.onclick = () => removeChatbot(index);
        buttonContainer.appendChild(removeButton);

        chatbotElement.appendChild(buttonContainer);
        chatbotListElement.appendChild(chatbotElement);
      });
      
  }
  
  function removeChatbot(index) {
    const chatbotList = JSON.parse(localStorage.getItem("chatbots")) || [];
    chatbotList.splice(index, 1);
    localStorage.setItem("chatbots", JSON.stringify(chatbotList));
    displayChatbotList();
  }
    
  
  function openChatbot(index) {
    const chatbotList = JSON.parse(localStorage.getItem("chatbots")) || [];
    sessionStorage.setItem("systemPrompt", chatbotList[index].prompt);
    window.location.href = "chat.html";
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  document.getElementById("createNewBot").addEventListener("click", () => {
    window.location.href = "bot-creator.html";
  });
  
  displayChatbotList();
  