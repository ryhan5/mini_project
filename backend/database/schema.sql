-- Agrosarthi Database Schema
-- Comprehensive schema for multi-user farming platform

-- Users table for farmer profiles
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    experience INTEGER DEFAULT 0,
    farming_type ENUM('traditional', 'organic', 'mixed', 'commercial') DEFAULT 'traditional',
    language VARCHAR(10) DEFAULT 'en',
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_created_at (created_at)
);

-- Farm details table
CREATE TABLE farms (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    location VARCHAR(255),
    state VARCHAR(100),
    district VARCHAR(100),
    pin_code VARCHAR(10),
    total_land DECIMAL(10,2) DEFAULT 0,
    cultivable_land DECIMAL(10,2) DEFAULT 0,
    soil_type ENUM('clay', 'loamy', 'sandy', 'silt', 'black', 'red', 'alluvial', 'laterite') DEFAULT 'loamy',
    irrigation_type ENUM('rain_fed', 'canal', 'tube_well', 'drip', 'sprinkler', 'mixed') DEFAULT 'rain_fed',
    water_source ENUM('groundwater', 'surface_water', 'rainwater', 'mixed') DEFAULT 'groundwater',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_location (state, district),
    INDEX idx_coordinates (latitude, longitude)
);

-- User preferences and settings
CREATE TABLE user_preferences (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    notifications BOOLEAN DEFAULT TRUE,
    advisory_frequency ENUM('daily', 'weekly', 'monthly') DEFAULT 'daily',
    reminder_time TIME DEFAULT '08:00:00',
    weather_alerts BOOLEAN DEFAULT TRUE,
    market_alerts BOOLEAN DEFAULT TRUE,
    pest_alerts BOOLEAN DEFAULT TRUE,
    language_preference VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_preferences (user_id)
);

-- Subscription plans and features
CREATE TABLE subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    plan ENUM('free', 'basic', 'premium', 'enterprise') DEFAULT 'free',
    features JSON,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    payment_status ENUM('pending', 'paid', 'failed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_plan (plan),
    INDEX idx_expires_at (expires_at)
);

-- Crops table for crop management
CREATE TABLE crops (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    variety VARCHAR(255),
    area DECIMAL(10,2) NOT NULL,
    planting_date DATE,
    expected_harvest_date DATE,
    season ENUM('kharif', 'rabi', 'zaid', 'perennial') DEFAULT 'kharif',
    status ENUM('planned', 'sown', 'growing', 'flowering', 'harvested', 'failed') DEFAULT 'planned',
    field_location VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_crop_name (name),
    INDEX idx_season (season),
    INDEX idx_planting_date (planting_date)
);

-- Activities table for farm activity tracking
CREATE TABLE activities (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    crop_id VARCHAR(36),
    type ENUM('sowing', 'irrigation', 'fertilizer', 'pesticide', 'harvest', 'soil_test', 'weather_event', 'market_visit', 'other') NOT NULL,
    category VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Location details
    field_location VARCHAR(255),
    area_covered DECIMAL(10,2),
    coordinates JSON,
    
    -- Timing details
    scheduled_date TIMESTAMP,
    actual_date TIMESTAMP NOT NULL,
    duration_hours DECIMAL(5,2),
    time_of_day ENUM('morning', 'afternoon', 'evening', 'night') DEFAULT 'morning',
    
    -- Resource details
    materials_used JSON,
    equipment_used JSON,
    labor_hours DECIMAL(5,2),
    total_cost DECIMAL(10,2) DEFAULT 0,
    
    -- Weather conditions
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(5,2),
    wind_speed DECIMAL(5,2),
    weather_conditions VARCHAR(100),
    
    -- Results and outcomes
    success BOOLEAN DEFAULT TRUE,
    yield_quantity DECIMAL(10,2),
    quality_rating ENUM('poor', 'fair', 'good', 'excellent'),
    issues_encountered JSON,
    notes TEXT,
    
    -- Metadata
    status ENUM('planned', 'in_progress', 'completed', 'cancelled') DEFAULT 'completed',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    source ENUM('manual', 'auto', 'imported', 'reminder') DEFAULT 'manual',
    confidence INTEGER DEFAULT 100,
    tags JSON,
    attachments JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_crop_id (crop_id),
    INDEX idx_type (type),
    INDEX idx_actual_date (actual_date),
    INDEX idx_status (status),
    INDEX idx_scheduled_date (scheduled_date)
);

-- Advisories table for AI-powered recommendations
CREATE TABLE advisories (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type ENUM('weather', 'pest', 'irrigation', 'fertilizer', 'harvest', 'market', 'scheme', 'general') NOT NULL,
    category VARCHAR(100),
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    
    -- Content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    summary TEXT,
    action_items JSON,
    recommendations JSON,
    
    -- Context
    crop VARCHAR(255),
    season VARCHAR(50),
    location VARCHAR(255),
    weather_conditions JSON,
    farming_stage VARCHAR(100),
    soil_type VARCHAR(50),
    
    -- Trigger information
    trigger_source ENUM('ai_analysis', 'weather_api', 'user_input', 'scheduled', 'manual') DEFAULT 'ai_analysis',
    confidence INTEGER DEFAULT 80,
    data_points JSON,
    trigger_thresholds JSON,
    
    -- Timing
    valid_until TIMESTAMP NOT NULL,
    urgency_level ENUM('immediate', 'urgent', 'normal', 'scheduled') DEFAULT 'normal',
    best_action_time TIMESTAMP,
    
    -- Engagement tracking
    status ENUM('active', 'read', 'dismissed', 'acted_upon') DEFAULT 'active',
    read_at TIMESTAMP NULL,
    dismissed_at TIMESTAMP NULL,
    acted_upon_at TIMESTAMP NULL,
    feedback ENUM('helpful', 'not_helpful', 'irrelevant') NULL,
    user_notes TEXT,
    
    -- Impact assessment
    estimated_benefit DECIMAL(10,2),
    risk_level ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    cost_implication DECIMAL(10,2) DEFAULT 0,
    time_required VARCHAR(100),
    difficulty_level ENUM('easy', 'medium', 'hard', 'expert') DEFAULT 'easy',
    
    -- Metadata
    version VARCHAR(10) DEFAULT '1.0',
    tags JSON,
    related_activities JSON,
    sources JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_priority (priority),
    INDEX idx_status (status),
    INDEX idx_valid_until (valid_until),
    INDEX idx_created_at (created_at),
    INDEX idx_urgency (urgency_level)
);

-- Reminders table for farming operation reminders
CREATE TABLE reminders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type ENUM('irrigation', 'fertilizer', 'pest_check', 'harvest', 'sowing', 'market_check', 'weather_check', 'scheme_deadline', 'soil_test', 'custom') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    crop VARCHAR(255),
    area VARCHAR(255),
    
    -- Scheduling
    start_date DATE NOT NULL,
    end_date DATE,
    frequency ENUM('once', 'daily', 'weekly', 'biweekly', 'monthly', 'seasonal', 'yearly') DEFAULT 'once',
    reminder_time TIME DEFAULT '08:00:00',
    
    -- Status and tracking
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered TIMESTAMP NULL,
    next_trigger TIMESTAMP NOT NULL,
    
    -- Metadata
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    tags JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_next_trigger (next_trigger),
    INDEX idx_is_active (is_active),
    INDEX idx_frequency (frequency)
);

-- Notifications table for system notifications
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    reminder_id VARCHAR(36),
    advisory_id VARCHAR(36),
    type ENUM('reminder', 'advisory', 'alert', 'system', 'marketing') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    
    -- Status tracking
    is_read BOOLEAN DEFAULT FALSE,
    is_actioned BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    actioned_at TIMESTAMP NULL,
    
    -- Delivery tracking
    delivery_method ENUM('in_app', 'email', 'sms', 'push') DEFAULT 'in_app',
    delivery_status ENUM('pending', 'sent', 'delivered', 'failed') DEFAULT 'pending',
    delivered_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reminder_id) REFERENCES reminders(id) ON DELETE SET NULL,
    FOREIGN KEY (advisory_id) REFERENCES advisories(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at),
    INDEX idx_delivery_status (delivery_status)
);

-- Weather data table for local weather tracking
CREATE TABLE weather_data (
    id VARCHAR(36) PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Current conditions
    temperature DECIMAL(5,2),
    feels_like DECIMAL(5,2),
    humidity DECIMAL(5,2),
    pressure DECIMAL(7,2),
    visibility DECIMAL(5,2),
    uv_index DECIMAL(4,2),
    
    -- Wind data
    wind_speed DECIMAL(5,2),
    wind_direction DECIMAL(5,2),
    wind_gust DECIMAL(5,2),
    
    -- Precipitation
    rainfall DECIMAL(5,2),
    rainfall_probability DECIMAL(5,2),
    
    -- Sky conditions
    cloud_cover DECIMAL(5,2),
    weather_condition VARCHAR(100),
    weather_description TEXT,
    
    -- Forecast data
    forecast_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    
    -- Data source
    source VARCHAR(100),
    api_response JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_location (location),
    INDEX idx_coordinates (latitude, longitude),
    INDEX idx_forecast_date (forecast_date),
    INDEX idx_is_current (is_current),
    INDEX idx_created_at (created_at)
);

-- Market prices table for crop price tracking
CREATE TABLE market_prices (
    id VARCHAR(36) PRIMARY KEY,
    crop_name VARCHAR(255) NOT NULL,
    variety VARCHAR(255),
    market_name VARCHAR(255) NOT NULL,
    state VARCHAR(100),
    district VARCHAR(100),
    
    -- Price information
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    modal_price DECIMAL(10,2),
    average_price DECIMAL(10,2),
    
    -- Market details
    arrivals DECIMAL(10,2),
    unit ENUM('quintal', 'kg', 'ton', 'piece', 'dozen') DEFAULT 'quintal',
    quality ENUM('faq', 'good', 'average', 'poor') DEFAULT 'faq',
    
    -- Date and source
    market_date DATE NOT NULL,
    source VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_crop_name (crop_name),
    INDEX idx_market_location (state, district, market_name),
    INDEX idx_market_date (market_date),
    INDEX idx_created_at (created_at)
);

-- Knowledge base for crop calendars and best practices
CREATE TABLE knowledge_base (
    id VARCHAR(36) PRIMARY KEY,
    category ENUM('crop_calendar', 'pest_data', 'best_practices', 'government_schemes', 'market_intelligence') NOT NULL,
    crop_name VARCHAR(255),
    region VARCHAR(255),
    
    -- Content
    title VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    summary TEXT,
    tags JSON,
    
    -- Metadata
    language VARCHAR(10) DEFAULT 'en',
    source VARCHAR(255),
    confidence INTEGER DEFAULT 100,
    version VARCHAR(10) DEFAULT '1.0',
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by VARCHAR(255),
    verified_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_crop_name (crop_name),
    INDEX idx_region (region),
    INDEX idx_is_active (is_active),
    INDEX idx_language (language)
);

-- User sessions for authentication tracking
CREATE TABLE user_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    device_info JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Session tracking
    login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Location tracking
    login_location VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active)
);

-- Activity issues for problem tracking
CREATE TABLE activity_issues (
    id VARCHAR(36) PRIMARY KEY,
    activity_id VARCHAR(36) NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    category ENUM('pest', 'disease', 'weather', 'equipment', 'labor', 'other') DEFAULT 'other',
    
    -- Resolution tracking
    is_resolved BOOLEAN DEFAULT FALSE,
    resolution TEXT,
    resolved_at TIMESTAMP NULL,
    resolved_by VARCHAR(36),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_activity_id (activity_id),
    INDEX idx_severity (severity),
    INDEX idx_is_resolved (is_resolved)
);

-- File attachments for activities and advisories
CREATE TABLE attachments (
    id VARCHAR(36) PRIMARY KEY,
    entity_type ENUM('activity', 'advisory', 'crop', 'user') NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    
    -- File details
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type ENUM('image', 'document', 'video', 'audio', 'other') NOT NULL,
    mime_type VARCHAR(100),
    file_size BIGINT,
    file_path TEXT NOT NULL,
    
    -- Metadata
    title VARCHAR(255),
    description TEXT,
    tags JSON,
    
    -- Status
    is_public BOOLEAN DEFAULT FALSE,
    upload_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    
    uploaded_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_file_type (file_type),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_created_at (created_at)
);

-- System configuration and settings
CREATE TABLE system_config (
    id VARCHAR(36) PRIMARY KEY,
    config_key VARCHAR(255) NOT NULL UNIQUE,
    config_value JSON NOT NULL,
    description TEXT,
    category VARCHAR(100),
    
    -- Access control
    is_public BOOLEAN DEFAULT FALSE,
    requires_admin BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_config_key (config_key),
    INDEX idx_category (category),
    INDEX idx_is_public (is_public)
);

-- Audit log for tracking changes
CREATE TABLE audit_log (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    action ENUM('create', 'read', 'update', 'delete') NOT NULL,
    
    -- Change details
    old_values JSON,
    new_values JSON,
    changed_fields JSON,
    
    -- Context
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(36),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- Insert default system configuration
INSERT INTO system_config (id, config_key, config_value, description, category, is_public) VALUES
('sys_001', 'app_version', '"1.0.0"', 'Current application version', 'system', TRUE),
('sys_002', 'maintenance_mode', 'false', 'Enable/disable maintenance mode', 'system', FALSE),
('sys_003', 'default_language', '"en"', 'Default application language', 'localization', TRUE),
('sys_004', 'supported_languages', '["en", "hi", "te", "ta", "kn", "ml", "gu", "mr", "bn", "pa"]', 'Supported languages', 'localization', TRUE),
('sys_005', 'weather_api_key', '""', 'Weather API configuration', 'integrations', FALSE),
('sys_006', 'market_data_source', '"agmarknet"', 'Market data source configuration', 'integrations', FALSE),
('sys_007', 'notification_settings', '{"email": true, "sms": false, "push": true}', 'Default notification settings', 'notifications', TRUE),
('sys_008', 'subscription_plans', '{"free": {"activities": 50, "advisories": 10}, "premium": {"activities": -1, "advisories": -1}}', 'Subscription plan limits', 'billing', FALSE);

-- Create views for common queries
CREATE VIEW user_dashboard_summary AS
SELECT 
    u.id,
    u.name,
    u.email,
    f.location,
    f.total_land,
    f.cultivable_land,
    COUNT(DISTINCT c.id) as total_crops,
    COUNT(DISTINCT a.id) as total_activities,
    COUNT(DISTINCT ad.id) as active_advisories,
    COUNT(DISTINCT r.id) as active_reminders
FROM users u
LEFT JOIN farms f ON u.id = f.user_id
LEFT JOIN crops c ON u.id = c.user_id
LEFT JOIN activities a ON u.id = a.user_id AND a.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
LEFT JOIN advisories ad ON u.id = ad.user_id AND ad.status = 'active'
LEFT JOIN reminders r ON u.id = r.user_id AND r.is_active = TRUE
GROUP BY u.id;

CREATE VIEW recent_activities AS
SELECT 
    a.*,
    u.name as user_name,
    c.name as crop_name,
    c.variety as crop_variety
FROM activities a
JOIN users u ON a.user_id = u.id
LEFT JOIN crops c ON a.crop_id = c.id
WHERE a.actual_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY a.actual_date DESC;

CREATE VIEW urgent_advisories AS
SELECT 
    ad.*,
    u.name as user_name,
    u.email as user_email
FROM advisories ad
JOIN users u ON ad.user_id = u.id
WHERE ad.status = 'active' 
    AND ad.valid_until > NOW()
    AND ad.priority IN ('high', 'critical')
ORDER BY ad.priority DESC, ad.created_at DESC;
