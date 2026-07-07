var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/submit", function (req, res, next) {
  console.log(req.query);
  res.render("proccessForm", {
    ...req.query,
  });
});

router.get("/inventario", function (req, res, next) {
  res.render("inventario", { title: "Inventário" });
});

router.get("/entrada", function (req, res, next) {
  res.render("entrada", { title: "Entrada de itens" });
});

router.get("/retirada", function (req, res, next) {
  res.render("retirada", { title: "Retirada de itens" });
});

router.get("/sobre", function (req, res, next) {
  res.render("sobre", { title: "Sobre a equipe" });
});

router.post("/submit", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  res.render("proccessForm", {
    ...req.body,
  });
});

module.exports = router;
