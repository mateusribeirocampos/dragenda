-- Script para migrar de um sistema específico de médicos para um sistema genérico de agendamento
-- Criar tabela de tipos de negócio
CREATE TABLE business_types (
    id_business_type INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    description TEXT,
    icon VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir tipos de negócio iniciais
INSERT INTO business_types (name, description, icon) VALUES 
('Clínica Médica', 'Consultórios e clínicas médicas de diversas especialidades', 'medical'),
('Barbearia', 'Serviços de barbearia e cortes de cabelo', 'scissors'),
('Estúdio de Tatuagem', 'Serviços de tatuagem e body piercing', 'tattoo'),
('Odontologia', 'Consultórios e clínicas odontológicas', 'tooth'),
('Estética', 'Serviços de estética e beleza', 'spa');

-- Criar tabela temporária para doctors para posterior migração
CREATE TABLE temp_providers (
    id_provider INTEGER PRIMARY KEY AUTOINCREMENT,
    id_business_type INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    specialty VARCHAR,
    professional_id VARCHAR,  -- Generalização do CRM (pode ser registro profissional, CNPJ, etc)
    phone VARCHAR,
    icon VARCHAR,
    active BOOLEAN DEFAULT 1,
    FOREIGN KEY (id_business_type) REFERENCES business_types(id_business_type)
);

-- Migrar dados dos médicos atuais para a nova tabela (assumindo id_business_type = 1 para médicos)
INSERT INTO temp_providers (id_provider, id_business_type, name, specialty, professional_id, phone, icon, active)
SELECT id_doctor, 1, name, specialty, crm, phone, icon, active FROM doctors;

-- Modificar tabela de serviços para adicionar vínculo com tipos de negócio
CREATE TABLE temp_services (
    id_service INTEGER PRIMARY KEY AUTOINCREMENT,
    id_business_type INTEGER NOT NULL,
    description VARCHAR NOT NULL,
    duration INTEGER DEFAULT 30,  -- Duração em minutos
    FOREIGN KEY (id_business_type) REFERENCES business_types(id_business_type)
);

-- Migrar dados dos serviços atuais
INSERT INTO temp_services (id_service, id_business_type, description)
SELECT id_service, 1, description FROM services;

-- Criar tabela temporária para appointments
CREATE TABLE temp_appointments (
    id_appointment INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER NOT NULL,
    id_provider INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    booking_date DATE NOT NULL,
    booking_hour TIME NOT NULL,
    status VARCHAR DEFAULT 'agendado',  -- agendado, concluído, cancelado
    notes TEXT,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_provider) REFERENCES temp_providers(id_provider),
    FOREIGN KEY (id_service) REFERENCES temp_services(id_service)
);

-- Migrar dados dos agendamentos atuais
INSERT INTO temp_appointments (id_appointment, id_user, id_provider, id_service, booking_date, booking_hour, status)
SELECT id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour, 'agendado' FROM appointments;

-- Renomear tabelas temporárias para substituir as originais
DROP TABLE appointments;
DROP TABLE services;
DROP TABLE doctors;

ALTER TABLE temp_providers RENAME TO providers;
ALTER TABLE temp_services RENAME TO services;
ALTER TABLE temp_appointments RENAME TO appointments;

-- Criar tabela de relação entre providers e services
CREATE TABLE provider_services (
    id_provider_service INTEGER PRIMARY KEY AUTOINCREMENT,
    id_provider INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    active BOOLEAN DEFAULT 1,
    FOREIGN KEY (id_provider) REFERENCES providers(id_provider),
    FOREIGN KEY (id_service) REFERENCES services(id_service)
);

-- Migrar dados existentes de doctor_services (se existir)
INSERT INTO provider_services (id_provider, id_service, price, active)
SELECT id_doctor, id_service, price, 1 FROM doctor_services;

-- Adicionar preferências para configuração personalizada por tipo de negócio
CREATE TABLE business_settings (
    id_setting INTEGER PRIMARY KEY AUTOINCREMENT,
    id_business_type INTEGER NOT NULL,
    setting_key VARCHAR NOT NULL,
    setting_value TEXT NOT NULL,
    FOREIGN KEY (id_business_type) REFERENCES business_types(id_business_type)
);

-- Inserir algumas configurações padrão
INSERT INTO business_settings (id_business_type, setting_key, setting_value) VALUES
(1, 'terminology_provider', 'Médico'),
(1, 'terminology_service', 'Consulta'),
(1, 'terminology_appointment', 'Agendamento médico'),
(2, 'terminology_provider', 'Barbeiro'),
(2, 'terminology_service', 'Corte'),
(2, 'terminology_appointment', 'Horário'),
(3, 'terminology_provider', 'Tatuador'),
(3, 'terminology_service', 'Sessão'),
(3, 'terminology_appointment', 'Reserva'),
(4, 'terminology_provider', 'Dentista'),
(4, 'terminology_service', 'Procedimento'),
(4, 'terminology_appointment', 'Consulta');

-- Criar índices para otimizar buscas
CREATE INDEX idx_providers_business_type ON providers(id_business_type);
CREATE INDEX idx_services_business_type ON services(id_business_type);
CREATE INDEX idx_appointments_provider ON appointments(id_provider);
CREATE INDEX idx_appointments_date ON appointments(booking_date);
CREATE INDEX idx_provider_services ON provider_services(id_provider, id_service);