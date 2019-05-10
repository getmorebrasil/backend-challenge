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
  @Unique(["_id"])
  export class Children {

    @PrimaryGeneratedColumn()
    //@Column()
    _id: number;

    @Column()
    idParent: number;
  
    @Column()
    //@Length(4, 20)
    idChild: number;

  }
  