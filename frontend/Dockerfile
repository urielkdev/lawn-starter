# Etapa 1: build da aplicação
FROM node:22-alpine

WORKDIR /app

# Copia só os arquivos de dependência
COPY package.json yarn.lock ./

# Instala dependências com cache eficiente
RUN yarn install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Compila o projeto
RUN yarn build

EXPOSE 4173

# Comando para servir a build com o Vite Preview
CMD ["yarn", "preview"]
