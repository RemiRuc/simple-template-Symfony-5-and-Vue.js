# Simple template integrating Symfony 5 and Vue.js
## Installation
```
git clone https://github.com/RemiRuc/simple-template-Symfony-5-and-Vue.js.git

git remote rm origin

composer install

yarn install

php bin/console doctrine:schema:update --force

php bin/console doctrine:migrations:migrate

php bin/console doctrine:fixtures:load
