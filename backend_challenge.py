from flask import Flask
from flask import jsonify
from flask import json

app = Flask(__name__)

@app.route("/")
def hello():
    return "Welcome to the technical test"

@app.route("/categories")
def getCategories():
	data = jsonify(categories())
	return data

@app.route("/categories:<int:param>")
def getCategoryById(param):
	data = jsonify(categories())
	data_json = data.get_json()
	for cat in data_json:
		print(cat)
		if cat['id'] == str(param):
			return jsonify(cat)
	#return "No categories with the solicited id"

def categories():
	data = [
	{
		'id' : '1',
		'name' : 'Moda',
		'categoryIds' : [3, 4]
	},
	{
		'id' : '2',
		'name' : 'Informatica',
		'categoryIds' : [5, 6]
	},
	{
		'id' : '3',
		'name' : 'Feminino',
		'categoryIds' : [7]
	},
	{
		'id' : '4',
		'name' : 'Masculino',
		'categoryIds' : [8]
	},
	{
		'id' : '5',
		'name' : 'Notebooks',
		'categoryIds' : []
	},
	{
		'id' : '6',
		'name' : 'Tablets',
		'categoryIds' : []
	},
	{
		'id' : '7',
		'name' : 'Roupas',
		'categoryIds' : []
	},
	{
		'id' : '8',
		'name' : 'Roupas',
		'categoryIds' : []
	},
	
	]
	return data

def categories2():
	data = [
	{
		'id' : '1',
		'name' : 'Norton',
		'categoryIds' : []
	},
	{
		'id' : '2',
		'name' : 'Norton2',
		'categoryIds' : []
	},
	{
		'id' : '3',
		'name' : 'Norton3',
		'categoryIds' : []
	},
	{
		'id' : '4',
		'name' : 'Norton4',
		'categoryIds' : []
	},
	
	]
	return data

if __name__ == "__main__":
	app.run()

