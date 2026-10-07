-- ==========================================
-- CLOUDLAB DATABASE
-- ==========================================


-- STUDENTS
CREATE TABLE IF NOT EXISTS students (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    course VARCHAR(150),

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP
);


-- DEPLOYMENTS
CREATE TABLE IF NOT EXISTS deployments (

    id BIGSERIAL PRIMARY KEY,

    project_name VARCHAR(150) NOT NULL,

    platform VARCHAR(100) NOT NULL,

    status VARCHAR(50) NOT NULL,

    live_url TEXT,

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP
);


-- CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (

    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE
        DEFAULT CURRENT_TIMESTAMP
);
