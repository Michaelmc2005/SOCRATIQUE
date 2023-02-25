const container = document.querySelector('.container');
let isDragging = false;
let initialX;
let initialY;
let currentX;
let currentY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener('mousedown', dragStart);
container.addEventListener('mousemove', drag);
container.addEventListener('mouseup', dragEnd);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === container) {
    isDragging = true;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, container);
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

const centralNode = document.querySelector('.central-node');
const surroundingNodes = document.querySelectorAll('.surrounding-node');

// Function to reposition the container element so that the central node is centered
function centerContainer() {
  const container = document.querySelector('.container');
  container.style.transition = 'transform 0.5s ease';
  container.style.transform = 'translate(0, 0)';
}

// Add event listener to the centralNode element
centralNode.addEventListener('click', () => {
  centerContainer();
});

surroundingNodes.forEach(node => {
  node.addEventListener('click', () => {
    const nodePosition = node.getBoundingClientRect();
    const nodeX = nodePosition.x + nodePosition.width / 2;
    const nodeY = nodePosition.y + nodePosition.height / 2;

    const centralNodePosition = centralNode.getBoundingClientRect();
    const centralNodeX = centralNodePosition.x + centralNodePosition.width / 2;
    const centralNodeY = centralNodePosition.y + centralNodePosition.height / 2;

    const distanceX = centralNodeX - nodeX;
    const distanceY = centralNodeY - nodeY;

    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
  });
});

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

setInterval(updateTime, 1000);
const inputField = document.getElementById('input-field');

inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    centralNode.textContent = inputField.value
    
    const prompt = "subtopics about" + inputField.value + "that appear in a list one after another with six elements in the list"
    
    const url = "https://api.openai.com/v1/completions"
    const apiKey = "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"


    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }


    const requestBody = JSON.stringify({
      prompt: prompt,
      model: "text-davinci-003",
      max_tokens: 100,
      n: 1,
      temperature: 0.5 // Change this value to adjust the temperature
    })

    // Send the request to the OpenAI API
    console.log("Sending request to OpenAI API...")
    fetch(url, {
      method: "POST",
      headers: headers,
      body: requestBody
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API
      console.log("Received response from OpenAI API:", data)
      const result = data.choices[0].text
      console.log(result) 
      
      const dataArray = result.split("\n"); // split the string into an array of substrings

      // remove leading empty lines from the array
      while (dataArray.length > 0 && dataArray[0].trim() === "") {
        dataArray.shift();
      }

      // loop through the array and remove the numbers
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = dataArray[i].replace(/^\d+\./, "").trim();
      }

      // now the dataArray should contain the data as an array with no numbers and no leading empty lines
      console.log(dataArray);
      surroundingNodes.forEach((node, index) => {
        // set the text content of each node to the corresponding value from the array
        node.textContent = dataArray[index];
      });

      
    })
    .catch(error => {
      // Handle any errors that occur during the request
      console.error("Error from OpenAI API:", error)
    })

      }
      
});
