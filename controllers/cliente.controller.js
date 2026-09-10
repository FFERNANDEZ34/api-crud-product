const { Op } = require("sequelize");
const Cliente = require("../models/Cliente");

exports.crear = async (req, res) => {
  try {
    const nuevo = await Cliente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const editar = await Cliente.update(req.body, {
      where: { id: req.params.id },
    });
    if (!editar) res.status(400).json({ message: "No encontrado." });
    res.json({ message: "Cliente actualizado." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const deleted = await Cliente.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Cliente eliminado" });
  } catch (error) {}
};

exports.getOne = async (req, res) => {
  try {
    const clie = await Cliente.findByPk(req.params.id);
    if (!clie) return res.status(404).json({ message: "No encontrado" });
    res.json(clie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const nombre = req.query.nombre || ""; // Filtro de búsqueda
    const correo = req.query.correo || ""; // Filtro de búsqueda

    const limit = size;
    const offset = (page - 1) * size;

    // 2. Construir la condición de filtrado dinámico
    const donde = {};
    if (nombre) {
      donde.nombre = {
        [Op.like]: `%${nombre}%`, // Busca cualquier coincidencia que contenga el texto
      };
    }
    if (correo) {
      donde.email = {
        [Op.like]: `%${correo}%`, // Busca cualquier coincidencia que contenga el texto
      };
    }

    // findAndCountAll recupera filas y conteo total simultáneamente
    const { count, rows } = await Cliente.findAndCountAll({
      where: donde,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      totalItems: count,
      clientes: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
