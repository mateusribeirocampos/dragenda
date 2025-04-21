import serviceProvider from "../services/service.provider.js";

async function List(req, res) {
  try {
    const name = req.query.name;
    const id_business_type = req.query.id_business_type;
    const providers = await serviceProvider.List(name, id_business_type);
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function GetById(req, res) {
  try {
    const id_provider = req.params.id_provider;
    const provider = await serviceProvider.GetById(id_provider);
    res.status(200).json(provider);
  } catch (error) {
    if (error.message === "Prestador de serviço não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

async function Insert(req, res) {
  try {
    const { id_business_type, name, specialty, professional_id, phone, icon, active } = req.body;
    const provider = await serviceProvider.Insert(id_business_type, name, specialty, professional_id, phone, icon, active);
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function Update(req, res) {
  try {
    const id_provider = req.params.id_provider;
    const { id_business_type, name, specialty, professional_id, phone, icon, active } = req.body;
    const provider = await serviceProvider.Update(id_provider, id_business_type, name, specialty, professional_id, phone, icon, active);
    res.status(200).json(provider);
  } catch (error) {
    if (error.message === "Prestador de serviço não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

async function Delete(req, res) {
  try {
    const id_provider = req.params.id_provider;
    const provider = await serviceProvider.Delete(id_provider);
    res.status(200).json(provider);
  } catch (error) {
    if (error.message === "Prestador de serviço não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

async function ListServices(req, res) {
  try {
    const id_provider = req.params.id_provider;
    const services = await serviceProvider.ListServices(id_provider);
    res.status(200).json(services);
  } catch (error) {
    if (error.message === "Prestador de serviço não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

async function AddService(req, res) {
  try {
    const id_provider = req.params.id_provider;
    const { id_service, price } = req.body;
    const service = await serviceProvider.AddService(id_provider, id_service, price);
    res.status(201).json(service);
  } catch (error) {
    if (error.message === "Prestador de serviço não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

async function RemoveService(req, res) {
  try {
    const id_provider = req.params.id_provider;
    const id_service = req.params.id_service;
    const service = await serviceProvider.RemoveService(id_provider, id_service);
    res.status(200).json(service);
  } catch (error) {
    if (error.message === "Prestador de serviço não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

export default {
  List,
  GetById,
  Insert,
  Update,
  Delete,
  ListServices,
  AddService,
  RemoveService
};