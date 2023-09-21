const movieMessage = {
  notRightsToDelete: 'Нет прав удалить данный фильм',
  notFound: 'Фильма с таким ID не существует в базе',
};

const userMessage = {
  notAllowedPasswordOfEmail: 'Неправильные почта или пароль',
  notFound: 'Пользователя с таким ID не существует в базе',
};

const authMessage = {
  jwtSend: 'Всё верно! JWT отправлен',
  jwtDeleted: 'JWT удален',
  authNeeded: 'Необходима авторизация',
};

const resourceMessage = {
  notFound: 'Ресурс не найден',
};

const mongoMessage = {
  mongoServerError: 'MongoServerError: E11000 duplicate key error collection',
};

const validateMessage = {
  notEmail: 'Некорректный email',
  notUrl: 'Некорректный URL',
  maxLength: 'Максимальная длина поля "name" - 30',
  minLength: 'Минимальная длина поля "name" - 2',
};

const corsMessage = {
  production: 'Production CORS',
  allowed: 'All CORS allowed',
  denied: 'Denied by CORS',
};

module.exports = {
  movieMessage,
  userMessage,
  authMessage,
  resourceMessage,
  validateMessage,
  corsMessage,
  mongoMessage,
};
