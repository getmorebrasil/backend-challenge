<?php
	#Author: Robson Zagre Júnior
	#Email: r.zagre.jr@gmail.com
	
	class Categories{
		private $id = null;
		private  $name = null;
		private  $childrenId = [];

		#Atribuition a DataBase
		private  $table;
		private  $db;

		function Categories($table,$db){
			$this->table = $table;
			$this->db = $db;
		}
		#Setters and Getters
		function setId($id){
			if(is_int($id)){
				$this->id = $id;
			}else{
				echo"Invalid argument, Id type = Interger <br>";
			}
		}
		function getId(){
			return $this->id;
		}
		function setName($name){
			if(is_string($name)){
				$this->name = $name;
			}else{
				echo"Invalid argument, Name type = String <br>";
			}

		}
		function getName(){
			return $this->name;
		}
		function setChildrenId($childrenId){
			if(is_array($childrenId)){
				$this->childrenId = $childrenId;
			}else{
				echo"Invalid argument, Children type = Array <br>";
			}
		}
		function getChildrenId(){
			return $this->childrenId;
		}

		#Post /categories
		function postCategories(){
			#Verify Inicialization
			if($this->id == null || $this->name == null){
				echo "Please initialize Id and Name <br>";
				return false;
			}

			#Verify if Exists
			$sql = "SELECT id FROM ".$this->table." WHERE id = ".$this->id;
			$result = mysqli_query($this->db,$sql);
			if($result->num_rows == 0){
				if(count($this->childrenId) !=0){
					for($i = 0; $i<count($this->childrenId); $i++){
						if(!is_int($this->childrenId[$i])){
							echo"Argument Invalid, ChildrenId array type = Int <br>";
							return false;
						}
						#Verify if Exists
						$sql = "SELECT id FROM ".$this->table." WHERE id = ".$this->childrenId[$i];
						$result = mysqli_query($this->db,$sql);
	
						if($result->num_rows == 0){
							echo "Invalid Categories <br>";
							return false;
						}
					}
					$this->childrenId = "'".implode($this->childrenId,",")."'";
				}else{
					$this->childrenId = "null";
				}		
				#Create a new Categorie
				$sql = "INSERT INTO ".$this->table." VALUES (".$this->id.", '".$this->name."',".$this->childrenId.")";			
				#echo $sql;
				mysqli_query($this->db, $sql);
				echo("Categorie Successfully Created <br>");
				return true;
			}else{
				echo("Categorie Already Exists <br>");
				return false;
			}
		}

		#Get Categories
		function getCategories(){
			$sql = "SELECT * FROM ".$this->table;
			$result = mysqli_query($this->db,$sql);
			if($result->num_rows == 0){
				echo "There are no categories <br>";
				return false;
			}
			$return;
			$aux=0;
			while($r=$result->fetch_assoc()) {
				$return[$aux]["id"] = $r["id"];	
				$return[$aux]["name"] = $r["name"];	
				if($r["childrenId"] != null){
					$return[$aux]["childrenId"] = array_map('intval', explode(',', $r["childrenId"]));
				}		
				$aux++;
			}
			return $return;
		}

		#Get Categories Id
		function getCategoriesId(){
			#Verify Inicialization
			if($this->id == null){
				echo "Please initialize Id <br>";
				return false;
			}
			$sql = "SELECT * FROM ".$this->table." WHERE id = ".$this->id;
			$result = mysqli_query($this->db,$sql);
			if($result->num_rows == 0){
				echo "Categorie not exist <br>";
				return false;
			}
			$return= mysqli_fetch_assoc($result);
			if($return["childrenId"] != null){
				$return["childrenId"] = array_map('intval', explode(',', $return["childrenId"]));
			}		
			return $return;
		}
	}

?>
