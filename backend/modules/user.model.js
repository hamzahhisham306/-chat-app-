'use strict';

/* istanbul ignore next */
module.exports=(sequleize, DataTypes)=>{
 const User=sequleize.define("UsersModales",{
    username:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
  
})

return User;
}
