import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

/* Aqui está definido o esquema que define um usuário
  na base de dados MongoDB */
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'não pode ser vazio'],
    unique: true,
    trim: true,
    minlenght: 3
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    admin: { type: Boolean, default: false },
    quizCreator: { type: Boolean, required: true } 
  }
});

/* Função que criptografa a senha do usuário quando ela é 
  criada ou modificada */
UserSchema.pre('save', (next) => {
  let user = this;

  // Apenas faz hash na senha cado tenha sido modificada ou criada.
  if (!user.isModified('password')) return next();

  // Sobrescreve a senha com o valor da senha após hash
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

UserSchema.plugin(mongooseUniqueValidator, {message: 'já existe'});

const User = mongoose.model('User', UserSchema);

module.exports = User;