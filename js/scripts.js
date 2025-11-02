const menuBtn = document.getElementById("menu-btn");
const burgerMenu = document.getElementById("burger-menu");
const destinationTabs = document.querySelectorAll(".destination__tab");
const crewDots = document.querySelectorAll(".crew__pagination-dot");
const technologyBtns = document.querySelectorAll(".technology__pagination-btn"); // ✅ FIXED

let myData = {
  destinations: [],
  crew: [],
  technology: [],
};

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");

  if (menuBtn.classList.contains("open")) {
    burgerMenu.classList.add("burger-menu--open");
  } else {
    burgerMenu.classList.remove("burger-menu--open");
  }
});

/* function for menu button on resize */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    burgerMenu.classList.remove("burger-menu--open");
    menuBtn.classList.remove("open");
  }
});

/* auto-detecting current page in Navbar */
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // For desktop nav
  const navLinks = document.querySelectorAll(".nav__link");
  const burgerLinks = document.querySelectorAll(".burger-menu__link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      (currentPage === "index.html" && href === "index.html") ||
      (currentPage === "" && href === "index.html")
    ) {
      link.parentElement.classList.add("nav__item--active");
    }
  });

  burgerLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (
      href === currentPage ||
      (currentPage === "index.html" && href === "index.html") ||
      (currentPage === "" && href === "index.html")
    ) {
      link.parentElement.classList.add("burger-menu__item--active");
    }
  });
});

/* load the package Json */
async function loadData() {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();

    myData.destinations = data.destinations;
    myData.crew = data.crew;
    myData.technology = data.technology;
  } catch (error) {
    console.error("Error loading destination data:", error);
  }
}

loadData();

destinationTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const target = e.currentTarget;
    const targetDestination = target.getAttribute("data-destination");
    destinationTabs.forEach((t) => {
      t.classList.remove("destination__tab--active");
    });
    target.classList.add("destination__tab--active");
    updateDestinationContent(targetDestination);
  });
});

function updateDestinationContent(destinationName) {
  const destination = myData.destinations.find((dest) => {
    return dest.name.toLowerCase() === destinationName.toLowerCase();
  });

  if (!destination) {
    console.error("Destination not found:", destinationName);
    return;
  }

  const destinationImage = document.querySelector(".destination__image");
  const destinationTitle = document.querySelector(".destination__description-title");
  const destinationText = document.querySelector(".destination__description-text");
  const destinationDistance = document.querySelector(".destination__value-distance");
  const destinationTravel = document.querySelector(".destination__value-time");

  if (destinationImage) destinationImage.style.opacity = "0";
  if (destinationTitle) destinationTitle.style.opacity = "0";
  if (destinationText) destinationText.style.opacity = "0";
  if (destinationDistance) destinationDistance.style.opacity = "0";
  if (destinationTravel) destinationTravel.style.opacity = "0";

  setTimeout(() => {
    if (destinationImage) {
      destinationImage.src = destination.images.png;
      destinationImage.alt = destination.name;
    }
    if (destinationTitle) {
      destinationTitle.textContent = destination.name;
    }
    if (destinationText) {
      destinationText.textContent = destination.description;
    }
    if (destinationDistance) {
      destinationDistance.textContent = destination.distance;
    }
    if (destinationTravel) {
      destinationTravel.textContent = destination.travel;
    }

    if (destinationImage) destinationImage.style.opacity = "1";
    if (destinationTitle) destinationTitle.style.opacity = "1";
    if (destinationText) destinationText.style.opacity = "1";
    if (destinationDistance) destinationDistance.style.opacity = "1";
    if (destinationTravel) destinationTravel.style.opacity = "1";
  }, 400);
}

function updateCrewMember(crewIndex) {
  const crewMember = myData.crew[crewIndex];
  if (!crewMember) {
    console.error("❌ Crew member not found at index:", crewIndex);
    return;
  }

  const crewRole = document.querySelector(".crew__rank");
  const crewName = document.querySelector(".crew__name");
  const crewbio = document.querySelector(".crew__bio-text");
  const crewImage = document.querySelector(".crew__image");

  crewDots.forEach((dot) => {
    dot.classList.remove("crew__pagination-dot--active");
  });

  const clickedDot = document.querySelector(`[data-crew-index="${crewIndex}"]`);
  if (clickedDot) {
    clickedDot.classList.add("crew__pagination-dot--active");
  }

  if (crewRole) crewRole.style.opacity = "0";
  if (crewName) crewName.style.opacity = "0";
  if (crewbio) crewbio.style.opacity = "0";
  if (crewImage) crewImage.style.opacity = "0";

  setTimeout(() => {
    if (crewRole) crewRole.textContent = crewMember.role;
    if (crewName) crewName.textContent = crewMember.name;
    if (crewbio) crewbio.textContent = crewMember.bio;
    if (crewImage) crewImage.src = crewMember.images.png;

    if (crewRole) crewRole.style.opacity = "0.5";
    if (crewName) crewName.style.opacity = "1";
    if (crewbio) crewbio.style.opacity = "1";
    if (crewImage) crewImage.style.opacity = "1";
  }, 400);
}

crewDots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const target = e.currentTarget;
    const crewIndex = target.getAttribute("data-crew-index");
    updateCrewMember(crewIndex);
  });
});

// ✅ FIXED: Changed from forEaach to forEach, and from technologyDots to technologyBtns
technologyBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.currentTarget;
    const techIndex = target.getAttribute("data-tech-index");
    updateTechnologyContent(techIndex);
  });
});

const updateTechnologyContent = (techIndex) => {
  const technology = myData.technology[techIndex];

  if (!technology) {
    console.error("❌ Technology not found at index:", techIndex);
    return;
  }

  const techName = document.querySelector(".technology__name");
  const techDescription = document.querySelector(".technology__description");
  const techImage = document.querySelector(".technology__img");
  const techSource = document.querySelector(".technology__img-container source"); // ✅ Get the <source>

  technologyBtns.forEach((btn) => {
    btn.classList.remove("technology__pagination-btn--active");
  });

  const clickedBtn = document.querySelector(`[data-tech-index="${techIndex}"]`);
  if (clickedBtn) {
    clickedBtn.classList.add("technology__pagination-btn--active");
  }

  // Fade out
  if (techName) techName.style.opacity = "0";
  if (techDescription) techDescription.style.opacity = "0";
  if (techImage) techImage.style.opacity = "0";

  setTimeout(() => {
    if (techName) techName.textContent = technology.name;
    if (techDescription) techDescription.textContent = technology.description;

    // ✅ Update the <source> for desktop (portrait)
    if (techSource) {
      techSource.srcset = technology.images.portrait;
    }

    // ✅ Update the <img> for mobile/tablet (landscape)
    if (techImage) {
      techImage.src = technology.images.landscape;
      techImage.alt = technology.name;
    }

    // Fade in
    if (techName) techName.style.opacity = "1";
    if (techDescription) techDescription.style.opacity = "1";
    if (techImage) techImage.style.opacity = "1";
  }, 400);
};
