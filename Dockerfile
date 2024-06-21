# Use a imagem oficial do Node.js como a base
FROM node:19

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração do Prisma
COPY prisma ./prisma/

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Gere o Prisma Client
RUN npx prisma generate

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta na qual a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
