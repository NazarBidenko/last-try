#!/usr/bin/env sh

# Остановить публикацию при ошибках
set -e

# Сборка проекта
npm run build

# Переход в каталог сборки
cd dist

# Если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

# Инициализация репозитория Git
git init
git add -A
git commit -m 'deploy'

# Пуш на ваш репозиторий
git push -f https://github.com/NazarBidenko/last-try.git master:gh-pages

cd -
