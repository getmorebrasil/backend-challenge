
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import {Category} from "../entity/Category";
import {Children} from "../entity/Children";

class handlerCategory{

static allCategories = async (req: Request, res: Response) => {
    
    //Get categories from database
    const catRepository = getRepository(Category);
    const categories = await catRepository.find({
        select: ["_id", "id", "name"]
    });

    res.send(categories);
};

static getCategory = async (req: Request, res: Response) => {
    
    //Get the ID from the url
    const paramid: number = req.params.id;

    //Get the category from database
    const catRepository = getRepository(Category);
    try {
        const category = await catRepository.findOneOrFail({id: paramid}, {
            select: ["_id", "id", "name"]
        });
        res.send(category)
    } catch (error) {
        res.status(404).send("Category not found");
    }
};

static addCategory = async (req: Request, res: Response) => {
    
    //Get parametres from the body
    let {id, name, childrenIds} = req.body;
    let category = new Category();

    category.id = id;
    category.name = name;
    //category.childrenIds = childrenIds;


    //Validade if the parametres are ok
    const errors = await validate(category);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    //Try to save. If fails, the id is already in use
    const catRepository = getRepository(Category);
    try {
        // before saving, check children
        if (childrenIds.length > 0){
            // for each child, verify if it exists in Category database
            for(let cId of childrenIds){
                try{
                    const child = await catRepository.findOneOrFail({id: cId}, {
                    });
                    console.log(child);
                } catch(e1){
                    res.status(500).send("Error, child non-existent");
                    return;
                }
            }
        }
        await catRepository.save(category);
    } catch (e) {
        res.status(409).send("Id already in use");
        return;
    }

    // Creates child-parent relation table
    if (childrenIds.length > 0) {
        for (let childId of childrenIds) {
            const childRepository = getRepository(Children);
            let relation = new Children();
            relation.idParent = id;
            relation.idChild = childId;
            try {
                await childRepository.save(relation);
            } catch (e){
                res.status(500).send("Failed to add child-parent relation");
            }
        }
    }

    //If all ok, send 201 response
    res.status(201).send("Category created");
};

static deleteCategory = async (req: Request, res: Response) => {
  //Get the ID from the url
  const paramid = req.params.id;

  const catRepository = getRepository(Category);
  let category: Category;
  try {
    category = await catRepository.findOneOrFail({id: paramid});
  } catch (error) {
    res.status(404).send("Category not found");
    return;
  }
  catRepository.delete({id: paramid});

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static allChildren = async (req: Request, res: Response) => {
  
    //Get parent-child relation table from repository  
    const childrenRepository = getRepository(Children);
    const children = await childrenRepository.find({
        select: ["_id", "idParent", "idChild"]
    });
  
    res.send(children);
  
};


static deleteChildren = async (req: Request, res: Response) => {
    
    //Get the ID from the url
    const paramid = req.params.id;
  
    //Get the children of the specified id
    const childrenRepository = getRepository(Children);
    let children: Children;
    try {
      children = await childrenRepository.findOneOrFail({idParent: paramid});
    } catch (error) {
      res.status(404).send("Children not found");
      return;
    }
    //Delete the parent-child relations where the parent is the parametre id
    childrenRepository.delete({idParent: paramid});
  
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

};

export default handlerCategory;
