import serviceBusinessType from "../services/service.business.type.js";

async function List(req, res) {
  try {
    const businessTypes = await serviceBusinessType.List();
    res.status(200).json(businessTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function GetById(req, res) {
  try {
    const id_business_type = req.params.id_business_type;
    const businessType = await serviceBusinessType.GetById(id_business_type);
    res.status(200).json(businessType);
  } catch (error) {
    if (error.message === "Tipo de negócio não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

async function Insert(req, res) {
  try {
    const { name, description, icon } = req.body;
    const businessType = await serviceBusinessType.Insert(name, description, icon);
    res.status(201).json(businessType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function Update(req, res) {
  try {
    const id_business_type = req.params.id_business_type;
    const { name, description, icon } = req.body;
    const businessType = await serviceBusinessType.Update(id_business_type, name, description, icon);
    res.status(200).json(businessType);
  } catch (error) {
    if (error.message === "Tipo de negócio não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

async function Delete(req, res) {
  try {
    const id_business_type = req.params.id_business_type;
    const businessType = await serviceBusinessType.Delete(id_business_type);
    res.status(200).json(businessType);
  } catch (error) {
    if (error.message === "Tipo de negócio não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
}

async function GetSettings(req, res) {
  try {
    const id_business_type = req.params.id_business_type;
    const settings = await serviceBusinessType.GetSettings(id_business_type);
    res.status(200).json(settings);
  } catch (error) {
    if (error.message === "Tipo de negócio não encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

async function SaveSetting(req, res) {
  try {
    const id_business_type = req.params.id_business_type;
    const { setting_key, setting_value } = req.body;
    const setting = await serviceBusinessType.SaveSetting(id_business_type, setting_key, setting_value);
    res.status(200).json(setting);
  } catch (error) {
    if (error.message === "Tipo de negócio não encontrado") {
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
  GetSettings, 
  SaveSetting 
};