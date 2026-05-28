const fs = require("fs");
const vm = require("vm");

const html = fs.readFileSync("index.html", "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

function element() {
  return {
    value: "80",
    innerHTML: "",
    textContent: "",
    className: "",
    addEventListener() {},
    classList: { remove() {}, add() {} }
  };
}

const context = {
  document: { getElementById: () => element() },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  fetch() {},
  console,
  URL
};

vm.runInNewContext(script, context);

const sampleRows = [
  { grade: 0, ticket: { front: [1, 2, 3, 4, 5], back: [1, 2] }, draw: { front: [9, 10, 11, 12, 13], back: [3, 4] }, matches: { front: 0, back: 0 } },
  { grade: 7, ticket: { front: [1, 2, 3, 4, 5], back: [1, 2] }, draw: { front: [1, 2, 3, 12, 13], back: [3, 4] }, matches: { front: 3, back: 0 } }
];

const grouped = context.splitRowsByWin(sampleRows);
if (grouped.winning.length !== 1 || grouped.other.length !== 1) {
  throw new Error("splitRowsByWin should separate winning and non-winning rows");
}

const marked = context.ticketBallClass(sampleRows[1].ticket, sampleRows[1].draw, "front", 1);
if (!marked.includes("hit")) {
  throw new Error("ticketBallClass should mark matched ticket numbers");
}

console.log("lottery ui behavior ok");
