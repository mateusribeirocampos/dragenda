-- Script de migração do SQLite para PostgreSQL

-- Tabela de tipos de negócio
CREATE TABLE IF NOT EXISTS business_types (
    id_business_type SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações para tipos de negócio
CREATE TABLE IF NOT EXISTS business_type_settings (
    id_setting SERIAL PRIMARY KEY,
    id_business_type INTEGER NOT NULL,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_business_type) REFERENCES business_types(id_business_type) ON DELETE CASCADE,
    UNIQUE (id_business_type, setting_key)
);

-- Tabela de prestadores de serviço (anteriormente médicos)
CREATE TABLE IF NOT EXISTS providers (
    id_provider SERIAL PRIMARY KEY,
    id_business_type INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    professional_id VARCHAR(50),
    phone VARCHAR(20),
    icon VARCHAR(10) DEFAULT 'M',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_business_type) REFERENCES business_types(id_business_type) ON DELETE CASCADE
);

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS services (
    id_service SERIAL PRIMARY KEY,
    id_business_type INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INTEGER DEFAULT 30,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_business_type) REFERENCES business_types(id_business_type) ON DELETE CASCADE
);

-- Tabela de relacionamento entre prestadores e serviços
CREATE TABLE IF NOT EXISTS provider_services (
    id_provider_service SERIAL PRIMARY KEY,
    id_provider INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    price DECIMAL(10, 2),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_provider) REFERENCES providers(id_provider) ON DELETE CASCADE,
    FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE,
    UNIQUE (id_provider, id_service)
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admins (
    id_admin SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id_appointment SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_provider INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'agendado',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_provider) REFERENCES providers(id_provider) ON DELETE CASCADE,
    FOREIGN KEY (id_service) REFERENCES services(id_service) ON DELETE CASCADE
);

-- Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
    id_setting SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de dados iniciais - Tipo de negócio para medicina
INSERT INTO business_types (name, description, icon) 
VALUES ('Clínica Médica', 'Serviços médicos e consultas de saúde', 'hospital')
ON CONFLICT DO NOTHING;

-- Inserção de dados iniciais - Tipo de negócio para barbearia
INSERT INTO business_types (name, description, icon) 
VALUES ('Barbearia', 'Serviços de corte de cabelo e barba', 'scissors')
ON CONFLICT DO NOTHING;

-- Inserção de dados iniciais - Tipo de negócio para estúdio de tatuagem
INSERT INTO business_types (name, description, icon) 
VALUES ('Estúdio de Tatuagem', 'Serviços de tatuagem e piercing', 'brush')
ON CONFLICT DO NOTHING;

-- Inserção de dados iniciais - Tipo de negócio para odontologia
INSERT INTO business_types (name, description, icon) 
VALUES ('Odontologia', 'Serviços odontológicos e tratamentos dentários', 'tooth')
ON CONFLICT DO NOTHING;

-- Configurações específicas para cada tipo de negócio
-- Clínica Médica
INSERT INTO business_type_settings (id_business_type, setting_key, setting_value)
VALUES 
((SELECT id_business_type FROM business_types WHERE name = 'Clínica Médica'), 'provider_label', 'Médico'),
((SELECT id_business_type FROM business_types WHERE name = 'Clínica Médica'), 'service_label', 'Consulta'),
((SELECT id_business_type FROM business_types WHERE name = 'Clínica Médica'), 'professional_id_label', 'CRM')
ON CONFLICT DO NOTHING;

-- Barbearia
INSERT INTO business_type_settings (id_business_type, setting_key, setting_value)
VALUES 
((SELECT id_business_type FROM business_types WHERE name = 'Barbearia'), 'provider_label', 'Barbeiro'),
((SELECT id_business_type FROM business_types WHERE name = 'Barbearia'), 'service_label', 'Corte'),
((SELECT id_business_type FROM business_types WHERE name = 'Barbearia'), 'professional_id_label', 'CPF')
ON CONFLICT DO NOTHING;

-- Estúdio de Tatuagem
INSERT INTO business_type_settings (id_business_type, setting_key, setting_value)
VALUES 
((SELECT id_business_type FROM business_types WHERE name = 'Estúdio de Tatuagem'), 'provider_label', 'Tatuador'),
((SELECT id_business_type FROM business_types WHERE name = 'Estúdio de Tatuagem'), 'service_label', 'Tatuagem'),
((SELECT id_business_type FROM business_types WHERE name = 'Estúdio de Tatuagem'), 'professional_id_label', 'CPF')
ON CONFLICT DO NOTHING;

-- Odontologia
INSERT INTO business_type_settings (id_business_type, setting_key, setting_value)
VALUES 
((SELECT id_business_type FROM business_types WHERE name = 'Odontologia'), 'provider_label', 'Dentista'),
((SELECT id_business_type FROM business_types WHERE name = 'Odontologia'), 'service_label', 'Consulta'),
((SELECT id_business_type FROM business_types WHERE name = 'Odontologia'), 'professional_id_label', 'CRO')
ON CONFLICT DO NOTHING;

-- Configuração para criar um admin padrão se não existir
-- A senha é 'admin123' e deve ser trocada após o primeiro login
INSERT INTO admins (name, email, password) 
VALUES ('Admin', 'admin@dragenda.com', '$2a$10$I7vJimCzKxVuchx4Ppac9eSTQvZbIs5hAL7BPiJN0oLpBu7366vuO')
ON CONFLICT DO NOTHING;

-- Criação de índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_providers_business_type ON providers(id_business_type);
CREATE INDEX IF NOT EXISTS idx_services_business_type ON services(id_business_type);
CREATE INDEX IF NOT EXISTS idx_appointments_provider ON appointments(id_provider);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(id_user);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_provider_services_provider ON provider_services(id_provider);
CREATE INDEX IF NOT EXISTS idx_provider_services_service ON provider_services(id_service);