from flask import Flask
from flask import jsonify
#from flask import json
import json
from flask import request

app = Flask(__name__)

# Terminal commando to send HTTP POST to program
#curl -i -H "Content-Type: application/json" -X POST -d '{"id":"10", "name":"Teste2", "childrenIds": []}' http://localhost:5000/categories


@app.route("/")
def hello():
    return jsonify(message='Welcome to the technical test')

@app.route("/categories", methods=['POST', 'GET'])
def getCategories():
	#print(request.method)
	if request.method == 'GET':
		# Read JSON file
		with open('data.json') as data_file:
    			data = json.load(data_file)

		return jsonify(data)
	if request.method == 'POST':
		# Read JSON file
		with open('data.json') as data_file:
    			data = json.load(data_file)

		post_data = request.get_json()
		categoryIds = post_data['childrenIds']


		# for each child Id, scans categories for it. If one is not located, returns an error message
		for id in categoryIds:
			#print(id)
			idsExistem = False
			for cat in data:
				if cat['id'] == str(id):
					idsExistem = True
					break
			if idsExistem == False:
					return jsonify(ok='false',error='InvalidCategories')

		# if submission is accepted
		partition = data[0:len(data)-1]
		#data = partition + ", " + (str(post_data)) + "]"
		data.append(post_data)

		with open('data.json', 'wb') as outfile:
    			json.dump(data, outfile)

		return jsonify(ok='true')#json.dumps(data)

@app.route("/categories:<int:param>")
def getCategoryById(param):
	# Read JSON file
	with open('data.json') as data_file:
    		data = json.load(data_file)

	for cat in data:
		#print(cat)
		if cat['id'] == str(param):
			return jsonify(cat)#json.dumps(cat)

	return jsonify(ok='false', error='InvalidId')

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

if __name__ == "__main__":
	app.run()