import { getFestivalData } from "./api.js";

import Artist from "./Artist.js";

import { Performance } from "./Performance.js";

import { FeaturedPerformance } from "./FeaturedPerformance.js";

import "./PerformanceCard.js";

import {
  renderLoading,
  renderError,
  renderPerformances,
} from "./ui.js";

const loadButton = document.getElementById("load-lineup");

const searchInput = document.getElementById("search-input");

const stageFilter = document.getElementById("stage-filter");

const ticketsFilter = document.getElementById("tickets-filter");

const featuredFilter = document.getElementById("featured-filter");

const sortSelect = document.getElementById("sort-select");

const resetButton = document.getElementById("reset-filters");

let performances = [];

let allPerformances = [];

async function loadLineup() {
  renderLoading();

  loadButton.disabled = true;

  try {
    const data = await getFestivalData();

    const artists = data.artists.map(
      (item) =>
        new Artist(
          item.id,
          item.name,
          item.country,
          item.genre,
        ),
    );

    allPerformances = data.performances.map((item) => {
      const artist = artists.find(
        (artist) => artist.id === item.artistId,
      );

      if (item.featured) {
        return new FeaturedPerformance(
          item.id,
          item.title,
          artist,
          item.stage,
          item.time,
          item.ticketPrice,
          item.ticketsRemaining,
          item.featured,
        );
      }

      return new Performance(
        item.id,
        item.title,
        artist,
        item.stage,
        item.time,
        item.ticketPrice,
        item.ticketsRemaining,
      );
    });

    performances = [...allPerformances];

    renderPerformances(performances);

    searchInput.disabled = false;
    stageFilter.disabled = false;
    ticketsFilter.disabled = false;
    featuredFilter.disabled = false;
    sortSelect.disabled = false;
    resetButton.disabled = false;
  } catch (error) {
    console.error(error);

    renderError(error.message);
  }

  loadButton.disabled = false;
}

function applyFilters() {
  const searchTerm =
    searchInput.value.trim().toLowerCase();

  const stage = stageFilter.value;

  const availableOnly = ticketsFilter.checked;

  const featuredOnly = featuredFilter.checked;

  const sort = sortSelect.value;

  let visiblePerformances = allPerformances.filter(
    (performance) => {
      const matchesSearch =
        searchTerm === "" ||
        performance.title
          .toLowerCase()
          .includes(searchTerm) ||
        performance.artist.name
          .toLowerCase()
          .includes(searchTerm);

      const matchesStage =
        stage === "" ||
        performance.stage === stage;

      const matchesTickets =
        !availableOnly ||
        performance.hasTickets;

      const matchesFeatured =
        !featuredOnly ||
        performance.featured;

      return (
        matchesSearch &&
        matchesStage &&
        matchesTickets &&
        matchesFeatured
      );
    },
  );

  visiblePerformances = [...visiblePerformances];

  switch (sort) {
    case "time-asc":
      visiblePerformances.sort((a, b) =>
        a.time.localeCompare(b.time),
      );
      break;

    case "price-asc":
      visiblePerformances.sort(
        (a, b) =>
          a.ticketPrice - b.ticketPrice,
      );
      break;

    case "price-desc":
      visiblePerformances.sort(
        (a, b) =>
          b.ticketPrice - a.ticketPrice,
      );
      break;

    case "artist-asc":
      visiblePerformances.sort((a, b) =>
        a.artist.name.localeCompare(
          b.artist.name,
        ),
      );
      break;
  }

  performances = visiblePerformances;

  renderPerformances(performances);
}

function resetFilters() {
  searchInput.value = "";

  stageFilter.value = "";

  ticketsFilter.checked = false;

  featuredFilter.checked = false;

  sortSelect.value = "time-asc";

  applyFilters();
}

loadButton.addEventListener(
  "click",
  loadLineup,
);

searchInput.addEventListener(
  "input",
  applyFilters,
);

stageFilter.addEventListener(
  "change",
  applyFilters,
);

ticketsFilter.addEventListener(
  "change",
  applyFilters,
);

featuredFilter.addEventListener(
  "change",
  applyFilters,
);

sortSelect.addEventListener(
  "change",
  applyFilters,
);

resetButton.addEventListener(
  "click",
  resetFilters,
);