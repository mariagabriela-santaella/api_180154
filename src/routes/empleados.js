const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

router.get("/", (req, res) => {
  mysqlConnection.query("Select * from empleados", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM empleados where id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { id, nombre, salario } = req.body;

  const query = `
call agregarEditarEmpleado(?, ?, ?);
`;

  mysqlConnection.query(query, [id, nombre, salario], (err, rows, fields) => {
    if (!err) {
      console.log("Empleado agregado");
      res.json({ status: "Empleado Agregado" });
    } else {
      console.log(err);
      res.json({ status: "Fall agregar" });
    }
  });
});

router.put("/:id", (req, res) => {
  const { nombre, salario } = req.body;
  const { id } = req.params;
  const query = `
  call agregarEditarEmpleado(?, ?, ?);
  `;

  mysqlConnection.query(query, [id, nombre, salario], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Empleado actualizado" });
    } else {
      console.log(err);
      res.json({ status: "Fallo actualizar" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "delete from empleados where id = ?";
  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Empleado eliminado" });
    } else {
      console.log(err);
      res.json({ status: "Fallo eliminar" });
    }
  });
});

module.exports = router;
