const { Service } = require("../models");
const serviceController = {};

serviceController.create = async (req, res) => {
  const { service_name, description } = req.body;

  try {
    if (!service_name || !description) {
      return res.status(400).json({
        success: true,
        message: "Service name is not valid",
      });
    }

    await Service.create({
      service_name,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Service created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating Service",
      error: error.message,
    });
  }
};

serviceController.getAll = async (req, res) => {
  try {
    const services = await Service.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving services",
      error: error.message,
    });
  }
};

serviceController.update = async (req, res) => {
  const serviceId = req.params.id;
  const { ...restServiceData } = req.body;

  try {
    if (req.body && Object.keys(req.body).length === 0) {
      return res.status(404).json({
        success: true,
        message: "data is not valid",
      });
    }
    const serviceToUpdate = await Service.findByPk(serviceId);

    if (!serviceToUpdate) {
      return res.status(404).json({
        success: true,
        message: "Service not found",
      });
    }

    serviceToUpdate.set({
      ...serviceToUpdate,
      ...restServiceData,
    });

    await serviceToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Service",
      error: error.message,
    });
  }
};

serviceController.delete = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const deleteResult = await Service.destroy({
      where: {
        id: serviceId,
      },
    });

    if (deleteResult === 0) {
      return res.status(404).json({
        success: true,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting this service",
      error: error.message,
    });
  }
};

module.exports = serviceController;
