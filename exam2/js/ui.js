import { Performance } from "./Performance.js";

const performanceContainer =
  document.getElementById("performance-list");

const statusOutput =
  document.getElementById("status");

const performanceCount =
  document.getElementById("performance-count");

const ticketCount =
  document.getElementById("ticket-count");

const averagePrice =
  document.getElementById("average-price");

export function renderLoading() {
  statusOutput.textContent =
    "Loading festival data...";

  performanceContainer.innerHTML = "";

  performanceCount.textContent = "0";

  ticketCount.textContent = "0";

  averagePrice.textContent = "$0.00";
}

export function renderError(error) {
  statusOutput.textContent = `Error: ${error}`;

  performanceContainer.innerHTML = "";

  performanceCount.textContent = "0";

  ticketCount.textContent = "0";

  averagePrice.textContent = "$0.00";
}

export function renderPerformances(
  performances,
) {
  performanceContainer.innerHTML = "";

  if (performances.length === 0) {
    statusOutput.textContent =
      "No performances match the current filters.";

    performanceCount.textContent = "0";

    ticketCount.textContent = "0";

    averagePrice.textContent = "$0.00";

    return;
  }

  performances.forEach((performance) => {
    const card =
      document.createElement(
        "performance-card",
      );

    card.performance = performance;

    performanceContainer.appendChild(card);
  });

  statusOutput.textContent =
    "Festival lineup loaded successfully.";

  performanceCount.textContent =
    performances.length;

  ticketCount.textContent =
    Performance.totalAvailableTickets(
      performances,
    );

  averagePrice.textContent =
    Performance.averagePrice(
      performances,
    );
}