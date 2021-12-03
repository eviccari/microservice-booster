module.exports = () => {
  process.on("SIGINT", () => {
    console.log("Canceled by user");
    process.exit(0);
  });
};
