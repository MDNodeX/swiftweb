function shortenTitle(title, maxLength) {
  if (title.length > maxLength) {
    // Truncate the string and add "..."
    return title.slice(0, maxLength) + "...";
  } else {
    // Return the original title if it's already short enough
    return title;
  }
}

const longTitle =
  "How to Dynamically Change Title Tab Text Using Javascript, a Complete Guide";
const shortTitle = shortenTitle(longTitle, 40);

console.log(shortTitle);
