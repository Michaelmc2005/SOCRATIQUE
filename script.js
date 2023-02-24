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
function addGlowOnHover(container) {
  container.addEventListener("mousemove", (event) => {
    // Get the mouse coordinates relative to the container's position
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate the size of the gradient based on the container's dimensions
    const gradientSize = Math.min(container.offsetWidth, container.offsetHeight) * 0.2;

    // Set the container's background to a radial gradient with a glowing effect
    container.style.backgroundImage = `radial-gradient(circle ${gradientSize}px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 30%)`;  });

  container.addEventListener("mouseleave", (event) => {
    // Remove the glowing effect when the mouse leaves the container
    container.style.backgroundImage = "none";
  });
}
addGlowOnHover(container);
