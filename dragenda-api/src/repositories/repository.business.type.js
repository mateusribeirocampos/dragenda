import { query } from "../database/sqlite.js";

async function List() {
  let sql = `select * from business_types order by name`;
  
  const businessTypes = await query(sql, []);
  
  return businessTypes;
}

async function GetById(id_business_type) {
  let sql = `select * from business_types where id_business_type = ?`;
  
  const businessType = await query(sql, [id_business_type]);
  
  if (businessType.length == 0) return null;
  return businessType[0];
}

async function Insert(name, description, icon) {
  let sql = `insert into business_types(name, description, icon) values(?, ?, ?)
  returning id_business_type`;
  
  const businessType = await query(sql, [name, description, icon]);
  
  return businessType[0];
}

async function Update(id_business_type, name, description, icon) {
  let sql = `update business_types 
  set name = ?, description = ?, icon = ?
  where id_business_type = ?`;
  
  await query(sql, [name, description, icon, id_business_type]);
  
  return { id_business_type };
}

async function Delete(id_business_type) {
  let sql = `delete from business_types where id_business_type = ?`;
  
  await query(sql, [id_business_type]);
  
  return { id_business_type };
}

async function GetSettings(id_business_type) {
  let sql = `select setting_key, setting_value from business_settings 
  where id_business_type = ?`;
  
  const settings = await query(sql, [id_business_type]);
  
  return settings;
}

async function SaveSetting(id_business_type, setting_key, setting_value) {
  // Verificar se a configuração já existe
  let checkSql = `select count(*) as count from business_settings 
  where id_business_type = ? and setting_key = ?`;
  
  const check = await query(checkSql, [id_business_type, setting_key]);
  
  if (check[0].count > 0) {
    // Atualizar configuração existente
    let updateSql = `update business_settings 
    set setting_value = ? 
    where id_business_type = ? and setting_key = ?`;
    
    await query(updateSql, [setting_value, id_business_type, setting_key]);
  } else {
    // Inserir nova configuração
    let insertSql = `insert into business_settings(id_business_type, setting_key, setting_value) 
    values(?, ?, ?)`;
    
    await query(insertSql, [id_business_type, setting_key, setting_value]);
  }
  
  return { id_business_type, setting_key, setting_value };
}

export default { List, GetById, Insert, Update, Delete, GetSettings, SaveSetting };