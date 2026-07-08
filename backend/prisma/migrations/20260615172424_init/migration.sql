
-- CreateTable
CREATE TABLE autor (
    id_autor SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    data_nascimento DATE
);

-- CreateTable
CREATE TABLE obras (
    num_patrimonio INTEGER PRIMARY KEY,
    num_registro INTEGER UNIQUE NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    tecnica_material VARCHAR(200),
    descricao_obra TEXT,
    estado_conservacao VARCHAR(100),
    consideracoes_equipe TEXT
);

CREATE TABLE obra_autor (
    num_patrimonio INTEGER NOT NULL,
    id_autor INTEGER NOT NULL,

    PRIMARY KEY (num_patrimonio, id_autor),

    FOREIGN KEY (num_patrimonio)
        REFERENCES obras(num_patrimonio)
        ON DELETE CASCADE,

    FOREIGN KEY (id_autor)
        REFERENCES autor(id_autor)
        ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imagem" BYTEA,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    
    "content" TEXT NOT NULL,
    
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    "eventId" INTEGER foreign key references "Event"("id") ON DELETE SET NULL
    
    
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    
    "published" BOOLEAN NOT NULL DEFAULT false,
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
