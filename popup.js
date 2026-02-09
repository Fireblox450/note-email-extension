const noteEl = document.getElementById("note");
const emailEl = document.getElementById("email");
const statusEl = document.getElementById("status");

// Load saved note
chrome.storage.local.get(["note"], (result) => {
  if (result.note) {
    noteEl.value = result.note;
  }
});

// Save note
document.getElementById("save").addEventListener("click", () => {
  chrome.storage.local.set({ note: noteEl.value }, () => {
    statusEl.textContent = "Saved!";
    setTimeout(() => statusEl.textContent = "", 1000);
  });
});

// Email note
document.getElementById("send").addEventListener("click", () => {
  const note = encodeURIComponent(noteEl.value);
  const email = emailEl.value;

  if (!email) {
    alert("Enter an email first!");
    return;
  }

  const subject = encodeURIComponent("My Note");
  const mailto = `mailto:${email}?subject=${subject}&body=${note}`;

  chrome.tabs.create({ url: mailto });
});
