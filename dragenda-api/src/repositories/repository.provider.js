import { query } from "../database/sqlite.js";

// Lista todos os prestadores de serviço
async function List(name, id_business_type) {
  let filter = [];
  
  let sql = "select p.*, bt.name as business_type_name from providers p " +
            "inner join business_types bt on p.id_business_type = bt.id_business_type ";
  
  // Filtros opcionais
  if (name) {
    sql += "where p.name like ? ";
    filter.push("%" + name + "%");
    
    if (id_business_type) {
      sql += "and p.id_business_type = ? ";
      filter.push(id_business_type);
    }
  } else if (id_business_type) {
    sql += "where p.id_business_type = ? ";
    filter.push(id_business_type);
  }
  
  sql += "order by p.name";
  
  const providers = await query(sql, filter);
  
  return providers;
}

// Busca um prestador específico por ID
async function GetById(id_provider) {
  let sql = "select p.*, bt.name as business_type_name from providers p " +
            "inner join business_types bt on p.id_business_type = bt.id_business_type " +
            "where p.id_provider = ?";
  
  const providers = await query(sql, [id_provider]);
  
  if (providers.length === 0) return null;
  return providers[0];
}

// Insere um novo prestador
async function Insert(id_business_type, name, specialty, professional_id, phone, icon, active) {
  let sql = `insert into providers(id_business_type, name, specialty, professional_id, phone, icon, active) 
             values(?, ?, ?, ?, ?, ?, ?)
             returning id_provider`;
  
  const provider = await query(sql, [id_business_type, name, specialty, professional_id, phone, icon, active ? 1 : 0]);
  
  return provider[0];
}

// Atualiza um prestador existente
async function Update(id_provider, id_business_type, name, specialty, professional_id, phone, icon, active) {
  let sql = `update providers 
             set id_business_type = ?,
                 name = ?,
                 specialty = ?,
                 professional_id = ?,
                 phone = ?,
                 icon = ?,
                 active = ?
             where id_provider = ?`;
  
  await query(sql, [id_business_type, name, specialty, professional_id, phone, icon, active ? 1 : 0, id_provider]);
  
  return { id_provider };
}

// Remove um prestador
async function Delete(id_provider) {
  let sql = `delete from providers where id_provider = ?`;
  
  await query(sql, [id_provider]);
  
  return { id_provider };
}

// Lista os serviços oferecidos pelo prestador
async function ListServices(id_provider) {
  let sql = `select ps.id_provider_service, ps.id_provider, ps.id_service, s.description, ps.price, ps.active
             from provider_services ps
             inner join services s on ps.id_service = s.id_service
             where ps.id_provider = ?`;
  
  const services = await query(sql, [id_provider]);
  
  return services;
}

// Adiciona um serviço ao prestador
async function AddService(id_provider, id_service, price) {
  // Verificar se já existe
  let checkSql = `select count(*) as count from provider_services 
                  where id_provider = ? and id_service = ?`;
  
  const check = await query(checkSql, [id_provider, id_service]);
  
  if (check[0].count > 0) {
    // Atualizar preço
    let updateSql = `update provider_services 
                     set price = ?, active = 1
                     where id_provider = ? and id_service = ?`;
    
    await query(updateSql, [price, id_provider, id_service]);
  } else {
    // Inserir novo registro
    let insertSql = `insert into provider_services(id_provider, id_service, price, active) 
                     values(?, ?, ?, 1)`;
    
    await query(insertSql, [id_provider, id_service, price]);
  }
  
  return { id_provider, id_service, price };
}

// Remove um serviço do prestador
async function RemoveService(id_provider, id_service) {
  let sql = `delete from provider_services 
             where id_provider = ? and id_service = ?`;
  
  await query(sql, [id_provider, id_service]);
  
  return { id_provider, id_service };
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