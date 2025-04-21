import repoProvider from "../repositories/repository.provider.js";
import repoBusinessType from "../repositories/repository.business.type.js";

async function List(name, id_business_type) {
  const providers = await repoProvider.List(name, id_business_type);
  return providers;
}

async function GetById(id_provider) {
  const provider = await repoProvider.GetById(id_provider);
  
  if (!provider) {
    throw new Error("Prestador de serviço não encontrado");
  }
  
  return provider;
}

async function Insert(id_business_type, name, specialty, professional_id, phone, icon, active) {
  // Validações básicas
  if (!name || name.trim() === "") {
    throw new Error("Nome do prestador é obrigatório");
  }
  
  if (!id_business_type) {
    throw new Error("Tipo de negócio é obrigatório");
  }
  
  // Verificar se o tipo de negócio existe
  const businessType = await repoBusinessType.GetById(id_business_type);
  if (!businessType) {
    throw new Error("Tipo de negócio não encontrado");
  }
  
  const provider = await repoProvider.Insert(id_business_type, name, specialty, professional_id, phone, icon, active);
  
  return provider;
}

async function Update(id_provider, id_business_type, name, specialty, professional_id, phone, icon, active) {
  // Verificar se o prestador existe
  await GetById(id_provider);
  
  // Validações básicas
  if (!name || name.trim() === "") {
    throw new Error("Nome do prestador é obrigatório");
  }
  
  if (!id_business_type) {
    throw new Error("Tipo de negócio é obrigatório");
  }
  
  // Verificar se o tipo de negócio existe
  const businessType = await repoBusinessType.GetById(id_business_type);
  if (!businessType) {
    throw new Error("Tipo de negócio não encontrado");
  }
  
  const provider = await repoProvider.Update(id_provider, id_business_type, name, specialty, professional_id, phone, icon, active);
  
  return provider;
}

async function Delete(id_provider) {
  // Verificar se o prestador existe
  await GetById(id_provider);
  
  // Aqui poderia haver verificações adicionais, como se existem agendamentos para este prestador
  
  const provider = await repoProvider.Delete(id_provider);
  
  return provider;
}

async function ListServices(id_provider) {
  // Verificar se o prestador existe
  await GetById(id_provider);
  
  const services = await repoProvider.ListServices(id_provider);
  
  return services;
}

async function AddService(id_provider, id_service, price) {
  // Verificar se o prestador existe
  await GetById(id_provider);
  
  // Aqui deveria haver verificação se o serviço existe
  // Mas como não temos o repositório de serviços ainda, vamos assumir que está tudo bem
  
  // Validações básicas
  if (!price || price <= 0) {
    throw new Error("Preço do serviço deve ser maior que zero");
  }
  
  const service = await repoProvider.AddService(id_provider, id_service, price);
  
  return service;
}

async function RemoveService(id_provider, id_service) {
  // Verificar se o prestador existe
  await GetById(id_provider);
  
  // Aqui poderia haver verificações adicionais, como se existem agendamentos para este serviço
  
  const service = await repoProvider.RemoveService(id_provider, id_service);
  
  return service;
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