<?php
	#BD desenvolvido para teste;
	#id = int(255) not null
	#name = varchar(100) not null
	#childrenId = mediumtext null;
	$db = mysqli_connect("localhost", "root", "", "categories");	
	
	require_once("backend.php");



	$ctg = new Categories("categories",$db);
	$ctg->setId(300);	
	$ctg->setName("Roupas");		
	$ctg->postCategories();
	$return = $ctg->getCategoriesId();
	echo $return["id"];
	echo $return["name"];
	echo $return["childrenId"][0];
	
	$ctg0 = new Categories("categories",$db);
	$ctg0->setId(301);	
	$ctg0->setName("Roupas");		
	$ctg0->postCategories();
	$return = $ctg0->getCategoriesId();
	echo $return["id"];
	echo $return["name"];
	echo $return["childrenId"][0];

	$ctg1 = new Categories("categories",$db);
	$ctg1->setId(200);	
	$ctg1->setName("Masculino");		
	$ctg1->setChildrenId([300]);		
	$ctg1->postCategories();
	$return = $ctg1->getCategoriesId();
	echo $return["id"];
	echo $return["name"];
	echo $return["childrenId"][0];
	
	$ctg3 = new Categories("categories",$db);
	$ctg3->setId(201);	
	$ctg3->setName("Feminino");		
	$ctg3->setChildrenId([301]);		
	$ctg3->postCategories();
	$return = $ctg3->getCategoriesId();
	echo $return["id"];
	echo $return["name"];
	echo $return["childrenId"][0];
		
	$ctg2 = new Categories("categories",$db);
	$ctg2->setId(100);	
	$ctg2->setName("Moda");		
	$ctg2->setChildrenId([200,201]);		
	$ctg2->postCategories();
	$return = $ctg2->getCategoriesId();
	echo $return["id"];
	echo $return["name"];
	echo $return["childrenId"][0];
	echo $return["childrenId"][1];

?>
