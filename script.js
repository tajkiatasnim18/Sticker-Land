
const stickers = [
  { name: "Sleepy Cat", image: "image/sleepycat.jfif", category: "cat" },
  { name: "Sleepy Cat", image: "image/sleepycat5.jfif", category: "cat" },
  { name: "Sleepy Cat", image: "image/sleepycat2.jfif", category: "cat" },
  { name: "Sleepy Cat", image: "image/sleepycat3.jfif", category: "cat" },
  { name: "Sleepy Cat", image: "image/sleepycat4.jfif", category: "cat" },
  { name: "Spider Cat", image: "image/spidercat.jfif", category: "cat" },

  { name: "Meme Cat", image: "image/memecat.jfif", category: "cat" },
  { name: "Meme Cat", image: "image/meme cat1.jfif", category: "cat" },
  { name: "Meme Cat", image: "image/meme cat2.jfif", category: "cat" },
  { name: "Meme Cat", image: "image/meme cat3.jfif", category: "cat" },
  { name: "Meme Cat", image: "image/meme cat4.jfif", category: "cat" },
  { name: "Meme Cat", image: "image/meme cat5.jfif", category: "cat" },

  { name: "Pookie Spider", image: "image/spider.jfif", category: "spider" },
  { name: "Pookie Spider", image: "image/spider2.jfif", category: "spider" },
  { name: "Pookie Spider", image: "image/spider3.jfif", category: "spider" },
  { name: "Pookie Spider", image: "image/spider4.jfif", category: "spider" },
  { name: "Pookie Spider", image: "image/spider5.jfif", category: "spider" },
  { name: "Pookie Spider", image: "image/pookiespider.jfif", category: "spider" },
  
  { name: "Pookie Cat", image: "image/pookiecat.jfif", category: "pookie" },
  { name: "Pookie Cat", image: "image/pookiecat2.jfif", category: "pookie" },
  { name: "Pookie Cat", image: "image/pookiecat3.jfif", category: "pookie" },
];

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const stickerGrid = document.getElementById("stickerGrid");
const galleryTitle = document.getElementById("galleryTitle");
const resultCount = document.getElementById("resultCount");
const categoryButtons = document.querySelectorAll(".category");

let activeCategory = "all";

function displayStickers() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredStickers = stickers.filter(sticker => {
    const searchableText = (
      sticker.name + " " + sticker.category
    ).toLowerCase();

    const matchesSearch = searchableText.includes(query);

    const matchesCategory =
      activeCategory === "all" ||
      sticker.category.split(" ").includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  stickerGrid.innerHTML = "";

  resultCount.textContent =
    `${filteredStickers.length} sticker(s) found`;

  if (filteredStickers.length === 0) {
    stickerGrid.innerHTML = `
      <div class="empty-message">
        <div style="font-size: 55px;">🥺</div>
        <p>No stickers found!</p>
        <p>Try searching for cat, pookie, or spider 💗</p>
      </div>
    `;
    return;
  }

  filteredStickers.forEach(sticker => {
    const card = document.createElement("article");
    card.className = "sticker-card";

    const art = document.createElement("div");
    art.className = "sticker-art";
    const img = document.createElement("img");
img.src = sticker.image;
img.alt = sticker.name;
img.className = "sticker-image";

img.style.setProperty("width", "140%", "important");
img.style.setProperty("height", "110%", "important");
img.style.setProperty("object-fit", "contain", "important");

art.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = sticker.name;

    const button = document.createElement("button");
    button.textContent = "Copy Sticker 💗";

    
button.addEventListener("click", async () => {
  try {
    const response = await fetch(sticker.image);
    const blob = await response.blob();

    if (!blob.type.startsWith("image/")) {
      throw new Error("Not an image");
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);

    button.textContent = "Copied! 💖";
  } catch {
    button.textContent = "Image can't be copied";
  }

  setTimeout(() => {
    button.textContent = "Copy Sticker 💗";
  }, 1500);
});

    card.append(art, title, button);
    stickerGrid.appendChild(card);
  });
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  displayStickers();
});

searchInput.addEventListener("input", displayStickers);

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    categoryButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    galleryTitle.textContent =
      activeCategory === "all"
        ? "All the Cuties ♡"
        : button.textContent.trim() + " Stickers";

    displayStickers();
  });
});

displayStickers();
