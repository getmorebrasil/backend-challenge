import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
 // import * as bcrypt from "bcryptjs";
  
  @Entity()
  @Unique(["id"])
  export class Category {

    @PrimaryGeneratedColumn()
    //@Column()
    _id: number;

    @Column()
    id: number;
  
    @Column()
    //@Length(4, 20)
    name: string;
  
    //@Column()
    //@Length(0, 100)
    //childrenIds: number;

  }
  