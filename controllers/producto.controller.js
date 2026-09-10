const { Op } = require("sequelize");
const Producto = require("../models/Producto");

exports.getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const nombre = req.query.nombre || ""; // Filtro de búsqueda
    console.log(nombre);
    const limit = size;
    const offset = (page - 1) * size;

    // 2. Construir la condición de filtrado dinámico
    const donde = {};
    if (nombre) {
      donde.nombre = {
        [Op.like]: `%${nombre}%`, // Busca cualquier coincidencia que contenga el texto
      };
    }

    // findAndCountAll recupera filas y conteo total simultáneamente
    const { count, rows } = await Producto.findAndCountAll({
      where: donde,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      totalItems: count,
      productos: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const prod = await Producto.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ message: "No encontrado" });
    res.json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const [updated] = await Producto.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const deleted = await Producto.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
