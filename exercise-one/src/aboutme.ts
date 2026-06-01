type ProfileData = {
  nickname: string;
  favorites: string;
  hometown: string;
};

document.body.style.fontFamily = "Arial, sans-serif";

const profileData: ProfileData = {
  nickname: "Thi Pham",
  favorites: "playing guitar, watching films, and listening to music",
  hometown: "Tam Ky ward, Da Nang city, Vietnam",
};

Object.entries(profileData).forEach(([id, value]) => {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
});

document.querySelectorAll("li").forEach((item) => {
  item.classList.add("listitem");
});

const img = document.createElement("img");
img.src = "asset/about-me-profile.png";
img.alt = "Profile Picture";

document.body.appendChild(img);
