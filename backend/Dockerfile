FROM node:22

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências para aproveitar o cache do Docker
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código
COPY . .

RUN yarn prisma generate

# Compila o projeto
RUN yarn build

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["yarn", "start:prod"]