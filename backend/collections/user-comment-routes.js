"use strict";


class userComment{
    constructor(model){
        this.model=model;
    }
 /* istanbul ignore next */
    async create(object){
        try{
          return await this.model.create(object);
        }
        catch(error){
            console.error("ERROR when create",error.message);

        }
    }
/* istanbul ignore next */
    async read(id){
        try{
        if(id){
         return await this.model.findOne({where:{id:id}});
        }
        else{
            return await this.model.findAll();
        }
    }
    catch(error){
         console.error("ERORR When read");
        }
    }
    /* istanbul ignore next */
    async update(id, object){
        try{
            const dataById = await this.model.findOne({where: {id}});
            return await dataById.update(object);
        }
        catch(ERROR) {
            console.error(`Error while updating data with id: ${id}`);
          }
    }
    /* istanbul ignore next */
    async Delete(id){
        try{
            return await this.model.destroy({where:{id:id}});
        }
        catch(error){
            console.error("Error when make delete");
        }
    }
    /* istanbul ignore next */
    async readWithPost(post){
        try{
            return await this.model.findAll({include:[post]});
        }
        catch(error){
            console.error('Error when make Read')
        }
    }
}


module.exports=userComment;