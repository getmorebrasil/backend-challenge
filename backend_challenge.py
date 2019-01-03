from flask import Flask
from flask import jsonify
#from flask import json
import json
from flask import request

app = Flask(__name__)

# Comando para enviar HTTP POST para app
#curl -i -H "Content-Type: application/json" -X POST -d '{"id":"10", "name":"Teste2", "childrenIds": []}' http://localhost:5000/categories


@app.route("/")
def hello():
    return "Welcome to the technical test"

@app.route("/categories", methods=['POST', 'GET'])
def getCategories():
	#print(request.method)
	if request.method == 'GET':
		# Read JSON file
		with open('data.json') as data_file:
    			data = json.load(data_file)
		#data = jsonify(categories())
		#print (data)
		#cat = categories()
		#print(cat)
		#data = json.loads(cat)
		return jsonify(data)
	if request.method == 'POST':
		# Read JSON file
		with open('data.json') as data_file:
    			data = json.load(data_file)
		#data = json.dumps(data)
		#post_data = request.get_json()

		#data = json.loads(categories())
		post_data = request.get_json()

		categoryIds = post_data['childrenIds']

		for id in categoryIds:
			idsExistem = False
			for cat in data:#jsonify(categories()).get_json():
				if cat['id'] == id:
					idsExistem = True
					break
			if idsExistem == False:
					return jsonify(message='Uma ou mais categorias filhas nao existem')

		# se submissao aceita
		partition = data[0:len(data)-1]

		#data = partition + ", " + (str(post_data)) + "]"
		data.append(post_data)

		with open('data.json', 'wb') as outfile:
    			json.dump(data, outfile)

		return json.dumps(data)#jsonify(data)

@app.route("/categories:<int:param>")
def getCategoryById(param):
	# Read JSON file
	with open('data.json') as data_file:
    		data = json.load(data_file)
	#data_json = jsonify(data).get_json()
	#data = json.loads(categories())
	for cat in data: #jsonify(categories()).get_json(): Isto funciona, aquilo nao
		print(cat)
		if cat['id'] == str(param):
		#	return jsonify(cat)
			return json.dumps(cat)
	return "No categories with the solicited id"

def categories():
	dados = [
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
	}
	]
	return json.dumps(dados)

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