import repoBusinessType from "../repositories/repository.business.type.js";

async function List() {
  const businessTypes = await repoBusinessType.List();
  return businessTypes;
}

async function GetById(id_business_type) {
  const businessType = await repoBusinessType.GetById(id_business_type);
  
  if (!businessType) {
    throw new Error("Tipo de negócio não encontrado");
  }
  
  return businessType;
}

async function Insert(name, description, icon) {
  // Validações básicas
  if (!name || name.trim() === "") {
    throw new Error("Nome do tipo de negócio é obrigatório");
  }
  
  const businessType = await repoBusinessType.Insert(name, description, icon);
  return businessType;
}

async function Update(id_business_type, name, description, icon) {
  // Verificar se o tipo de negócio existe
  await GetById(id_business_type);
  
  // Validações básicas
  if (!name || name.trim() === "") {
    throw new Error("Nome do tipo de negócio é obrigatório");
  }
  
  const businessType = await repoBusinessType.Update(id_business_type, name, description, icon);
  return businessType;
}

async function Delete(id_business_type) {
  // Verificar se o tipo de negócio existe
  await GetById(id_business_type);
  
  // Aqui poderia haver verificações adicionais, como se existem providers associados a este tipo de negócio
  
  const businessType = await repoBusinessType.Delete(id_business_type);
  return businessType;
}

async function GetSettings(id_business_type) {
  // Verificar se o tipo de negócio existe
  await GetById(id_business_type);
  
  const settings = await repoBusinessType.GetSettings(id_business_type);
  
  // Transformar array de settings em um objeto para facilitar o uso
  const settingsObject = {};
  for (const setting of settings) {
    settingsObject[setting.setting_key] = setting.setting_value;
  }
  
  return settingsObject;
}

async function SaveSetting(id_business_type, setting_key, setting_value) {
  // Verificar se o tipo de negócio existe
  await GetById(id_business_type);
  
  // Validações básicas
  if (!setting_key || setting_key.trim() === "") {
    throw new Error("Chave de configuração é obrigatória");
  }
  
  const setting = await repoBusinessType.SaveSetting(id_business_type, setting_key, setting_value);
  return setting;
}

export default { List, GetById, Insert, Update, Delete, GetSettings, SaveSetting };