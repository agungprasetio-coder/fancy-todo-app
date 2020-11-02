'use strict';
const {
  Model, ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is required!'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type : DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status is required!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isYesterday(value){
          let d = new Date(value).toISOString().slice(0,10)
          if(new Date(d).setHours(23,59) < new Date()){
            throw new ValidationError(`Date only can set today or later!`)
          }else{
            this.due_date = new Date(d).setHours(23,59)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.beforeCreate((instance, options)=>{
    instance.status = false
  })
  return Todo;
};